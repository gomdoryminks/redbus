//파일 url 가져오기
var globalFileUrl = decodeURI(window.location.href);

//파일 상대경로 가져오기
var globalFilePath = "";

if (globalFileUrl.indexOf("/mobile/jeju/") > -1) {
    globalFilePath = "../../../";
} else if (globalFileUrl.indexOf("/mobile/suwon/") > -1) {
    globalFilePath = "../../";
} else if (globalFileUrl.indexOf("/jeju/") > -1) {
    globalFilePath = "../../";
} else if (globalFileUrl.indexOf("/suwon/") > -1) {
    globalFilePath = "../";
}

//시내버스정보 연동 API
var globalServiceKey = "0OhBU7ZCGIobDVKDeBJDpmDRqK3IRNF6jlf%2FJB2diFAf%2FfR2czYO9A4UTGcsOwppV6W2HVUeho%2FFPwXoL6DwqA%3D%3D";
var globalCityCode = "39";
var globalCityName = "JEB";
var globalNumOfRows = "5000";
var globalPageNo = "1";
var globalApiKey = "a87fc398233d4040b62cc31388674c02";

//국토교통부(TAGO) 버스정류장정보 연동 API
var globalServiceKey2 = "56Bs5IbSdKXPSlHfHi%2BHzqn3rHxtmXj6zD4QD9mjGmpnNt4FARAhizL2%2Bka8t0w4sjeep%2FTE3OjCD9YfXS8JSg%3D%3D";

//배열 선언
var globalRouteStationNm = []; //기점↔종점
var globalRouteStationNm2 = []; //정류장명
var globalRouteStationLat = []; //정류장 위도
var globalRouteStationLon = []; //정류장 위도

var globalRouteTp = [];
globalRouteTp['11'] = "직행좌석행시내버스";
globalRouteTp['12'] = "좌석형시내버스";
globalRouteTp['13'] = "일반형시내버스";
globalRouteTp['21'] = "직행좌석형농어촌버스";
globalRouteTp['22'] = "좌석형농어촌버스";
globalRouteTp['23'] = "일반형농어촌버스";
globalRouteTp['30'] = "마을버스";
globalRouteTp['41'] = "고속형시외버스";
globalRouteTp['42'] = "좌석형시외버스";
globalRouteTp['43'] = "일반형시외버스";

var globalRouteColor = [];
globalRouteColor['0'] = "적갈색";
globalRouteColor['1'] = "적갈색";
globalRouteColor['2'] = "파란색";
globalRouteColor['3'] = "녹색";
globalRouteColor['4'] = "빨간색";
globalRouteColor['5'] = "주황색";
globalRouteColor['6'] = "보라색";
globalRouteColor['7'] = "노란색";

var globalLowPlateTp = [];
globalLowPlateTp['0'] = "일반버스";
globalLowPlateTp['1'] = "저상버스";

var globalUpdnDir = [];
globalUpdnDir['0'] = "상행";
globalUpdnDir['1'] = "하행";

var globalHolidayTp = [];
globalHolidayTp['0'] = "비정기";
globalHolidayTp['1'] = "평일";
globalHolidayTp['2'] = "토요일";
globalHolidayTp['3'] = "공휴일(일요일포함)";

var globalServiceType = [];
globalServiceType['0'] = "도착이벤트";
globalServiceType['1'] = "인접구간";
globalServiceType['2'] = "도착예측";
globalServiceType['3'] = "운행계획";

var globalServiceRunType = [];
globalServiceRunType['0'] = "기본";
globalServiceRunType['1'] = "막차";
globalServiceRunType['2'] = "첫차";

//지도 위도/경도 설정하기
var mapLatitude = 33.4990652;
var mapLongitude = 126.5307408;

if (globalFileUrl.indexOf("/jeju/") > -1) {
    mapLatitude = 33.4990652;
    mapLongitude = 126.5307408;
} else if (globalFileUrl.indexOf("/suwon/") > -1) {
    mapLatitude = 37.2632976;
    mapLongitude = 127.0284626;
}

var markerdata = {};
var lowbusmarkerdata = {};
var markers = [];
var busmarkers = [];
var lowbusmarkers = [];
var polylines = [];
var busOldArr = [];
var busNewArr = [];
var lowBusOldArr = [];
var lowBusNewArr = [];

var stationTimer;
var stationTimer2;
var busTimer;
var lowBusTimer;
var lowBusTimer2;

var startArr = [];
var endArr = [];

var gpsmarkerdata = {};
var gpsmarkers = [];
var gpsOldArr = [];
var gpsNewArr = [];
var gpsSearchArr = [];
var gpsSearchKeyword = "";
var gpsTimer;
var gpsStartArr = [];
var gpsEndArr = [];
var gpsUseFlag = "N";

$(document).ready(function(){
    if ($(".contMap").length > 0) {
        window.map = new kakao.maps.Map($(".contMap")[0],{
            center: new kakao.maps.LatLng(mapLatitude,mapLongitude),
            level: 5
        });
        
        map.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
        map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
        
        map.setMaxLevel(10);
    }
});

//노선 마커
function routeMarker(iwFlag, busFlag, routeId, smjson, busId) {
    busId = (busId != undefined) ? busId : "";
    
    stationMarker(iwFlag,"N","Y",smjson);
    
    if (globalFileUrl.indexOf("/JSC/") > -1) {
        if (busFlag == "Y") {
            for (var row in smjson)  {
                globalRouteStationNm2[smjson[row].stationOrd] = smjson[row].stationNm;
                globalRouteStationLat[smjson[row].stationId] = smjson[row].localY;
                globalRouteStationLon[smjson[row].stationId] = smjson[row].localX;
            }

            busMarker("start",routeId);
        }
    }
    
    var bounds = new kakao.maps.LatLngBounds();
    var linePath = [];
    var lineColor = "#d95f29";
    var lineOpacity = 1;
    
    if (globalFileUrl.indexOf("/JWN/") > -1) {
        lowRouteJson.filter(function(obj) {
            if (String(obj["routeId"]) === routeId) {
                var routeCoordinateArr = obj["routeCoordinate"];

                for (var row in routeCoordinateArr) {
                    if (routeCoordinateArr[row].localX != null && routeCoordinateArr[row].localY != null) {
                        var itemPos = new kakao.maps.LatLng(routeCoordinateArr[row].localY,routeCoordinateArr[row].localX);
                        bounds.extend(itemPos);
                        linePath.push(itemPos);
                    }
                }
                
                lineColor = (obj["routeDirection"] == "down") ? "#274475" : "#d95f29";
            }
        });
        
        if (linePath.length == 0) {
            for (var row in smjson) {
                if (smjson[row].localX != null && smjson[row].localY != null) {
                    var itemPos = new kakao.maps.LatLng(smjson[row].localY,smjson[row].localX);
                    bounds.extend(itemPos);
                    linePath.push(itemPos);
                }
            }
            
            lineOpacity = 0;
        }
    } else {
        for (var row in smjson) {
            if (smjson[row].localX != null && smjson[row].localY != null) {
                var itemPos = new kakao.maps.LatLng(smjson[row].localY,smjson[row].localX);
                bounds.extend(itemPos);
                linePath.push(itemPos);
            }
        }
    }

    var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: lineColor, // 선의 색깔입니다
        strokeOpacity: lineOpacity, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    });

    polyline.setMap(map);
    polylines.push(polyline);
    
    if (busId != "") {
        map.setCenter(lowbusmarkerdata["lowbus-" + busId].getPosition());
        map.setLevel(3);
    } else {
        map.setBounds(bounds);
    }
    
    if (globalFileUrl.indexOf("/JWN/") > -1 && busFlag == "Y") {        
        setRouteStationVisible();
	}
}

//정류장 마커
function stationMarker(iwFlag, courseFlag, routeFlag, smjson) {
    smjson.forEach(smdata=>{
        if (smdata.localX != null && smdata.localY != null) {
    		var stationId = smdata.stationId;
            var pos = new kakao.maps.LatLng(smdata.localY, smdata.localX);
            var mar = new kakao.maps.Marker({
                map: map,
                position: pos,
                title: "station-" + stationId,
                image: new kakao.maps.MarkerImage(globalFilePath + "images/map-station.png", new kakao.maps.Size(24,24), {offset: new kakao.maps.Point(12,12)})
            });
            
            mar.setMap(map);
            markers.push(mar);
            
            var siwHtml = stationInfoWindow("start",smdata.stationId,smdata.stationNm,smdata.localY,smdata.localX,courseFlag,"N");
            
            mar.win = new kakao.maps.InfoWindow({
                position: pos,
                content: siwHtml
                //disableAutoPan: true
            });
            
            mar.win.open(map, mar);
            
            kakao.maps.event.addListener(mar, "click", function() {
                if (iwFlag == "Y") {
                    var dataItemTitle = mar.getTitle().split('-');

                    $(".infoWindowArea").css({display:"none"});
                    $(".markerArea").removeClass("on");
                    $(".markerArea[id^='m-station-']").children("img").attr("src",globalFilePath + "images/map-station.png");

                    if (dataItemTitle.length > 1) {
                        var dataItemType = dataItemTitle[0];
                        var dataItemId = dataItemTitle[1];
                        
                        stationInfoWindow("click",dataItemId,"","","","","N");

                        $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                        $(".markerArea#m-" + dataItemType + "-" + dataItemId).addClass("on");
                        $(".markerArea#m-" + dataItemType + "-" + dataItemId).children("img").attr("src",globalFilePath + "images/map-station-on.png");
                        
                        if ($("ul.stationList>li a[data-station-id='" + dataItemId + "']").length > 0) {
                        	$("ul.stationList>li a[data-station-id='" + dataItemId + "']").parent("li").removeClass("on");
                        	$("ul.stationList>li a[data-station-id='" + dataItemId + "']").trigger("click");
                        }
                    }
                    
                    map.setDraggable(true);
                    $(".mContMapArea").removeClass("on");
                    $(".markerArea").children(".bmCircle").removeClass("on");
                    
                    map.setCenter(mar.getPosition());
                    map.setLevel(5);
                }
            });
            
            markerdata["station-" + stationId] = mar;
    	}
    });
    
    if (routeFlag != "Y") {
    	map.setCenter(new kakao.maps.LatLng(mapLatitude,mapLongitude));
        map.setLevel(5);
    }
    
    $(".stationInfoWindow").each(function() {
        var dataItemType = $(this).attr("data-item-type");
        var dataItemId = $(this).attr("data-item-id");
        
        $(this).parent().prev().css({display:"none"});
        $(this).parent().parent().css({display:"none"});
        $(this).parent().parent().addClass("infoWindowArea");
        $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
        $(this).parent().parent().prev().addClass("markerArea");
        $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
    });
}

