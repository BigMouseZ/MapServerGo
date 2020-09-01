package main

import (
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"os"
	"time"

	"MapServerGo/golog"
	"MapServerGo/mapinit"
)

func main() {
	// 日志配置
	golog.Func_log2fileAndStdout()
	// 初始化地图
	mapinit.MapInit()
	// Default返回一个默认的路由引擎
	r := gin.Default()
	r.GET("/map.ashx", MapHandle)
	// 第一个参数是api，第二个是文件夹路径
	root := "./static"
	existFile, err := mapinit.PathExists(root)
	if existFile {
		r.Static("/static", root)
	} else {
		log.Println("静态资源路径"+root+"不存在!", err)
	}
	addr := mapinit.Config["server.port"]
	if len(addr) <= 0 {
		addr = "8090"
	}
	runErr := r.Run(":" + addr)
	if runErr != nil {
		log.Println("启动异常 ,10秒后自动退出！")
		time.Sleep(10 * time.Second)
		log.Panicln(runErr)
	}
}

func MapHandle(c *gin.Context) {
	mapType := c.Query("t")
	x := c.Query("x")
	y := c.Query("y")
	z := c.Query("z")
	if len(mapType) <= 0 {
		mapType = "mapList"
	}
	// 读取地图包瓦片
	openDBModel := mapinit.Config["openDBModel"]
	var buffer []byte
	if openDBModel == "false" {
		buffer = WritePackMap(x, y, z, mapType)
	} else if openDBModel == "true" {
		buffer = WriteMySqlMap(x, y, z)
	}
	if buffer == nil {
		log.Println("无法找到该地图瓦片:type:" + mapType + ",x:" + x + ",y:" + y + ",z:" + z)
		buffer = mapinit.NomapImgTip
	}
	c.Writer.Write(buffer)
}

func WritePackMap(x, y, z, mapType string) []byte {
	tileIdx := mapinit.MapIdx[mapType]
	if tileIdx != nil {
		mapTile := tileIdx["z"+z+"_"+"x"+x+"_"+"y"+y]
		if mapTile.Length > 0 {
			buffer := make([]byte, mapTile.Length)
			f, err := os.OpenFile(mapTile.FilePath+".pak", os.O_RDONLY, os.ModePerm)
			defer f.Close()
			if err != nil {
				log.Println("读取文件异常：", err)
				return nil
				// log.Fatal(err)
			}
			_, err = f.Seek(mapTile.Offset, io.SeekStart)
			if err != nil {
				log.Println("读取文件异常：", err)
				return nil
				// log.Fatal(err)
			}
			_, err = f.Read(buffer)
			if err != nil {
				log.Println("读取文件异常：", err)
				return nil
				// log.Fatal(err)
			}
			return buffer
		}
	}
	return nil
}

type Gmapnetcache struct {
	Tile []byte `json:"tile" gorm:"column:Tile"`
}

func WriteMySqlMap(x, y, z string) []byte {
	var gmap Gmapnetcache
	tableName := mapinit.Config["tablename"]
	Db := mapinit.Db
	Db = Db.Table(tableName)
	if len(x) > 0 {
		Db = Db.Where("x = ?", x)
	}
	if len(y) > 0 {
		Db = Db.Where("y = ?", y)
	}
	if len(z) > 0 {
		Db = Db.Where("zoom = ?", z)
	}
	err := Db.Find(&gmap).Error
	if err == nil {
		return gmap.Tile
	}
	return nil
}
