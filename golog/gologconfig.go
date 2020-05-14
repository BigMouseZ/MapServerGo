package golog

import (
	"io"
	"log"
	"os"
)

func Func_log2file() {
	//创建日志文件
	f, err := os.OpenFile("test.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		log.Fatal(err)
	}
	//完成后，延迟关闭
	defer f.Close()
	// 设置日志输出到文件
	log.SetOutput(f)
	// 写入日志内容
	log.Println("check to make sure it works")
}
func Func_log2fileAndStdout() {
	//创建日志文件
/*	logFile, err := os.OpenFile("./gotest.log", os.O_CREATE|os.O_APPEND|os.O_RDWR, 0744)
	if err != nil {
		log.Fatal(err)
	}*/
	//完成后，延迟关闭
	//defer logFile.Close()
	// 设置日志输出到文件
	// 定义多个写入器
	/*writers := []io.Writer{
		f,
		os.Stdout}*/
	fileAndStdoutWriter := io.MultiWriter(os.Stdout)
	log.SetOutput(fileAndStdoutWriter)
	/*// 创建新的log对象
	logger := log.New(fileAndStdoutWriter, "", log.Ldate|log.Ltime|log.Lshortfile)
	// 使用新的log对象，写入日志内容
	logger.Println("--> logger :  check to make sure it works")*/
}