//내위치기준 정류장 마커
function gpsMarker(type, state, myLatitude, myLongitude, gmjson) {
    var gpsNameArr = [];
    
    gpsOldArr = gpsNewArr;
    gpsNewArr = [];
    
    if (gmjson != undefined) {
        gmjson.forEach(gmdata=>{
            if (gmdata.gpslong != null && gmdata.gpslati != null) {
                var stationId = gmdata.nodeid.replace(globalCityName, "");
                var pos = new kakao.maps.LatLng(gmdata.gpslati, gmdata.gpslong);

                if (type == "route" || (type == "station" && (gpsSearchKeyword == "" || (gpsSearchKeyword !="" && gpsSearchArr.indexOf(stationId) > -1)))) {
                    if (!gpsmarkerdata["gpsstation-" + stationId]) {
                        //마커 생성시
                        var mar = new kakao.maps.Marker({
                            map: map,
                            position: pos,
                            title: "gpsstation-" + stationId,
                            image: new kakao.maps.MarkerImage(globalFilePath + "images/map-station.png", new kakao.maps.Size(24,24), {offset: new kakao.maps.Point(12,12)})
                        });

                        mar.setMap(map);
                        gpsmarkers[stationId] = mar;

                        var siwHtml = stationInfoWindow("start",stationId,gmdata.nodenm,gmdata.gpslati,gmdata.gpslong,"N","Y");

                        mar.win = new kakao.maps.InfoWindow({
                            position: pos,
                            content: siwHtml
                            //disableAutoPan: true
                        });

                        mar.win.open(map, mar);

                        kakao.maps.event.addListener(mar, "click", function() {
                            var dataItemTitle = mar.getTitle().split('-');

                            $(".infoWindowArea").css({display:"none"});
                            $(".markerArea").removeClass("on");
                            $(".markerArea[id^='m-gpsstation-']").children("img").attr("src",globalFilePath + "images/map-station.png");

                            if (dataItemTitle.length > 1) {
                                var dataItemType = dataItemTitle[0];
                                var dataItemId = dataItemTitle[1];

                                stationInfoWindow("click",dataItemId,"","","","","Y");

                                $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                                $(".markerArea#m-" + dataItemType + "-" + dataItemId).addClass("on");
                                $(".markerArea#m-" + dataItemType + "-" + dataItemId).children("img").attr("src",globalFilePath + "images/map-station-on.png");

                                if ($("ul.stationList>li a[data-station-id='" + dataItemId + "']").length > 0) {
                                    $("ul.stationList>li a[data-station-id='" + dataItemId + "']").parent("li").removeClass("on");
                                    $("ul.stationList>li a[data-station-id='" + dataItemId + "']").trigger("click");
                                }
                            }

                            map.setDraggable(true);
                            $(".mContMapArea").removeClass("on");
                            $(".markerArea").children(".bmCircle").removeClass("on");

                            map.setCenter(mar.getPosition());
                            map.setLevel(5);
                        });

                        gpsmarkerdata["gpsstation-" + stationId] = mar;

                        gpsNameArr[stationId] = gmdata.nodenm;
                        gpsNewArr.push(stationId);
                    } else {
                        //반복 호출시
                        stationInfoWindow("loop",stationId,gmdata.nodenm,gmdata.gpslati,gmdata.gpslong,"N","Y");

                        gpsmarkerdata["gpsstation-" + stationId].setPosition(pos);
                        gpsmarkerdata["gpsstation-" + stationId].win.setPosition(pos);

                        gpsNameArr[stationId] = gmdata.nodenm;
                        gpsNewArr.push(stationId);

                        if ($.inArray(stationId,gpsOldArr) > -1) {
                            gpsOldArr.splice($.inArray(stationId,gpsOldArr),1);
                        }
                    }
                }
            }
        });
    }
    
    if (type == "station") {
        var gpsAddHtml = "";
        
        if ($("#mContList .mListInfoArea .mInfoMain>ul").length == 0) {
            $("#mContList .mListInfoArea .mInfoMain").html("<ul class='stationList cf'></ul>");
        }
        
        $("#mContList .mListInfoArea .mInfoMain>ul>li").each(function() {
            if (gpsNewArr.indexOf($(this).children(".listTit").attr("data-station-id")) > -1) {
                $(this).css("display","block");
            } else {
                if ($(this).hasClass("gpsStationItem")) {
                    $(this).remove();
                } else {
                    $(this).css("display","none");
                    $(this).removeClass("on");
                    $(this).find(".routeTable").html("");
                }
            }
        });
        
        for (var i in gpsNewArr) {
            var gpsAddObj = $("#mContList .mListInfoArea .mInfoMain>ul>li>a[data-station-id='" + gpsNewArr[i] + "']").parent("li");
            
            if ($(gpsAddObj).length == 0) {
                gpsAddHtml += "	 <li class='gpsStationItem'>";
                gpsAddHtml += "    	 <a href='javascript:void(0);' data-station-id='" + gpsNewArr[i] + "' class='listTit' onclick='setMSIBL(this);'>";
                gpsAddHtml += "	         <div class='tit'>" + gpsNameArr[gpsNewArr[i]] + "</div>";
                gpsAddHtml += "            <div class='con'>" + gpsNewArr[i] + "</div>";
                gpsAddHtml += "        </a>";
                gpsAddHtml += "        <div class='routeTable'></div>";
                gpsAddHtml += "    </li>";
            }
        }
        
        if (gpsAddHtml != "") {
            $("#mContList .mListInfoArea .mInfoMain>ul").append(gpsAddHtml);
        }
        
        for (var j in gpsOldArr) {
            var gpsDelObj = $("#mContList .mListInfoArea .mInfoMain>ul>li>a[data-station-id='" + gpsOldArr[j] + "']").parent("li");
            
            if ($(gpsDelObj).hasClass("gpsStationItem")) {
                $(gpsDelObj).remove();
            } else {
                $(gpsDelObj).css("display","none");
                $(gpsDelObj).removeClass("on");
                $(gpsDelObj).find(".routeTable").html("");
            }
        }
        
        if (gpsNewArr.length > 0) {
            $("#mContList .mListInfoArea .mInfoMain .empty").css("display","none");
        } else {
            $("#mContList .mListInfoArea .mInfoMain .empty").remove();
            
            $("#mContList .mListInfoArea .mInfoMain").append("<div class='empty'>정류장정보가 없습니다.</div>");
        }
        
        $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(gpsNewArr.length);
    }
    
    if (state == "start") {
        map.setCenter(new kakao.maps.LatLng(myLatitude,myLongitude));
        map.setLevel(5);
    }
    
    for (var i in gpsOldArr) {
        gpsmarkers[gpsOldArr[i]].setMap(null);
        
        delete gpsmarkerdata["gpsstation-" + gpsOldArr[i]];

        $(".infoWindowArea#iw-gpsstation-" + gpsOldArr[i]).each(function() {
            $(this).remove();
        });

        $(".markerArea#m-gpsstation-" + gpsOldArr[i]).each(function() {
            $(this).remove();
        });
    }
    
    $(".stationInfoWindow").each(function() {
        var dataItemType = $(this).attr("data-item-type");
        var dataItemId = $(this).attr("data-item-id");
        
        if ($(this).parent().parent().attr("id") != "iw-" + dataItemType + "-" + dataItemId) {
            $(this).parent().prev().css({display:"none"});
            $(this).parent().parent().css({display:"none"});
            $(this).parent().parent().addClass("infoWindowArea gpsInfoWindowArea");
            $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
            $(this).parent().parent().prev().addClass("markerArea gpsMarkerArea");
            $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
        }
    });
}

