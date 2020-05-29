package mapinit

import (
	"bufio"
	"github.com/beevik/etree"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"io"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"strings"
)

var Config map[string]string
var TileIdx = make(map[string]MapTile, 0)
var MapIdx = make(map[string]map[string]MapTile, 0)
var NomapImg = make([]byte, 0)
var NomapImgTip = make([]byte, 0)

type MapTile struct {
	Offset   int64
	Length   int64
	FilePath string
}

func MapInit() {
	//初始化图片
	nomapImg, err := ioutil.ReadFile("./static/images/nomap.jpg")
	if err != nil {
		log.Println("初始化图片异常：", err)
		//log.Panicln(err)
	}
	NomapImg = nomapImg
	nomapImgTip, err := ioutil.ReadFile("./static/images/nomaptip.jpg")
	if err != nil {
		log.Println("初始化图片异常：", err)
		//log.Panicln(err)
	}
	NomapImgTip = nomapImgTip
	//初始化配置
	Config = InitConfig("./mapservergo.properties")
	if Config == nil {
		return
	}
	numberValue := Config["sync.mapConfig.value"]
	if len(numberValue) <= 0 {
		log.Println("地图配置不存在 :" + numberValue)
		return
	}
	openDBModel := Config["openDBModel"]
	if openDBModel == "false" {
		log.Println("地图模式：访问地图包！")
		numberValues := strings.Split(numberValue, ",")
		for _, mapValue := range numberValues {
			packPaths := Config[mapValue]
			packPathList := strings.Split(packPaths, ",")
			for _, one := range packPathList {
				packPath := Config[one]
				log.Println("地图包路径：" + packPath)
				doc := etree.NewDocument()
				if err := doc.ReadFromFile(packPath + ".idx"); err != nil {
					log.Println("地图包路径不存在！：" + packPath + ".idx")
					return
				}
				root := doc.SelectElement("map")
				zlist := root.ChildElements()
				var z, x, y string
				for _, znode := range zlist {
					z = znode.Tag
					xlist := znode.ChildElements()
					for _, xnode := range xlist {
						x = xnode.Tag
						ylist := xnode.ChildElements()
						for _, ynode := range ylist {
							y = ynode.Tag
							Offset, _ := strconv.ParseInt(ynode.Attr[0].Value, 10, 64)
							Length, _ := strconv.ParseInt(ynode.Attr[1].Value, 10, 64)
							mapTile := MapTile{Offset, Length, packPath}
							TileIdx[z+"_"+x+"_"+y] = mapTile
						}
					}
				}
			}
			MapIdx[mapValue] = TileIdx
		}
	} else if openDBModel == "true" {
		Dbinit()
		log.Println("地图模式：访问数据库！")
	}

}

//读取key=value类型的配置文件
func InitConfig(path string) map[string]string {
	config := make(map[string]string)
	f, err := os.Open(path)
	defer f.Close()
	if err != nil {
		log.Println("地图配置不存在 :" + path)
		return nil
	}

	r := bufio.NewReader(f)
	for {
		b, _, err := r.ReadLine()
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Println("地图配置异常 :", err)
			return nil
		}
		s := strings.TrimSpace(string(b))
		indexSkip := strings.Index(s, "#")
		if indexSkip >= 0 {
			continue
		}
		index := strings.Index(s, "=")
		if index < 0 {
			continue
		}

		key := strings.TrimSpace(s[:index])
		if len(key) == 0 {
			continue
		}
		value := strings.TrimSpace(s[index+1:])
		if len(value) == 0 {
			continue
		}
		config[key] = value
	}
	return config
}

var (
	Db *gorm.DB
)

func Dbinit() *gorm.DB {
	//Db, err := gorm.Open("mysql", "user:password@/dbname?charset=utf8&parseTime=True&loc=Local")
	var err error
	//Db, err = gorm.Open("postgres", "host=192.168.147.129 port=5432 user=pgsql dbname=authtest password=pgsql sslmode=disable")
	dbUrl := Config["dburl"]
	DbInit, err := gorm.Open("mysql", dbUrl)
	//defer DbInit.Close()
	if err != nil {
		panic("连接数据库失败:" + err.Error())
	}
	//SetMaxOpenConns用于设置最大打开的连接数
	//SetMaxIdleConns用于设置闲置的连接数
	DbInit.DB().SetMaxIdleConns(10)
	DbInit.DB().SetMaxOpenConns(100)
	// 启用Logger，显示详细日志
	//Db.LogMode(true)
	// 自动迁移模式
	//db.AutoMigrate(&Model.UserModel{},
	//	&Model.UserDetailModel{},
	//	&Model.UserAuthsModel{},
	//)
	Db = DbInit
	return DbInit
}
func PathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}
