


var mapConfig = {
    aMapOfflineUrl: 'http://172.18.121.5:8090/map.ashx?t=test&x={x}&y={y}&z={z}', //高德离线平面地图（测试服）
    aMapOfflineVisible: false, //是否显示
    aMapSateliteOfflineUrl: 'http://127.0.0.1:8090/map.ashx?t=mapList&x={x}&y={y}&z={z}', //高德离线卫星地图（测试服）
    aMapSateliteOfflineVisible: true, //是否显示
    aMapUrl: 'http://webrd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=7', //高德平面地图（官方）
    aMapVisible: false, //是否显示
    aMapSateliteUrl: 'http://webst04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=6', //高德卫星地图（官方）
    aMapSateliteVisible: false, //是否显示
    mapProject: 'EPSG:4326', //地图使用的投影：WGS84坐标系，球面墨卡托投影，用经纬度做单位的x/y坐标
    sysProject: 'EPSG:3857', //系统使用的投影：WGS84坐标系，球面墨卡托投影，用“米”做单位的x/y坐标
	//江西省 南昌市 115.782,28.418
	//center: [115.782,28.418], 
	//崇左
    center: [108.724,21.991], //地图初始中心点
	//S43起点坐标 108.839,22.851
	//center: [108.839,22.851], 
    extent: [107.708723, 22.514358, 109.015410, 23.115631], //地图初始范围
    zoom: 10, //地图初始级别
    minZoom: 1, //缩放最小级别
    maxZoom: 19, //缩放最大级别,
    mapHeight: 0, //地图高度，设置为0则取屏幕高度
    mousePositionControl: true, //鼠标位置经纬度显示栏是否显示
    layerSwitcher: true, //地图图层控制栏是否显示
    overviewMap: true, //鹰眼图是否显示
    scaleLine: true, //比例尺是否显示
    fullScreen: true, //全屏功能是否可用
    rotate: true, //地图是否可旋转
    zoomToExtent: true, //返回地图初始范围是否可用
    attribution: true, //系统版权信息是否显示
    toolbar: false, //地图工具栏是否显示
    copyright: '&copy; <a href="http://signalway.com.cn" target="_blank">北京信路威科技股份有限公司</a>'
};