//버스 마커
function busMarker(state, routeId) {
    var bmjson = [];
    
    clearTimeout(busTimer);
    
    busOldArr = (state == "loop") ? busNewArr : [];
    busNewArr = [];
    
    //노선 버스위치 조회
    $.ajax({
        dataType: "xml",
        type: "GET",
        url: "https://apis.data.go.kr/1613000/BusLcInfoInqireService/getRouteAcctoBusLcList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeId=" + globalCityName + routeId,
        success: function(result) {
            //console.log(result);
            var resultXml = $(result).find("response").find("body").find("items").find("item");

            $(resultXml).each(function() {
                var bmStationId = $(this).find("nodeid").text().replace(globalCityName, "");
                var bmVehicleNo = $(this).find("vehicleno").text();
                var bmVehicleType = "";
                
                lowBusJson.filter(function(obj) {
                	if ((obj["vehicleno"] === bmVehicleNo) && (obj["vehiclelowtp"] === "저상버스")) {
                		bmVehicleType = "저상버스";
                	}
                });

                var resultXmlJson = {routeId:routeId,routeNm:$(this).find("routenm").text(),routeTp:$(this).find("routetp").text(),stationId:bmStationId,stationNm:$(this).find("nodenm").text(),stationOrd:$(this).find("nodeord").text(),localX:$(this).find("gpslong").text(),localY:$(this).find("gpslati").text(),vehicleno:bmVehicleNo,vehicletp:bmVehicleType};

                bmjson.push(resultXmlJson);
                busNewArr.push(bmVehicleNo);
            });
            
            bmjson.forEach(bmdata=>{
                var pos = new kakao.maps.LatLng(bmdata.localY, bmdata.localX);
                
                var busImgName = "";
                
                if (bmdata.routeTp == "간선버스") {
                	if (bmdata.bmVehicleType == "저상버스") {
                		busImgName = "gansunbus-wheel.png";
                	} else {
                		busImgName = "gansunbus.png";
                	}
                } else if (bmdata.routeTp == "지선버스") {
                	if (bmdata.bmVehicleType == "저상버스") {
                		busImgName = "jisunbus-wheel.png";
                	} else {
                		busImgName = "jisunbus.png";
                	}
                } else if (bmdata.routeTp == "관광버스") {
                	if (bmdata.bmVehicleType == "저상버스") {
                		busImgName = "tourbus-wheel.png";
                	} else {
                		busImgName = "tourbus.png";
                	}
                } else if (bmdata.routeTp == "광역버스" || bmdata.routeTp == "급행버스") {
                	if (bmdata.bmVehicleType == "저상버스") {
                		busImgName = "expressbus-wheel.png";
                	} else {
                		busImgName = "expressbus.png";
                	}
                } else {
                	if (bmdata.bmVehicleType == "저상버스") {
                		busImgName = "bus-wheel.png";
                	} else {
                		busImgName = "bus.png";
                	}
                }
                
                if (!markerdata["bus-" + bmdata.vehicleno]) {
                    //마커 생성시
                    var mar = new kakao.maps.Marker({
                        map: map,
                        position: pos,
                        title: "bus-" + bmdata.vehicleno,
                        image: new kakao.maps.MarkerImage(globalFilePath + "images/" + busImgName, new kakao.maps.Size(36,36), {offset: new kakao.maps.Point(18,18)})
                    });

                    mar.setMap(map);
                    busmarkers[bmdata.vehicleno] = mar;

                    var biwHtml = busInfoWindow("start",bmdata);

                    mar.win = new kakao.maps.InfoWindow({
                        position: pos,
                        content: biwHtml
                        //disableAutoPan: true
                    });

                    mar.win.open(map, mar);

                    kakao.maps.event.addListener(mar, "click", function() {
                        var dataItemTitle = mar.getTitle().split('-');

                        $(".infoWindowArea").css({display:"none"});
                        $(".markerArea").removeClass("on");
                        $(".markerArea[id^='m-station-']").children("img").attr("src",globalFilePath + "images/map-station.png");
                        $(".markerArea[id^='m-gpsstation-']").children("img").attr("src",globalFilePath + "images/map-station.png");

                        if (dataItemTitle.length > 1) {
                            var dataItemType = dataItemTitle[0];
                            var dataItemId = dataItemTitle[1];
                            
                            changeBusDrive("add","bus",$(".infoWindowArea#iw-bus-" + bmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
                            
                            $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                            $(".markerArea#m-" + dataItemType + "-" + dataItemId).addClass("on");
                        }
                        
                        map.setCenter(mar.getPosition());
                        map.setLevel(3);
                    });
                    
                    kakao.maps.event.addListener(map, "dragend", function() {
                        changeBusDrive("remove","bus",$(".infoWindowArea#iw-bus-" + bmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
                    });

                    markerdata["bus-" + bmdata.vehicleno] = mar;
                } else {
                    //반복 호출시
                    busInfoWindow("loop",bmdata);
                    
                    markerdata["bus-" + bmdata.vehicleno].setPosition(pos);
                    markerdata["bus-" + bmdata.vehicleno].win.setPosition(pos);
                    
                    if ($(".busMarkerArea.on + .infoWindowArea#iw-bus-" + bmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive.on").length > 0) {
                    	map.panTo(pos);
                    }
                }
                
                //노선 버스위치 리스트 (이동중인 버스)
                if ($(".stationList .stationListList").length > 0) {
                    var routeStationOrd = parseInt(bmdata.stationOrd) + 1;
                    var routeStationNm2 = globalRouteStationNm2[routeStationOrd];
                    var routeStationLat = globalRouteStationLat[bmdata.routeId];
                    var routeStationLon = globalRouteStationLon[bmdata.routeId];
                    var busDirection = (routeStationNm2 == undefined || (routeStationLat == bmdata.localY && routeStationLon == bmdata.localX)) ? "<span class='busArrival'>도착</span>" : "<span class='busMove'>이동중</span>";
                    
                    //버스 이미지 삭제
                    if ($(".stationList .stationListList>li[data-bus-num='" + bmdata.vehicleno + "'] .img .busImg").length > 0) {
                        $(".stationList .stationListList>li[data-bus-num='" + bmdata.vehicleno + "'] .img .busImg").remove();
                        $(".stationList .stationListList>li[data-bus-num='" + bmdata.vehicleno + "'] .img .busTit").remove();
                        $(".stationList .stationListList>li[data-bus-num='" + bmdata.vehicleno + "'] .img").children(".arrowImg").css("display","block");
                        $(".stationList .stationListList>li[data-bus-num='" + bmdata.vehicleno + "']").attr("data-bus-num","");
                    }
                    
                    //버스 이미지 추가
                    var busHtml = "";
                    busHtml += "<img src='" + globalFilePath + "images/" + busImgName + "' alt='bus' class='busImg' onclick='markerPosition(\"bus\",\"" + bmdata.vehicleno + "\",\"Y\")'>";
                    busHtml += "<span class='busTit'>" + bmdata.vehicleno + "<br>" + busDirection + "</span>";
                    
                    $(".stationList .stationListList>li[data-station-order='" + bmdata.stationOrd + "'] .img").children(".arrowImg").css("display","none");
                    $(".stationList .stationListList>li[data-station-order='" + bmdata.stationOrd + "'] .img").append(busHtml);
                    $(".stationList .stationListList>li[data-station-order='" + bmdata.stationOrd + "']").attr("data-bus-num",bmdata.vehicleno);
                }
            });

            $(".busInfoWindow").each(function() {
                var dataItemType = $(this).attr("data-item-type");
                var dataItemId = $(this).attr("data-item-id");
                
                if ($(this).parent().parent().attr("id") != "iw-" + dataItemType + "-" + dataItemId) {
                    $(this).parent().prev().css({display:"none"});
                    $(this).parent().parent().css({display:"none"});
                    $(this).parent().parent().addClass("infoWindowArea");
                    $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
                    $(this).parent().parent().prev().addClass("markerArea busMarkerArea");
                    $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
                }
            });
            
            //노선 버스위치 리스트 (종점에 도착한 버스)
            if ($(".stationList .stationListList").length > 0) {
                for (var i in busOldArr) {
                    if (busNewArr.indexOf(busOldArr[i]) == -1) {
                        busmarkers[busOldArr[i]].setMap(null);

                        $(".infoWindowArea#iw-bus-" + busOldArr[i]).each(function() {
                            $(this).remove();
                        });

                        $(".markerArea#m-bus-" + busOldArr[i]).each(function() {
                            $(this).remove();
                        });
                        
                        //버스 이미지 삭제
                        if ($(".stationList .stationListList>li[data-bus-num='" + busOldArr[i] + "'] .img .busImg").length > 0) {
                            $(".stationList .stationListList>li[data-bus-num='" + busOldArr[i] + "'] .img .busImg").remove();
                            $(".stationList .stationListList>li[data-bus-num='" + busOldArr[i] + "'] .img .busTit").remove();
                            $(".stationList .stationListList>li[data-bus-num='" + busOldArr[i] + "'] .img").children(".arrowImg").css("display","block");
                            $(".stationList .stationListList>li[data-bus-num='" + busOldArr[i] + "']").attr("data-bus-num","");
                        }
                    }
                }
            }
            
            busTimer = setTimeout(function() {
                busMarker("loop",routeId);
            }, 10000);
            
            console.log("busMarkerEnd");
            $(".preloader").fadeOut(400);
        },
        fail: function(res) {
            if (res.readyState != 0 || res.status != 0) {
                if (!(res.status == 0 && res.statusText == "abort")) {
                    //alert("관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText);
                    openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText,"");
                }
            }

            $(".preloader").fadeOut(400);
        },
        error: function(res) {
            if (res.readyState != 0 || res.status != 0) {
                if (!(res.status == 0 && res.statusText == "abort")) {
                    //alert("관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText);
                    openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText,"");
                }
            }

            $(".preloader").fadeOut(400);
        }
    });
}

//저상버스 마커
function lowBusMarker(state, routeId, routeNm) {
    var lbmjson = [];
    var listRouteArr = [];
    var listHtml = "";
    var listSubHtml = "";
    var listCnt = 0;
    
    //clearTimeout(lowBusTimer);
    
    lowBusOldArr = (state == "loop") ? lowBusNewArr : [];
    lowBusNewArr = [];
    
    //모든 버스위치 조회
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://112.164.247.117:8080/api/online?apikey=" + globalApiKey,
        success: function(result) {
            //console.log(result);
            result.data.forEach(resultdata=>{
        		var lbmVehicleNo = resultdata.BUS_NO;
        		
        		lowBusJson.filter(function(obj) {
        			if (state == "start") {
        				if ((obj["vehicleno"] === lbmVehicleNo) && (obj["vehiclelowtp"] === "저상버스") && (resultdata.LONGITUDE != 0) && (resultdata.LATITUDE != 0)) {
                    		var resultJson = {routeId:resultdata.BUS_ROUTE_ID,routeNm:resultdata.BUS_ROUTE_NO,routeTp:resultdata.devicesection,localX:resultdata.LONGITUDE,localY:resultdata.LATITUDE,vehicleno:lbmVehicleNo,vehicleCompany:resultdata.BUS_COMPANY,angle:resultdata.ANGLE,speed:resultdata.SPEED};
                    		
                    		lbmjson.push(resultJson);
                            lowBusNewArr.push(lbmVehicleNo);
                    	}
        			} else {
        				if (lowbusmarkerdata["lowbus-" + lbmVehicleNo]) {
        					var resultJson = {routeId:resultdata.BUS_ROUTE_ID,routeNm:resultdata.BUS_ROUTE_NO,routeTp:resultdata.devicesection,localX:resultdata.LONGITUDE,localY:resultdata.LATITUDE,vehicleno:lbmVehicleNo,vehicleCompany:resultdata.BUS_COMPANY,angle:resultdata.ANGLE,speed:resultdata.SPEED};
                    		
                    		lbmjson.push(resultJson);
                            lowBusNewArr.push(lbmVehicleNo);
        				}
        			}
                });
        	});
            
            lbmjson.forEach(lbmdata=>{
                var pos = new kakao.maps.LatLng(lbmdata.localY, lbmdata.localX);
                
                var busImgName = "";
                
                if (lbmdata.routeTp == "간선") {
                	busImgName = "gansunbus-wheel.png";
                } else if (lbmdata.routeTp == "지선") {
                	busImgName = "jisunbus-wheel.png";
                } else if (lbmdata.routeTp == "관광") {
                	busImgName = "tourbus-wheel.png";
                } else if (lbmdata.routeTp == "광역" || lbmdata.routeTp == "급행") {
                	busImgName = "expressbus-wheel.png";
                } else {
                	busImgName = "bus-wheel.png";
                }
                
                if (state == "start") {
                    var startJson = {};
                    
                    startJson.lat = lbmdata.localY;
                    startJson.lng = lbmdata.localX;
                    startArr[lbmdata.vehicleno] = startJson;
                    
                    //마커 생성시
                    var mar = new kakao.maps.Marker({
                        map: map,
                        position: pos,
                        title: "lowbus-" + lbmdata.vehicleno,
                        image: new kakao.maps.MarkerImage(globalFilePath + "images/" + busImgName, new kakao.maps.Size(36,36), {offset: new kakao.maps.Point(18,18)})
                    });

                    mar.setMap(map);
                    lowbusmarkers[lbmdata.vehicleno] = mar;

                    var lbiwHtml = lowBusInfoWindow("start",lbmdata);

                    mar.win = new kakao.maps.InfoWindow({
                        position: pos,
                        content: lbiwHtml
                        //disableAutoPan: true
                    });
                    
                    mar.lastAngle = (lbmdata.angle != 0) ? lbmdata.angle : 90;

                    mar.win.open(map, mar);

                    kakao.maps.event.addListener(mar, "click", function() {
                        var dataItemTitle = mar.getTitle().split('-');

                        $(".infoWindowArea").css({display:"none"});
                        $(".markerArea").removeClass("on");
                        $(".markerArea[id^='m-station-']").children("img").attr("src",globalFilePath + "images/map-station.png");
                        $(".markerArea[id^='m-gpsstation-']").children("img").attr("src",globalFilePath + "images/map-station.png");

                        if (dataItemTitle.length > 1) {
                            setMRISL($("#mContList .mListInfoArea .mInfoMain>ul>li>.listTit[data-route-id='" + lbmdata.routeId + "']"),lbmdata.vehicleno);
                            
                            var dataItemType = dataItemTitle[0];
                            var dataItemId = dataItemTitle[1];
                            
                            changeBusDrive("add","lowbus",$(".infoWindowArea#iw-lowbus-" + lbmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
                            
                            $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                            $(".markerArea#m-" + dataItemType + "-" + dataItemId).addClass("on");
                        }
                        
                        if (globalFileUrl.indexOf("/mobile/") > -1) {
                        	$("#mContList").removeClass("on");
                            $("#mContList .mListBtnArea .mListBtn").find("i").attr("class", "fas fa-chevron-up");
                        } else {
                        	$("#contList").removeClass("on");
                            $("#contList .listBtnArea #arrowBtn").find("i").attr("class", "fas fa-chevron-up");
                        }
                        
                        $(startArr[lbmdata.vehicleno]).stop().animate(endArr[lbmdata.vehicleno], {
                            easing :'linear', queue:false,  
                                step: function(now,fx) {
                                    map.setCenter(mar.getPosition());
                                    map.setLevel(3);
                                }
                            }
                        );
                    });
                    
                    kakao.maps.event.addListener(map, "dragend", function() {
                        //changeBusDrive("remove","lowbus",$(".infoWindowArea#iw-lowbus-" + lbmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
                    });
                    
                    kakao.maps.event.addListener(map, "zoom_changed", function() {
                        $(".mContMapArea").removeClass("on");
                        
                        if ($(".busMarkerArea.on + .infoWindowArea .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive.on").length > 0) {
                            setTimeout(function() {
                                $(".mContMapArea").addClass("on");
                            }, 200);
                        }
                    });

                    lowbusmarkerdata["lowbus-" + lbmdata.vehicleno] = mar;
                    
                    if (listRouteArr.indexOf(lbmdata.routeId) === -1) {
                		if (globalFileUrl.indexOf("/mobile/") > -1) {
                    		listSubHtml += "    <li>";
                        	listSubHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='" + lbmdata.routeId + "' data-route-num='" + lbmdata.routeNm + "' onclick='setMRISL(this);'>";
                        	listSubHtml += "            <div class='tit'>" + lbmdata.routeNm + "</div>";
                        	listSubHtml += "        </a>";
                        	listSubHtml += "		 <div class='stationList'></div>";
                        	listSubHtml += "    </li>";
                    	} else {
                    		listSubHtml += "                <li>";
                    		listSubHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='" + lbmdata.routeId + "' data-route-num='" + lbmdata.routeNm + "' onclick='setRISL(this);'>";
                    		listSubHtml += "                        <div class='tit'>" + lbmdata.routeNm + "</div>";
                    		listSubHtml += "                    </a>";
                    		listSubHtml += "                </li>";
                    	}
                    	
                    	listRouteArr.push(lbmdata.routeId);
                        listCnt++;
                	}
                } else {
                    var bounds = map.getBounds();
                    var minlat = bounds.ha;
                    var maxlat = bounds.oa;
                    var minlng = bounds.qa;
                    var maxlng = bounds.pa;
                    
                    var endJson = {};
                    
                    endJson.lat = lbmdata.localY;
                    endJson.lng = lbmdata.localX;
                    endArr[lbmdata.vehicleno] = endJson;
                    
                    //반복 호출시
                    lowBusInfoWindow("loop",lbmdata);
                    
                    lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].setPosition(pos);
                    lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].win.setPosition(pos);
                    
                    var lowBusAngle = 90;
                    
                    if (lbmdata.angle != 0) {
                    	lowBusAngle = lbmdata.angle;
                    } else if (lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].lastAngle && lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].lastAngle != 0) {
                    	lowBusAngle = lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].lastAngle;
                    }
                    
                    $(".markerArea#m-lowbus-" + lbmdata.vehicleno).children("img").css({"transform":"rotate(" + lowBusAngle + "deg)","transform-origin":"center"});
                    lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].lastAngle = lowBusAngle;
                    
                    if ($(".busMarkerArea.on + .infoWindowArea#iw-lowbus-" + lbmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive.on").length > 0) {
                    	$(startArr[lbmdata.vehicleno]).stop().animate(endArr[lbmdata.vehicleno], {
                            easing :'linear', queue:false,  
                                step: function(now,fx) {
                                    map.panTo(pos);
                                }
                            }
                        );
                    }
                    
                    if (minlat <= lbmdata.localX && maxlat >= lbmdata.localX && minlng <= lbmdata.localY && maxlng >= lbmdata.localY) {
                        
                    } else {
                        startArr[lbmdata.vehicleno].lat = endArr[lbmdata.vehicleno].lat;
                        startArr[lbmdata.vehicleno].lng = endArr[lbmdata.vehicleno].lng;
                    }
                    
                    /*var lowBusLatlng = lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].getPosition();
                	var lowBusLat = lowBusLatlng.getLat();
                	var lowBusLng = lowBusLatlng.getLng();
                	
                	var i = 0;
                	var deltaNum = 20;
                	var deltaLat;
                	var deltaLng;
                	
                	deltaLat = (lbmdata.localY - lowBusLat) / deltaNum
                	deltaLng = (lbmdata.localX - lowBusLng) / deltaNum;
                	
                	if (lbmdata.speed != 0 && lbmdata.localY != lowBusLat) {
                		moveLowBusMarker();
                	}
                	
                	function moveLowBusMarker() {
                		clearTimeout(lowBusTimer2);
                		
                		lowBusLat += deltaLat;
                		lowBusLng += deltaLng;
                		
                		var pos2 = new kakao.maps.LatLng(lowBusLat, lowBusLng);
                        
                    	lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].setPosition(pos2);
                        lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].win.setPosition(pos2);
                        
                        if (i != deltaNum) {
                        	i++;
                        	
                        	lowBusTimer2 = setTimeout(function() {
                        		moveLowBusMarker();
                            }, 50);
                        }
                	}*/
                }
            });
            
            if (state == "start") {
        		map.setCenter(new kakao.maps.LatLng(mapLatitude,mapLongitude));
                map.setLevel(5);
                
                if (globalFileUrl.indexOf("/mobile/") > -1) {
                	if (listSubHtml != "") {
                    	listHtml += "<ul class='routeList cf'>";
                    	listHtml += listSubHtml;
                    	listHtml += "</ul>";
                    } else {
                    	listHtml += "<div class='empty'>노선정보가 없습니다.</div>";
                    }
                    
                    if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
                        $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
                    }

                    if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
                        $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
                    }
                    
                    if (routeId != undefined) {
                    	listCnt = 0;
                    	
                    	$("#mContList .mListInfoArea .mInfoMain .routeList>li").each(function() {
                			$(this).find(".stationList").html("");
                			
                			if ($(this).find(".listTit").attr("data-route-num").indexOf(routeNm) > -1) {
                				$(this).css("display","block");
                				listCnt++;
                			} else {
                				$(this).css("display","none");
                			}
                		});
                		
                		$("#mContList .mListInfoArea .mInfoTop .mInfoSearch input[name='keyword']").val(routeNm);
                		
                		$("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
                		
                		if (listCnt > 0) {
                			$("#mContList .mListInfoArea .mInfoMain .empty").css("display","none");
                			$("#mContList .mListInfoArea .mInfoMain .routeList>li").removeClass("on");
                			$("#mContList .mListInfoArea .mInfoMain .routeList").css("display","block");
                		} else {
                			$("#mContList .mListInfoArea .mInfoMain .routeList>li").removeClass("on");
                			$("#mContList .mListInfoArea .mInfoMain .routeList").css("display","none");
                			
                			if ($("#mContList .mListInfoArea .mInfoMain .empty").length == 0) {
                				$("#mContList .mListInfoArea .mInfoMain").append("<div class='empty'>노선정보가 없습니다.</div>");
                			}
                			
                			$("#mContList .mListInfoArea .mInfoMain .empty").css("display","block");
                		}
                		
                		setMRISL($("#mContList .mListInfoArea .mInfoMain>ul>li>.listTit[data-route-id='" + routeId + "']"));
                    }
                } else {
                	listHtml += "<div id='routeInfo' class='listInfo'>";
        	        listHtml += "    <div class='infoTop cf'>";
        	        listHtml += "        <div class='infoSearch'>";
        	        listHtml += "            <form id='' name='' method='' class='cf'>";
        	        listHtml += "                <input type='hidden' name='type' value='route'>";
        	        listHtml += "                <input type='text' name='keyword'" + (routeId != undefined ? " value='" + routeNm + "'" : "") + " placeholder='노선번호를 입력해주세요.'>";
        	        listHtml += "                <input type='button' value='검색' onclick='setInfoSearch(this);'>";
        	        listHtml += "            </form>";
        	        listHtml += "        </div>";
        	        listHtml += "        <div class='infoTitle'>노선정보 (<span class='num'>" + listCnt + "</span>)</div>";
        	        listHtml += "        <div class='infoVisible'><input type='checkbox' name='' id='infoVisible'><label for='infoVisible'>정류장 노출</label></div>";
        	        listHtml += "    </div>";
        	        listHtml += "    <div class='infoMain'>";
        	        listHtml += "        <div class='infoMainLeft'>";
        	        
        	        if (listSubHtml != "") {
        	        	listHtml += "            <ul class='routeList cf'>";
        	        	listHtml += listSubHtml;
        	        	listHtml += "            </ul>";
        	        } else {
        	        	listHtml += "            <div class='empty'>노선정보가 없습니다.</div>";
        	        }
        	        
        	        listHtml += "        </div>";
        	        listHtml += "        <div class='infoMainRight'>";
        	        listHtml += "            <div class='stationList'>";
        	        listHtml += "                <div class='empty'>노선을 선택해주세요.</div>";
        	        listHtml += "            </div>";
        	        listHtml += "        </div>";
        	        listHtml += "    </div>";
        	        listHtml += "</div>";
        	        
        	        if ($("#contList .listInfoArea").length > 0) {
        	            $("#contList .listInfoArea").html(listHtml);
                        $("#contList .listInfoArea .infoTop .infoTitle .num").html(listCnt);
        	        }
        	        
        	        if (routeId != undefined) {
                    	listCnt = 0;
                    	
                    	$("#contList .listInfoArea .infoMain .infoMainLeft .routeList>li").each(function() {
                			if ($(this).find(".listTit").attr("data-route-num").indexOf(routeNm) > -1) {
                				$(this).css("display","block");
                				listCnt++;
                			} else {
                				$(this).css("display","none");
                			}
                		});
                		
                		$("#contList .listInfoArea .infoTop .infoTitle .num").text(listCnt);
                		
                		if (listCnt > 0) {
                			$("#contList .listInfoArea .infoMain .infoMainLeft .empty").css("display","none");
                			$("#contList .listInfoArea .infoMain .infoMainLeft .routeList>li").removeClass("on");
                			$("#contList .listInfoArea .infoMain .infoMainLeft .routeList").css("display","block");
                		} else {
                			$("#contList .listInfoArea .infoMain .infoMainLeft .routeList>li").removeClass("on");
                			$("#contList .listInfoArea .infoMain .infoMainLeft .routeList").css("display","none");
                			
                			if ($("#contList .listInfoArea .infoMain .infoMainLeft .empty").length == 0) {
                				$("#contList .listInfoArea .infoMain .infoMainLeft").append("<div class='empty'>노선정보가 없습니다.</div>");
                			}
                			
                			$("#contList .listInfoArea .infoMain .infoMainLeft .empty").css("display","block");
                		}
                		
                		setRISL($("#contList .listInfoArea .infoMain .infoMainLeft .routeList li .listTit[data-route-id='" + routeId + "']"));	
                    }
                }
        	}

            $(".busInfoWindow").each(function() {
                var dataItemType = $(this).attr("data-item-type");
                var dataItemId = $(this).attr("data-item-id");
                var dataItemRouteId = $(this).attr("data-item-route-id");
                
                if ($(this).parent().parent().attr("id") != "iw-" + dataItemType + "-" + dataItemId) {
                    $(this).parent().prev().css({display:"none"});
                    $(this).parent().parent().css({display:"none"});
                    $(this).parent().parent().addClass("infoWindowArea lowBusInfoWindowArea iw-" + dataItemType + "-route-" + dataItemRouteId);
                    $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
                    $(this).parent().parent().prev().addClass("markerArea busMarkerArea lowBusMarkerArea m-" + dataItemType + "-route-" + dataItemRouteId);
                    $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
                    
                    $(".markerArea#m-lowbus-" + dataItemId).children("img").css({"transform":"rotate(" + lowbusmarkerdata["lowbus-" + dataItemId].lastAngle + "deg)","transform-origin":"center"});
                    
                    if ($(".mContMapArea").length == 0) {
                        $(this).parent().parent().parent().parent().addClass("mContMapArea");
                    }
                    
                    if ($(".markerArea#m-" + dataItemType + "-" + dataItemId + " .bmTit").length == 0) {
                    	$(".markerArea#m-" + dataItemType + "-" + dataItemId).append("<div class='bmTit'>" + dataItemId + "</div>");
                    }
                    
                    if ($(".markerArea#m-" + dataItemType + "-" + dataItemId + " .bmCircle").length == 0) {
                    	$(".markerArea#m-" + dataItemType + "-" + dataItemId).append("<div class='bmCircle'></div>");
                    }
                }
            });
            
            /*for (var i in lowBusOldArr) {
                if (lowBusNewArr.indexOf(lowBusOldArr[i]) == -1) {
                    lowbusmarkers[lowBusOldArr[i]].setMap(null);

                    $(".infoWindowArea#iw-lowbus-" + lowBusOldArr[i]).each(function() {
                        $(this).remove();
                    });

                    $(".markerArea#m-lowbus-" + lowBusOldArr[i]).each(function() {
                        $(this).remove();
                    });
                }
            }*/
            
            lowBusTimer = setTimeout(function() {
                lowBusMarker("loop");
            }, 600);
            
            //$(".preloader").fadeOut(400);
            
            //검색할 때 엔터키 submit 막기
	        $("input[name='keyword']").keydown(function(event) {
	        	if (event.keyCode == "13") {
	                if (window.event) {
	                    event.preventDefault();
	                    $(this).siblings("input[type='button']").trigger("click");
	                    return;
	                }
	            }
	        });
	        
	        //노선검색에서 정류장 노출여부
	        $("#infoVisible").change(function() {
	        	setRouteStationVisible();
	        });
        },
        fail: function(res) {
            if (res.readyState != 0 || res.status != 0) {
                if (!(res.status == 0 && res.statusText == "abort")) {
                    //alert("관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText);
                    openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText,"");
                }
            }

            $(".preloader").fadeOut(400);
        },
        error: function(res) {
            if (res.readyState != 0 || res.status != 0) {
                if (!(res.status == 0 && res.statusText == "abort")) {
                    //alert("관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText);
                    openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText,"");
                }
            }

            $(".preloader").fadeOut(400);
        }
    });
}

