# MapServerGo
go语言版的地图服务程序

打包linux环境：

cd到main.go目录下
 //设置目标可执行程序操作系统构架，包括 386，amd64，arm  
`set GOARCH=amd64  `  
 //设置可执行程序运行操作系统，支持 darwin，freebsd，linux，windows  
`set GOOS=linux `   
   //打包  
`go build  `      