//정류장 인포윈도우
function stationInfoWindow(state, stationId, stationName, stationLatitude, stationLongitude, courseFlag, gpsFlag) {
    var type = (gpsFlag == "Y") ? "gpsstation" : "station";
    var siwHtml = "";
    var resultArr = [];
    
    if (state == "start") {
        //마커 생성시
        siwHtml += "<div class='stationInfoWindow' data-item-type='" + type + "' data-item-id='" + stationId + "'>";
        siwHtml += "    <div class='siwTop'>";
        siwHtml += "        <div class='siwTit'>";
        siwHtml += "            " + stationName + "";
        siwHtml += "            <span>" + stationId + "</span>";
        siwHtml += "        </div>";
        siwHtml += "        <div class='close' onclick='closeInfoWindow(\"" + type + "\",this);'><img src='" + globalFilePath + "images/menu_top_close.png' alt='info-window-close'></div>";
        siwHtml += "    </div>";
        siwHtml += "    <div class='siwCon'>";
        siwHtml += "        <div class='routeTable" + (courseFlag == "Y" ? " courseTable" : "") + "'>";
        siwHtml += "            <table class='table'>";
        siwHtml += "                <colgroup>";
        siwHtml += "                    <col width='*'>";
        siwHtml += "                    <col width='60px'>";
        siwHtml += "                    <col width='60px'>";
        siwHtml += "                    <col width='60px'>";
        siwHtml += "                </colgroup>";
        siwHtml += "                <thead>";
        siwHtml += "                    <tr>";
        siwHtml += "                        <th>노선번호</th>";
        siwHtml += "                        <th>버스종류</th>";
        siwHtml += "                        <th>도착예정</th>";
        siwHtml += "                        <th>현재위치</th>";
        siwHtml += "                    </tr>";
        siwHtml += "                </thead>";
        siwHtml += "                <tbody></tbody>";
        siwHtml += "            </table>";
        siwHtml += "        </div>";
        
        if (courseFlag == "Y") {
            siwHtml += "        <div class='courseBtnArea'>";
            //siwHtml += "            <div class='courseBtn' data-station-id='" + stationId + "' data-station-name='" + stationName + "' data-station-latitude='" + stationLatitude + "' data-station-longitude='" + stationLongitude + "' onclick='setCourseInput(\"mStart\",this);'>출발</div>";
            //siwHtml += "            <div class='courseBtn' data-station-id='" + stationId + "' data-station-name='" + stationName + "' data-station-latitude='" + stationLatitude + "' data-station-longitude='" + stationLongitude + "' onclick='setCourseInput(\"mArrival\",this);'>도착</div>";
            siwHtml += "        </div>";
        }

        siwHtml += "    </div>";
        siwHtml += "</div>";

        return siwHtml;
    } else if (state == "click") {
        //마커 클릭시
        clearTimeout(stationTimer);
        
        //정류장 도착정보 조회
        $.ajax({
            dataType: "xml",
            type: "GET",
            url: "https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeId=" + globalCityName + stationId,
            success: function(result) {
                //console.log(result);
                var resultXml = $(result).find("response").find("body").find("items").find("item");

                var siwCnt = (resultXml.length > 0) ? resultXml.length : 0;

                if (siwCnt > 0) {
                    siwCnt = 0;

                    $(resultXml).each(function() {
                        var siwRouteId = $(this).find("routeid").text().replace(globalCityName, "");
                        var siwStationId = $(this).find("nodeid").text().replace(globalCityName, "");
                        var siwKey = parseInt($(this).find("arrprevstationcnt").text() + siwRouteId);

                        var resultXmlJson = {idx:siwKey,routeId:siwRouteId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),stationId:siwStationId,stationNm:$(this).find("nodenm").text(),arrprevstationcnt:$(this).find("arrprevstationcnt").text(),arrtime:$(this).find("arrtime").text(),vehicletp:$(this).find("vehicletp").text()};
                        
                        resultArr.push(resultXmlJson);

                        siwCnt++;
                    });
                    
                    if (siwCnt > 0) {
                        resultArr.sort(function(a,b) {
                            return parseInt(a.idx) - parseInt(b.idx);
                        });
                        
                        for (var row in resultArr) {
                            var routeStationNm = globalRouteStationNm[resultArr[row].routeId];
                            var arrivalTime = Math.ceil(resultArr[row].arrtime / 60);
                            
                            if (globalFileUrl.indexOf("/JWN/") > -1) {
                                if (resultArr[row].vehicletp == "저상버스") {
                                    if (globalFileUrl.indexOf("/mobile/") > -1) {
                                        siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setMBISL(this);'>";
                                    } else {
                                        siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setBISL(this);'>";
                                    }
                                } else {
                                    siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='openLayer(\"alert\",\"실시간 노선검색은 저상버스만 할 수 있습니다.\",\"\");'>";
                                }
                            } else {
                                if (globalFileUrl.indexOf("/mobile/") > -1) {
                                    siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setMBISL(this);'>";
                                } else {
                                    siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setBISL(this);'>";
                                }
                            }
                            
                            siwHtml += "    <td><span>" + resultArr[row].routeNm + "</span>" + (routeStationNm != undefined ? " (" + routeStationNm + ")" : "") + "</td>";
                            
                            if (globalFileUrl.indexOf("/JWN/") > -1 && resultArr[row].vehicletp == "저상버스") {
                                siwHtml += "    <td><b>" + resultArr[row].vehicletp + "</b></td>";
                            } else {
                                siwHtml += "    <td>" + resultArr[row].vehicletp + "</td>";
                            }
                            
                            siwHtml += "    <td>" + (arrivalTime > 0 ? "약" + arrivalTime + "분후" : "곧도착") + "</td>";
                            siwHtml += "    <td>" + resultArr[row].arrprevstationcnt + "구간전</td>";
                            siwHtml += "</tr>";
                        }
                    } else {
                        siwHtml += "<tr>";
                        siwHtml += "    <td colspan='4'>도착정보가 없습니다.</td>";
                        siwHtml += "</tr>";
                    }
                } else {
                    siwHtml += "<tr>";
                    siwHtml += "    <td colspan='4'>도착정보가 없습니다.</td>";
                    siwHtml += "</tr>";
                }
                
                $(".infoWindowArea#iw-" + type + "-" + stationId + " .stationInfoWindow .siwCon .routeTable .table tbody").html(siwHtml);

                stationTimer = setTimeout(function() {
                    stationInfoWindow("loop",stationId,"","","","",gpsFlag);
                }, 10000);
                
                console.log("stationInfoWindowClickEnd");
                $(".preloader").fadeOut(400);
            },
            fail: function(res) {
                if (res.readyState != 0 || res.status != 0) {
                    if (!(res.status == 0 && res.statusText == "abort")) {
                        //alert("관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText);
                        openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText,"");
                    }
                }

                $(".preloader").fadeOut(400);
            },
            error: function(res) {
                if (res.readyState != 0 || res.status != 0) {
                    if (!(res.status == 0 && res.statusText == "abort")) {
                        //alert("관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText);
                        openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText,"");
                    }
                }

                $(".preloader").fadeOut(400);
            }
        });
    } else if (state == "loop") {
        //반복 호출시
        clearTimeout(stationTimer);
        
        if ($(".markerArea.on").length > 0) {
            //정류장 도착정보 조회
            $.ajax({
                dataType: "xml",
                type: "GET",
                url: "https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeId=" + globalCityName + stationId,
                success: function(result) {
                    //console.log(result);
                    var resultXml = $(result).find("response").find("body").find("items").find("item");

                    var siwCnt = (resultXml.length > 0) ? resultXml.length : 0;

                    if (siwCnt > 0) {
                        siwCnt = 0;

                        $(resultXml).each(function() {
                            var siwRouteId = $(this).find("routeid").text().replace(globalCityName, "");
                            var siwStationId = $(this).find("nodeid").text().replace(globalCityName, "");
                            var siwKey = parseInt($(this).find("arrprevstationcnt").text() + siwRouteId);

                            var resultXmlJson = {idx:siwKey,routeId:siwRouteId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),stationId:siwStationId,stationNm:$(this).find("nodenm").text(),arrprevstationcnt:$(this).find("arrprevstationcnt").text(),arrtime:$(this).find("arrtime").text(),vehicletp:$(this).find("vehicletp").text()};

                            resultArr.push(resultXmlJson);

                            siwCnt++;
                        });

                        if (siwCnt > 0) {
                            resultArr.sort(function(a,b) {
                                return parseInt(a.idx) - parseInt(b.idx);
                            });

                            for (var row in resultArr) {
                                var routeStationNm = globalRouteStationNm[resultArr[row].routeId];
                                var arrivalTime = Math.ceil(resultArr[row].arrtime / 60);                                
                                
                                if (globalFileUrl.indexOf("/JWN/") > -1) {
                                    if (resultArr[row].vehicletp == "저상버스") {
                                        if (globalFileUrl.indexOf("/mobile/") > -1) {
                                            siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setMBISL(this);'>";
                                        } else {
                                            siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setBISL(this);'>";
                                        }
                                    } else {
                                        siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='openLayer(\"alert\",\"실시간 노선검색은 저상버스만 할 수 있습니다.\",\"\");'>";
                                    }
                                } else {
                                    if (globalFileUrl.indexOf("/mobile/") > -1) {
                                        siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setMBISL(this);'>";
                                    } else {
                                        siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setBISL(this);'>";
                                    }
                                }
                                
                                siwHtml += "    <td><span>" + resultArr[row].routeNm + "</span>" + (routeStationNm != undefined ? " (" + routeStationNm + ")" : "") + "</td>";
                                
                                if (globalFileUrl.indexOf("/JWN/") > -1 && resultArr[row].vehicletp == "저상버스") {
                                    siwHtml += "    <td><b>" + resultArr[row].vehicletp + "</b></td>";
                                } else {
                                    siwHtml += "    <td>" + resultArr[row].vehicletp + "</td>";
                                }
                                
                                siwHtml += "    <td>" + (arrivalTime > 0 ? "약" + arrivalTime + "분후" : "곧도착") + "</td>";
                                siwHtml += "    <td>" + resultArr[row].arrprevstationcnt + "구간전</td>";
                                siwHtml += "</tr>";
                            }
                        } else {
                            siwHtml += "<tr>";
                            siwHtml += "    <td colspan='4'>도착정보가 없습니다.</td>";
                            siwHtml += "</tr>";
                        }
                    } else {
                        siwHtml += "<tr>";
                        siwHtml += "    <td colspan='4'>도착정보가 없습니다.</td>";
                        siwHtml += "</tr>";
                    }

                    $(".infoWindowArea#iw-" + type + "-" + stationId + " .stationInfoWindow .siwCon .routeTable .table tbody").html(siwHtml);

                    stationTimer = setTimeout(function() {
                        stationInfoWindow("loop",stationId,"","","","",gpsFlag);
                    }, 10000);
                    
                    console.log("stationInfoWindowLoopEnd");
                    $(".preloader").fadeOut(400);
                },
                fail: function(res) {
                    if (res.readyState != 0 || res.status != 0) {
                        if (!(res.status == 0 && res.statusText == "abort")) {
                            //alert("관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText);
                            openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText,"");
                        }
                    }

                    $(".preloader").fadeOut(400);
                },
                error: function(res) {
                    if (res.readyState != 0 || res.status != 0) {
                        if (!(res.status == 0 && res.statusText == "abort")) {
                            //alert("관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText);
                            openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText,"");
                        }
                    }

                    $(".preloader").fadeOut(400);
                }
            });
        }
    }
}

//정류장 도착정보 리스트
function stationInfoWindow2(stationId) {
    var siwHtml = "";
    var resultArr = [];
    
   clearTimeout(stationTimer2);

    if ($(".routeTable .routeTableList").length > 0) {
        var dataStationId = $(".routeTable .routeTableList").attr("data-station-id");

        //정류장 도착정보 조회
        $.ajax({
            dataType: "xml",
            type: "GET",
            url: "https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeId=" + globalCityName + dataStationId,
            success: function(result) {
                //console.log(result);
                var resultXml = $(result).find("response").find("body").find("items").find("item");

                var siwCnt = (resultXml.length > 0) ? resultXml.length : 0;

                if (siwCnt > 0) {
                    siwCnt = 0;

                    $(resultXml).each(function() {
                        var siwRouteId = $(this).find("routeid").text().replace(globalCityName, "");
                        var siwStationId = $(this).find("nodeid").text().replace(globalCityName, "");
                        var siwKey = parseInt($(this).find("arrprevstationcnt").text() + siwRouteId);

                        var resultXmlJson = {idx:siwKey,routeId:siwRouteId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),stationId:siwStationId,stationNm:$(this).find("nodenm").text(),arrprevstationcnt:$(this).find("arrprevstationcnt").text(),arrtime:$(this).find("arrtime").text(),vehicletp:$(this).find("vehicletp").text()};

                        resultArr.push(resultXmlJson);

                        siwCnt++;
                    });

                    if (siwCnt > 0) {
                        resultArr.sort(function(a,b) {
                            return parseInt(a.idx) - parseInt(b.idx);
                        });

                        if ($(".routeTable .routeTableList").prop('tagName').toLowerCase() == "table") {
                            for (var row in resultArr) {
                                var routeStationNm = globalRouteStationNm[resultArr[row].routeId];
                                var arrivalTime = Math.ceil(resultArr[row].arrtime / 60);
                                
                                siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setBISL(this);'>";
                                siwHtml += "    <td><span>" + resultArr[row].routeNm + "</span>" + (routeStationNm != undefined ? " (" + routeStationNm + ")" : "") + "</td>";
                                siwHtml += "    <td>" + resultArr[row].vehicletp + "</td>";
                                siwHtml += "    <td>" + (arrivalTime > 0 ? "약" + arrivalTime + "분후" : "곧도착") + "</td>";
                                siwHtml += "    <td>" + resultArr[row].arrprevstationcnt + "구간전</td>";
                                siwHtml += "</tr>";
                            }
                        } else if ($(".routeTable .routeTableList").prop('tagName').toLowerCase() == "ul") {
                            for (var row in resultArr) {
                                var routeStationNm = globalRouteStationNm[resultArr[row].routeId];
                                var arrivalTime = Math.ceil(resultArr[row].arrtime / 60);
                                
                                siwHtml += "<li data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setMBISL(this);'>";
                                siwHtml += "    <div class='tit'>";
                                siwHtml += "        <a href='javascript:void(0);'>";
                                siwHtml += "            <p class='name'>" + resultArr[row].routeNm + "(" + resultArr[row].vehicletp + ")<span>" + (routeStationNm != undefined ? routeStationNm : "") + "</span></p>";
                                siwHtml += "            <p class='num'><span>도착예정</span>" + (arrivalTime > 0 ? "약" + arrivalTime + "분후" : "곧도착") + "<span>현재위치</span>" + resultArr[row].arrprevstationcnt + "구간전</p>";
                                siwHtml += "        </a>";
                                siwHtml += "    </div>";
                                siwHtml += "</li>";
                            }
                        }
                    } else {
                        if ($(".routeTable .routeTableList").prop('tagName').toLowerCase() == "table") {
                            siwHtml += "<tr>";
                            siwHtml += "    <td colspan='4'>도착정보가 없습니다.</td>";
                            siwHtml += "</tr>";
                        } else if ($(".routeTable .routeTableList").prop('tagName').toLowerCase() == "ul") {
                            siwHtml += "<div class='empty'>도착정보가 없습니다.</div>";
                        }
                    }
                } else {
                    if ($(".routeTable .routeTableList").prop('tagName').toLowerCase() == "table") {
                        siwHtml += "<tr>";
                        siwHtml += "    <td colspan='4'>도착정보가 없습니다.</td>";
                        siwHtml += "</tr>";
                    } else if ($(".routeTable .routeTableList").prop('tagName').toLowerCase() == "ul") {
                        siwHtml += "<div class='empty'>도착정보가 없습니다.</div>";
                    }
                }

                if ($(".routeTable .routeTableList").prop('tagName').toLowerCase() == "table") {
                    $(".routeTable .routeTableList tbody").html(siwHtml);
                } else if ($(".routeTable .routeTableList").prop('tagName').toLowerCase() == "ul") {
                    $(".routeTable .routeTableList").html(siwHtml);
                }

                stationTimer2 = setTimeout(function() {
                    stationInfoWindow2(dataStationId);
                }, 10000);
                
                console.log("stationInfoWindow2End");
                $(".preloader").fadeOut(400);
            },
            fail: function(res) {
                if (res.readyState != 0 || res.status != 0) {
                    if (!(res.status == 0 && res.statusText == "abort")) {
                        //alert("관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText);
                        openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText,"");
                    }
                }

                $(".preloader").fadeOut(400);
            },
            error: function(res) {
                if (res.readyState != 0 || res.status != 0) {
                    if (!(res.status == 0 && res.statusText == "abort")) {
                        //alert("관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText);
                        openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText,"");
                    }
                }

                $(".preloader").fadeOut(400);
            }
        });
    }
}

//버스 인포윈도우
function busInfoWindow(state, data) {
    var routeStationNm = globalRouteStationNm[data.routeId];
    var routeStationOrd = parseInt(data.stationOrd) + 1;
    var routeStationNm2 = globalRouteStationNm2[routeStationOrd];
    var routeStationLat = globalRouteStationLat[data.routeId];
    var routeStationLon = globalRouteStationLon[data.routeId];
    var busDirection = (routeStationNm2 == undefined || (routeStationLat == data.localY && routeStationLon == data.localX)) ? data.stationNm + " 정류장 도착" : routeStationNm2 + " 정류장으로 이동중";
    var biwHtml = "";
    
    if (state == "start") {
        biwHtml += "<div class='busInfoWindow' data-item-type='bus' data-item-id='" + data.vehicleno + "'>";
        biwHtml += "    <div class='biwTit'>";
        biwHtml += "        " + data.routeNm;
        biwHtml += "        <span>" + (routeStationNm != undefined ? routeStationNm : "") + "</span>";
        biwHtml += "    </div>";
        biwHtml += "    <div class='biwCon'>";
        biwHtml += "        <div class='busDetail'>";
        biwHtml += "            <div class='busDetailTop'>";
        biwHtml += "                <div class='busDirection'>" + busDirection + "</div>";
        biwHtml += "            </div>";
        biwHtml += "            <div class='busDetailBottom'>";
        biwHtml += "                <div>차량 <span class='busNum'>" + data.vehicleno + "</span></div>";
        //biwHtml += "                <div>속도 <span class='busSpeed'>00</span>km/h</div>";
        //biwHtml += "                <div><span class='busUpdate'>0</span>초전 업데이트</div>";
        biwHtml += "            </div>";
        biwHtml += "            <div class='busDetailBtn'>";

        if (globalFileUrl.indexOf("/mobile/") > -1) {
            biwHtml += "                <div class='allRoute' data-route-id='" + data.routeId + "' data-route-num='" + data.routeNm + "' onclick='setMBISL(this);'><img src='" + globalFilePath + "images/btn-iw-route.png' alt='info-window-route'></div>";
        } else {
            biwHtml += "                <div class='allRoute' data-route-id='" + data.routeId + "' data-route-num='" + data.routeNm + "' onclick='setBISL(this);'><img src='" + globalFilePath + "images/btn-iw-route.png' alt='info-window-route'></div>";
        }

        biwHtml += "                <div class='busDrive' onclick='changeBusDrive(\"click\",\"bus\",this);'><img src='" + globalFilePath + "images/btn-iw-drive.png' alt='info-window-drive'></div>";
        biwHtml += "                <div class='close' onclick='closeInfoWindow(\"bus\",this);'><img src='" + globalFilePath + "images/btn-iw-close.png' alt='info-window-close'></div>";
        biwHtml += "            </div>";
        biwHtml += "        </div>";
        biwHtml += "    </div>";
        biwHtml += "</div>";

        return biwHtml;
    } else if (state == "loop") {
        $(".infoWindowArea#iw-bus-" + data.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailTop .busDirection").html(busDirection);
    }
}

//저상버스 인포윈도우
function lowBusInfoWindow(state, data) {
    var lbiwHtml = "";
    
    if (state == "start") {
        lbiwHtml += "<div class='busInfoWindow' data-item-type='lowbus' data-item-id='" + data.vehicleno + "' data-item-route-id='" + data.routeId + "'>";
        lbiwHtml += "    <div class='biwTit'>";
        lbiwHtml += "        " + data.routeNm;
        lbiwHtml += "        <span class='biwImg'><img src='" + globalFilePath + "images/low-bus-img.png' alt='low-bus-img'></span>";
        lbiwHtml += "    </div>";
        lbiwHtml += "    <div class='biwCon'>";
        lbiwHtml += "        <div class='busDetail'>";
        lbiwHtml += "            <div class='busDetailTop'>";
        lbiwHtml += "                <div class='busDirection'>" + data.vehicleno + "</div>";
        lbiwHtml += "            </div>";
        lbiwHtml += "            <div class='busDetailBottom'>";
        lbiwHtml += "                <div>운수사명 <span class='busNum'>" + data.vehicleCompany + "</span></div>";
        lbiwHtml += "                <div>속도 <span class='busSpeed'>" + data.speed + "</span>km/h</div>";
        //lbiwHtml += "                <div><span class='busUpdate'>0</span>초전 업데이트</div>";
        lbiwHtml += "            </div>";
        lbiwHtml += "            <div class='busDetailBtn'>";
        lbiwHtml += "                <div class='busDrive' onclick='changeBusDrive(\"click\",\"lowbus\",this);'><img src='" + globalFilePath + "images/btn-iw-drive.png' alt='info-window-drive'></div>";
        lbiwHtml += "                <div class='close' onclick='closeInfoWindow(\"lowbus\",this);'><img src='" + globalFilePath + "images/btn-iw-close.png' alt='info-window-close'></div>";
        lbiwHtml += "            </div>";
        lbiwHtml += "        </div>";
        lbiwHtml += "    </div>";
        lbiwHtml += "</div>";

        return lbiwHtml;
    } else if (state == "loop") {
        $(".infoWindowArea#iw-lowbus-" + data.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBottom .busSpeed").html(data.speed);
    }
}

//인포윈도우 닫기
function closeInfoWindow(type, obj) {
    var markerId = $(obj).closest(".infoWindowArea").attr("id").replace("iw-","m-");
    
    $(obj).closest(".infoWindowArea").css({display:"none"});
    $(".markerArea#" + markerId).removeClass("on");
    
    if (type == "station" || type == "gpsstation") {
        $(".markerArea#" + markerId).children("img").attr("src",globalFilePath + "images/map-station.png");
    }
    
    if (type == "lowbus") {
        map.setDraggable(true);
        $(".mContMapArea").removeClass("on");
        $(".markerArea#" + markerId).children(".bmCircle").removeClass("on");
    }
}

//버스 주행여부 설정
function changeBusDrive(state, type, obj) {
    var dataItemId = $(obj).closest(".busInfoWindow").attr("data-item-id");
    
    if (state == "click") {
        //주행 아이콘 클릭시
        if ($(obj).hasClass("on")) {
            $(obj).removeClass("on");
            $(obj).find("img").attr("src", globalFilePath + "images/btn-iw-drive.png");
            
            if (type == "lowbus") {
                map.setDraggable(true);
                $(".mContMapArea").removeClass("on");
                $(".markerArea#m-" + type + "-" + dataItemId).children(".bmCircle").removeClass("on");
            }
        } else {
            $(obj).addClass("on");
            $(obj).find("img").attr("src", globalFilePath + "images/btn-iw-drive-on.png");
            
            if (type == "bus") {
            	map.setCenter(markerdata[type + "-" + dataItemId].getPosition());
            } else if (type == "lowbus") {
            	map.setCenter(lowbusmarkerdata[type + "-" + dataItemId].getPosition());
                map.setDraggable(false);
                
                $(".mContMapArea").removeClass("on");
                $(".markerArea").children(".bmCircle").removeClass("on");
                
                setTimeout(function() {
                    $(".mContMapArea").addClass("on");
                    $(".markerArea#m-" + type + "-" + dataItemId).children(".bmCircle").addClass("on");
                }, 200);
            }
        }
    } else if (state == "add") {
        //버스 아이콘 클릭시
        $(obj).addClass("on");
        $(obj).find("img").attr("src", globalFilePath + "images/btn-iw-drive-on.png");
        
        if (type == "bus") {
        	map.setCenter(markerdata[type + "-" + dataItemId].getPosition());
        } else if (type == "lowbus") {
        	map.setCenter(lowbusmarkerdata[type + "-" + dataItemId].getPosition());
        }
    } else if (state == "remove") {
        //맵 이동시
        $(obj).removeClass("on");
        $(obj).find("img").attr("src", globalFilePath + "images/btn-iw-drive.png");
        
        if (type == "lowbus") {
            map.setDraggable(true);
            $(".mContMapArea").removeClass("on");
            $(".markerArea#m-" + type + "-" + dataItemId).children(".bmCircle").removeClass("on");
        }
    }
}

//지도에서 위치보기
function markerPosition(type, id, iwFlag) {
    if (iwFlag == "Y") {
        if (type == "station" && $(".mGpsBtn").hasClass("on")) {
            type = "gpsstation";
        }
        
        $(".infoWindowArea").css({display:"none"});
        $(".markerArea").removeClass("on");
        $(".markerArea[id^=m-station-]").children("img").attr("src",globalFilePath + "images/map-station.png");
        $(".markerArea[id^=m-gpsstation-]").children("img").attr("src",globalFilePath + "images/map-station.png");
        
        if (type == "station" || type == "gpsstation") {
            stationInfoWindow("click",id,"","","","",(type == "gpsstation" ? "Y" : "N"));
            stationInfoWindow2(id);
        }
        
        if (type == "bus") {
            changeBusDrive("add","bus",$(".infoWindowArea#iw-bus-" + id + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
        }
        
        if (type == "lowbus") {
            changeBusDrive("add","lowbus",$(".infoWindowArea#iw-lowbus-" + id + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
        }
        
        $(".infoWindowArea#iw-" + type + "-" + id).css({display:'block'});
        $(".markerArea#m-" + type + "-" + id).addClass("on");

        if (type == "station" || type == "gpsstation") {
            $(".markerArea#m-" + type + "-" + id).children("img").attr("src",globalFilePath + "images/map-station-on.png");
        }
        
        if (type == "gpsstation"){
            map.setCenter(gpsmarkerdata[type + "-" + id].getPosition());
        } else if (type == "lowbus") {
            map.setCenter(lowbusmarkerdata[type + "-" + id].getPosition());
        } else {
            map.setCenter(markerdata[type + "-" + id].getPosition());
        }

        if (type == "station" || type == "gpsstation") {
            map.setLevel(5);
        } else {
            map.setLevel(3);
        }
    } else {
        var bounds = new kakao.maps.LatLngBounds();
        var startMarker = $(".markerArea.start").attr("id");
        var arrivalMarker = $(".markerArea.arrival").attr("id");
        
        if (startMarker != undefined) {
            startMarker = startMarker.substr(2);
            bounds.extend(markerdata[startMarker].getPosition());
        }
        
        if (arrivalMarker != undefined) {
            arrivalMarker = arrivalMarker.substr(2);
            bounds.extend(markerdata[arrivalMarker].getPosition());
        }
        
        map.setBounds(bounds);
    }
}

//노선검색에서 정류장 노출여부
function setRouteStationVisible() {
	if ($("#infoVisible").is(":checked") && !$(".mGpsBtn").hasClass("on")) {
		$(".markerArea[id^='m-station-']").removeClass("not-visible");
	} else {
		$(".infoWindowArea[id^='iw-station-']").css({display:"none"});
        $(".markerArea[id^='m-station-']").removeClass("on");
        $(".markerArea[id^='m-station-']").addClass("not-visible");
        $(".markerArea[id^='m-station-']").children("img").attr("src",globalFilePath + "images/map-station.png");
	}
}

//노선검색(휠네비)에서 노선선택시 해당 노선의 버스만 노출
function setRouteBusVisible(routeId, busId) {
    busId = (busId != undefined) ? busId : "";
    
	if (routeId != undefined) {
		$(".lowBusInfoWindowArea").css({display:"none"});
        $(".lowBusMarkerArea").removeClass("on");
        $(".lowBusMarkerArea").addClass("not-visible");
        
        if (busId != "") {
            $(".lowBusInfoWindowArea#iw-lowbus-" + busId).css({display:'block'});
            $(".lowBusMarkerArea#m-lowbus-" + busId).addClass("on");
        }
        
        $(".lowBusMarkerArea.m-lowbus-route-" + routeId).removeClass("not-visible");
        $(".markerArea[id^='m-station-']").children("img").attr("src",globalFilePath + "images/map-station.png");
        $(".markerArea[id^='m-gpsstation-']").children("img").attr("src",globalFilePath + "images/map-station.png");
	} else {
		$(".lowBusMarkerArea").removeClass("not-visible");
	}
    
    if (busId != "") {
        map.setDraggable(false);
        $(".mContMapArea").removeClass("on");
        $(".markerArea").children(".bmCircle").removeClass("on");
        
        if ($(".busMarkerArea.on + .infoWindowArea .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive.on").length > 0) {
            setTimeout(function() {
                $(".mContMapArea").addClass("on");
                $(".lowBusMarkerArea#m-lowbus-" + busId).children(".bmCircle").addClass("on");
            }, 200);
        }
    } else {
        if ($(".busMarkerArea.on + .infoWindowArea .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive.on").length == 0) {
            map.setDraggable(true);
            $(".mContMapArea").removeClass("on");
            $(".markerArea").children(".bmCircle").removeClass("on");
        }
    }
    
    console.log("setRouteBusVisibleEnd");
    $(".preloader").fadeOut(400);
}

//내위치 켜기&끄기
function setGpsPosition(obj,type) {
    clearTimeout(gpsTimer);
    
    if ($(obj).hasClass("on")) {
        //내위치 끄기
        $(obj).removeClass("on");
        gpsUseFlag = "N";
        gpsNewArr = [];
        
        if (type == "route") {
            $("#infoVisible").prop("disabled",false);
            setRouteStationVisible();
        } else if (type == "station") {
            $("#myPosition").prop("checked",false);
            $(".markerArea[id^='m-station-']").removeClass("not-visible");
            
            $("#mContList .mListInfoArea .mInfoMain>ul>li").each(function() {
                if ($(this).hasClass("gpsStationItem")) {
                    $(this).remove();
                } else {
                    $(this).css("display","");
                    $(this).removeClass("on");
                    $(this).find(".routeTable").html("");
                }
            });
            
            $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text($("#mContList .mListInfoArea .mInfoMain>ul>li").length);
        }
    } else {
        //내위치 켜기
        $(obj).addClass("on");
        gpsUseFlag = "Y";
        
        if (type == "route") {
            $("#infoVisible").prop("disabled",true);
            setRouteStationVisible();
        } else if (type == "station") {
            $("#myPosition").prop("checked",true);
        }
    }
    
    setGpsPosition2(type,"start");
}

//내위치 반복호출
function setGpsPosition2(type,state) {
    if (gpsUseFlag == "Y") {
        //HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
        if (navigator.geolocation) {
            //GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                var myLatitude = position.coords.latitude; //33.4990652; //33.361310006006974;
                var myLongitude = position.coords.longitude; //126.5307408; //126.52938551082988;

                if (type == "route" || type == "station") {
                    if (state == "start") {
                        console.log("setGpsPosition2Start");
                        $(".preloader").addClass("opacity");
                        $(".preloader").css("display","block");
                    }

                    if (type == "station" && state == "start") {
                        $(".infoWindowArea[id^='iw-station-']").css({display:"none"});
                        $(".markerArea[id^='m-station-']").removeClass("on");
                        $(".markerArea[id^='m-station-']").addClass("not-visible");
                        $(".markerArea[id^='m-station-']").children("img").attr("src",globalFilePath + "images/map-station.png");
                        $(".markerArea[id^='m-gpsstation-']").children("img").attr("src",globalFilePath + "images/map-station.png");

                        $("#mContList .mListInfoArea .mInfoMain>ul>li").removeClass("on");
                        $("#mContList .mListInfoArea .mInfoMain>ul>li").find(".routeTable").html("");
                    }

                    //내위치기준 정류장 조회
                    $.ajax({
                        dataType: "json",
                        type: "GET",
                        url: "https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList?serviceKey=" + globalServiceKey2 + "&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo + "&_type=json&gpsLati=" + myLatitude + "&gpsLong=" + myLongitude,
                        success: function(result) {
                            //console.log(result.response.body.items.item);
                            var gmjson = result.response.body.items.item;

                            //내위치 설정
                            var mypos = new kakao.maps.LatLng(myLatitude, myLongitude);

                            if (!gpsmarkerdata["gpsposition"]) {
                                var startJson = {};

                                startJson.lat = myLatitude;
                                startJson.lng = myLongitude;
                                gpsStartArr["gpsposition"] = startJson;

                                //마커 생성시
                                var mymar = new kakao.maps.Marker({
                                    map: map,
                                    position: mypos,
                                    title: "gpsposition",
                                    image: new kakao.maps.MarkerImage(globalFilePath + "images/my-position.png", new kakao.maps.Size(36,36), {offset: new kakao.maps.Point(18,18)})
                                });

                                mymar.setMap(map);
                                gpsmarkers.push(mymar);

                                gpsmarkerdata["gpsposition"] = mymar;

                                map.setCenter(new kakao.maps.LatLng(myLatitude,myLongitude));
                                map.setLevel(5);
                            } else {
                                var bounds = map.getBounds();
                                var minlat = bounds.ha;
                                var maxlat = bounds.oa;
                                var minlng = bounds.qa;
                                var maxlng = bounds.pa;

                                var endJson = {};

                                endJson.lat = myLatitude;
                                endJson.lng = myLongitude;
                                gpsEndArr["gpsposition"] = endJson;

                                //반복 호출시
                                gpsmarkerdata["gpsposition"].setPosition(mypos);

                                if (minlat <= myLongitude && maxlat >= myLongitude && minlng <= myLatitude && maxlng >= myLatitude) {

                                } else {
                                    gpsStartArr["gpsposition"].lat = gpsEndArr["gpsposition"].lat;
                                    gpsStartArr["gpsposition"].lng = gpsEndArr["gpsposition"].lng;
                                }
                            }

                            $("#mContMap img[title='gpsposition']").parent().addClass("markerArea gpsposMarkerArea");

                            gpsMarker(type,state,myLatitude,myLongitude,gmjson);

                            gpsTimer = setTimeout(function() {
                                setGpsPosition2(type,"loop");
                            }, 6000);

                            if (state == "start") {
                                console.log("setGpsPosition2End");
                                $(".preloader").fadeOut(400);
                            }
                        },
                        fail: function(res) {
                            if (res.readyState != 0 || res.status != 0) {
                                if (!(res.status == 0 && res.statusText == "abort")) {
                                    //alert("관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText);
                                    openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (fail): " + res.status + " - " + res.statusText,"");
                                }
                            }

                            $(".preloader").fadeOut(400);
                        },
                        error: function(res) {
                            if (res.readyState != 0 || res.status != 0) {
                                if (!(res.status == 0 && res.statusText == "abort")) {
                                    //alert("관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText);
                                    openLayer("alert","관리자에게 다음사항을 문의하세요.<br>DataList (error): " + res.status + " - " + res.statusText,"");
                                }
                            }

                            $(".preloader").fadeOut(400);
                        }
                    });
                } else {
                    //내위치 설정
                    var mypos = new kakao.maps.LatLng(myLatitude, myLongitude);

                    if (!gpsmarkerdata["gpsposition"]) {
                        var startJson = {};

                        startJson.lat = myLatitude;
                        startJson.lng = myLongitude;
                        gpsStartArr["gpsposition"] = startJson;

                        //마커 생성시
                        var mymar = new kakao.maps.Marker({
                            map: map,
                            position: mypos,
                            title: "gpsposition",
                            image: new kakao.maps.MarkerImage(globalFilePath + "images/my-position.png", new kakao.maps.Size(36,36), {offset: new kakao.maps.Point(18,18)})
                        });

                        mymar.setMap(map);
                        gpsmarkers.push(mymar);

                        gpsmarkerdata["gpsposition"] = mymar;

                        map.setCenter(new kakao.maps.LatLng(myLatitude,myLongitude));
                        map.setLevel(5);
                    } else {
                        var bounds = map.getBounds();
                        var minlat = bounds.ha;
                        var maxlat = bounds.oa;
                        var minlng = bounds.qa;
                        var maxlng = bounds.pa;

                        var endJson = {};

                        endJson.lat = myLatitude;
                        endJson.lng = myLongitude;
                        gpsEndArr["gpsposition"] = endJson;

                        //반복 호출시
                        gpsmarkerdata["gpsposition"].setPosition(mypos);

                        if (minlat <= myLongitude && maxlat >= myLongitude && minlng <= myLatitude && maxlng >= myLatitude) {

                        } else {
                            gpsStartArr["gpsposition"].lat = gpsEndArr["gpsposition"].lat;
                            gpsStartArr["gpsposition"].lng = gpsEndArr["gpsposition"].lng;
                        }
                    }

                    $("#mContMap img[title='gpsposition']").parent().addClass("markerArea gpsposMarkerArea");

                    gpsTimer = setTimeout(function() {
                        setGpsPosition2(type,"loop");
                    }, 6000);
                }
            }, function(error) {
                if (error.code == 1) {
                    setGpsPosition3(type,"내위치에 대한 권한이 없습니다.<br>권한을 허용해주세요.");
                } else if (error.code == 2) {
                    setGpsPosition3(type,"에러가 발생했습니다.<br>다시 시도해주세요.");
                } else if (error.code == 3) {
                    setGpsPosition3(type,"시간이 초과되었습니다.<br>다시 시도해주세요.");
                }
            });
        } else {
            setGpsPosition3(type,"내위치를 알 수 없습니다.");
        }
    } else {
        if (type == "station") {
            $("#mContList .mListInfoArea .mInfoMain>ul>li").each(function() {
                if ($(this).hasClass("gpsStationItem")) {
                    $(this).remove();
                } else {
                    $(this).css("display","block");
                    $(this).removeClass("on");
                    $(this).find(".routeTable").html("");
                }
            });
            
            var listCnt = $("#mContList .mListInfoArea .mInfoMain>ul>li").length;
            
            if (listCnt > 0) {
                $("#mContList .mListInfoArea .mInfoMain .empty").css("display","none");
            } else {
                $("#mContList .mListInfoArea .mInfoMain .empty").remove();
                
                if (gpsSearchKeyword != "") {
                    $("#mContList .mListInfoArea .mInfoMain").append("<div class='empty'>정류장정보가 없습니다.</div>");
                } else {
                    $("#mContList .mListInfoArea .mInfoMain").append("<div class='empty'>정류장을 검색해주세요.</div>");
                }
            }
            
            $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
        }
        
        removeGpsMarker();
    }
}

//내위치 호출실패
function setGpsPosition3(type,msg) {
    openLayer("alert",msg,"");
    
    $(".mGpsBtn").removeClass("on");
    gpsUseFlag = "N";
    gpsNewArr = [];

    if (type == "route") {
        $("#infoVisible").prop("disabled",false);
        setRouteStationVisible();
    } else if (type == "station") {
        $("#myPosition").prop("checked",false);
        $(".markerArea[id^='m-station-']").removeClass("not-visible");

        $("#mContList .mListInfoArea .mInfoMain>ul>li").each(function() {
            if ($(this).hasClass("gpsStationItem")) {
                $(this).remove();
            } else {
                $(this).css("display","block");
                $(this).removeClass("on");
                $(this).find(".routeTable").html("");
            }
        });

        var listCnt = $("#mContList .mListInfoArea .mInfoMain>ul>li").length;

        if (listCnt > 0) {
            $("#mContList .mListInfoArea .mInfoMain .empty").css("display","none");
        } else {
            $("#mContList .mListInfoArea .mInfoMain .empty").remove();

            if (gpsSearchKeyword != "") {
                $("#mContList .mListInfoArea .mInfoMain").append("<div class='empty'>정류장정보가 없습니다.</div>");
            } else {
                $("#mContList .mListInfoArea .mInfoMain").append("<div class='empty'>정류장을 검색해주세요.</div>");
            }
        }

        $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
    }
}

//지도위에 표시되고 있는 마커를 모두 제거
function removeMarker() {
    clearTimeout(busTimer);
    
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    
    markers = [];
    
    for (var j in busmarkers) {
        busmarkers[j].setMap(null);
    }
    
    busmarkers = [];
    
    markerdata = {};
    
    $(".infoWindowArea:not(.lowBusInfoWindowArea,.gpsInfoWindowArea)").each(function() {
        $(this).remove();
    });
    
    $(".markerArea:not(.lowBusMarkerArea,.gpsMarkerArea,.gpsposMarkerArea)").each(function() {
        $(this).remove();
    });
    
    $(".lowBusInfoWindowArea,.gpsInfoWindowArea").each(function() {
        $(this).css({display:"none"});
    });
    
    $(".lowBusMarkerArea,.gpsMarkerArea,.gpsposMarkerArea").each(function() {
        $(this).removeClass("on");
    });
}

//지도위에 표시되고 있는 저상버스마커를 모두 제거
function removeLowBusMarker() {
	clearTimeout(lowBusTimer);
	clearTimeout(lowBusTimer2);
	
    for (var i in lowbusmarkers) {
    	lowbusmarkers[i].setMap(null);
    }
    
    lowbusmarkers = [];
    
    lowbusmarkerdata = {};
    
    $(".lowBusInfoWindowArea").each(function() {
        $(this).remove();
    });
    
    $(".lowBusMarkerArea").each(function() {
        $(this).remove();
    });
}

//지도위에 표시되고 있는 내위치기준 정류장마커를 모두 제거
function removeGpsMarker() {
    clearTimeout(gpsTimer);
    
    for (var i in gpsmarkers) {
    	gpsmarkers[i].setMap(null);
    }
    
    gpsmarkers = [];
    
    gpsmarkerdata = {};
    
    $(".gpsInfoWindowArea").each(function() {
        $(this).remove();
    });
    
    $(".gpsMarkerArea,.gpsposMarkerArea").each(function() {
        $(this).remove();
    });
}

//지도위에 표시되고 있는 라인을 모두 제거
function removePolyline() {    
    for (var i = 0; i < polylines.length; i++) {
    	polylines[i].setMap(null);
    }
    
    polylines = [];
}

