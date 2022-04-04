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

//지도 위도/경도 설정하기
var mapLatitude = 0;
var mapLongitude = 0;

if (globalFileUrl.indexOf("/jeju/") > -1) {
    mapLatitude = 33.4990652;
    mapLongitude = 126.5307408;
} else if (globalFileUrl.indexOf("/suwon/") > -1) {
    mapLatitude = 37.2632976;
    mapLongitude = 127.0284626;
}

var markerdata = {};
var markers = [];
var polylines = [];

$(document).ready(function(){
    if ($(".contMap").length > 0) {
        window.map = new kakao.maps.Map($(".contMap")[0],{
            center: new kakao.maps.LatLng(mapLatitude,mapLongitude),
            level: 5
        });
        
        map.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
        map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    }
});

//노선 마커
function routeMarker(iwFlag, busFlag) {
    var smjson = {
        'values': [
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '02960',
                'stationName': '수원남부버스공영차고지',
                'stationOrder': '1',
                'stationLatitude': '37.2437383',
                'stationLongitude': '127.0358353'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04078',
                'stationName': '영통아이파크캐슬2단지.래미안영통마크원1단지',
                'stationOrder': '2',
                'stationLatitude': '37.244651',
                'stationLongitude': '127.0390243'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04206',
                'stationName': '영통아이파크캐슬1단지.래미안영통마크원2단지',
                'stationOrder': '3',
                'stationLatitude': '37.245036',
                'stationLongitude': '127.0442383'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04063',
                'stationName': '방죽공원.영통힐스테이트.쌍용아파트',
                'stationOrder': '4',
                'stationLatitude': '37.2454097',
                'stationLongitude': '127.0514984'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04326',
                'stationName': '망포역3번출구.망포그대가프리미어.골든스퀘어',
                'stationOrder': '5',
                'stationLatitude': '37.2454773',
                'stationLongitude': '127.0528103'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '03155',
                'stationName': '진흥.천천푸르지오아파트',
                'stationOrder': '6',
                'stationLatitude': '37.2901362',
                'stationLongitude': '126.9819893'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04217',
                'stationName': '센트럴하이츠아파트',
                'stationOrder': '7',
                'stationLatitude': '37.241603',
                'stationLongitude': '127.0579193'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04070',
                'stationName': '청와.쌍용.그대가센트럴파크아파트',
                'stationOrder': '8',
                'stationLatitude': '37.2424803',
                'stationLongitude': '127.0532423'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04325',
                'stationName': '망포역4번출구.영통2동행정복지센터',
                'stationOrder': '9',
                'stationLatitude': '37.2460133',
                'stationLongitude': '127.0532433'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04064',
                'stationName': '망포그대가프리미어.쌍용아파트',
                'stationOrder': '10',
                'stationLatitude': '37.2458973',
                'stationLongitude': '127.0512163'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04032',
                'stationName': '래미안영통마크원2단지.영통아이파크캐슬1단지',
                'stationOrder': '11',
                'stationLatitude': '37.245473',
                'stationLongitude': '127.0437483'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '01070',
                'stationName': '이목동차고지.이목동입구',
                'stationOrder': '12',
                'stationLatitude': '37.3216612',
                'stationLongitude': '126.9868473'
            }
        ]
    }
    
    stationMarker(iwFlag,"N","Y");
    
    if (busFlag == "Y") {
        busMarker();
    }
    
    var bounds = new kakao.maps.LatLngBounds();
    var linePath = [];
    
    smjson.values.forEach(smdata=>{
        if (smdata.stationLatitude != null && smdata.stationLongitude != null) {
            var itemPos = new kakao.maps.LatLng(smdata.stationLatitude,smdata.stationLongitude);
            bounds.extend(itemPos);
            linePath.push(itemPos);
        }
    });

    var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: '#e43726', // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    });

    polyline.setMap(map);
    polylines.push(polyline);
    map.setBounds(bounds);
}

//정류장 마커
function stationMarker(iwFlag, courseFlag, routeFlag) {
    var smjson = {
        'values': [
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '02960',
                'stationName': '수원남부버스공영차고지',
                'stationOrder': '1',
                'stationLatitude': '37.2437383',
                'stationLongitude': '127.0358353'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04078',
                'stationName': '영통아이파크캐슬2단지.래미안영통마크원1단지',
                'stationOrder': '2',
                'stationLatitude': '37.244651',
                'stationLongitude': '127.0390243'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04206',
                'stationName': '영통아이파크캐슬1단지.래미안영통마크원2단지',
                'stationOrder': '3',
                'stationLatitude': '37.245036',
                'stationLongitude': '127.0442383'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04063',
                'stationName': '방죽공원.영통힐스테이트.쌍용아파트',
                'stationOrder': '4',
                'stationLatitude': '37.2454097',
                'stationLongitude': '127.0514984'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04326',
                'stationName': '망포역3번출구.망포그대가프리미어.골든스퀘어',
                'stationOrder': '5',
                'stationLatitude': '37.2454773',
                'stationLongitude': '127.0528103'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '03155',
                'stationName': '진흥.천천푸르지오아파트',
                'stationOrder': '6',
                'stationLatitude': '37.2901362',
                'stationLongitude': '126.9819893'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04217',
                'stationName': '센트럴하이츠아파트',
                'stationOrder': '7',
                'stationLatitude': '37.241603',
                'stationLongitude': '127.0579193'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04070',
                'stationName': '청와.쌍용.그대가센트럴파크아파트',
                'stationOrder': '8',
                'stationLatitude': '37.2424803',
                'stationLongitude': '127.0532423'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04325',
                'stationName': '망포역4번출구.영통2동행정복지센터',
                'stationOrder': '9',
                'stationLatitude': '37.2460133',
                'stationLongitude': '127.0532433'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04064',
                'stationName': '망포그대가프리미어.쌍용아파트',
                'stationOrder': '10',
                'stationLatitude': '37.2458973',
                'stationLongitude': '127.0512163'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '04032',
                'stationName': '래미안영통마크원2단지.영통아이파크캐슬1단지',
                'stationOrder': '11',
                'stationLatitude': '37.245473',
                'stationLongitude': '127.0437483'
            },
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'stationId': '01070',
                'stationName': '이목동차고지.이목동입구',
                'stationOrder': '12',
                'stationLatitude': '37.3216612',
                'stationLongitude': '126.9868473'
            }
        ]
    }
    
    smjson.values.forEach(smdata=>{
        if (smdata.stationLatitude != null && smdata.stationLongitude != null) {
            var pos = new kakao.maps.LatLng(smdata.stationLatitude, smdata.stationLongitude);
            var mar = new kakao.maps.Marker({
                map: map,
                position: pos,
                title: "station-" + smdata.stationId,
                image: new kakao.maps.MarkerImage(globalFilePath + "images/map-station.png", new kakao.maps.Size(24,24), {offset: new kakao.maps.Point(12,12)})
            });

            mar.setMap(map);
            markers.push(mar);
            var siwHtml = stationInfoWindow(smdata,courseFlag);

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
                    $(".infoWindowArea").prev(".markerArea").removeClass("on");
                    $(".stationInfoWindow").closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");

                    if (dataItemTitle.length > 1) {
                        var dataItemType = dataItemTitle[0];
                        var dataItemId = dataItemTitle[1];

                        $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                        $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).prev(".markerArea").addClass("on");
                        $(".stationInfoWindow").closest(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station-on.png");
                    }

                    map.setCenter(mar.getPosition());
                    map.setLevel(5);
                }
            });

            markerdata["station-" + smdata.stationId] = mar;
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

//버스 마커
function busMarker() {
    var bmjson = {
        'values': [
            {
                'routeId': '2-1',
                'routeFirstStop': '수원남부버스공영차고지',
                'routeLastStop': '진흥.천천푸르지오아파트',
                'busId': '0000',
                'busOrder': '1',
                'busLatitude': '37.2458253',
                'busLongitude': '127.0524283'
            }
        ]
    }
    
    bmjson.values.forEach(bmdata=>{
        var pos = new kakao.maps.LatLng(bmdata.busLatitude, bmdata.busLongitude);
        var mar = new kakao.maps.Marker({
            map: map,
            position: pos,
            title: "bus-" + bmdata.busId,
            image: new kakao.maps.MarkerImage(globalFilePath + "images/front-bus.png", new kakao.maps.Size(24,24), {offset: new kakao.maps.Point(12,12)})
        });
        
        mar.setMap(map);
        markers.push(mar);
        var biwHtml = busInfoWindow(bmdata);
        
        mar.win = new kakao.maps.InfoWindow({
            position: pos,
            content: biwHtml
            //disableAutoPan: true
        });
        
        mar.win.open(map, mar);
        
        kakao.maps.event.addListener(mar, "click", function() {
            var dataItemTitle = mar.getTitle().split('-');
            
            $(".infoWindowArea").css({display:"none"});
            $(".infoWindowArea").prev(".markerArea").removeClass("on");
            $(".stationInfoWindow").closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");
            
            if (dataItemTitle.length > 1) {
                var dataItemType = dataItemTitle[0];
                var dataItemId = dataItemTitle[1];

                $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).prev(".markerArea").addClass("on");
            }

            map.setCenter(mar.getPosition());
            map.setLevel(3);
        });
        
        markerdata["bus-" + bmdata.busId] = mar;
    });
    
    $(".busInfoWindow").each(function() {
        var dataItemType = $(this).attr("data-item-type");
        var dataItemId = $(this).attr("data-item-id");
        
        $(this).parent().prev().css({display:"none"});
        $(this).parent().parent().css({display:"none"});
        $(this).parent().parent().addClass("infoWindowArea");
        $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
        $(this).parent().parent().prev().addClass("markerArea busMarkerArea");
        $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
    });
}

//정류장 인포윈도우
function stationInfoWindow(data, courseFlag) {
    var siwHtml = "";
    
    siwHtml += "<div class='stationInfoWindow' data-item-type='station' data-item-id='" + data.stationId + "'>";
    siwHtml += "    <div class='siwTop'>";
    siwHtml += "        <div class='siwTit'>";
    siwHtml += "            " + data.stationName + "";
    siwHtml += "            <span>" + data.stationId + "</span>";
    siwHtml += "        </div>";
    siwHtml += "        <div class='close' onclick='closeInfoWindow(\"station\",this);'><img src='" + globalFilePath + "images/menu_top_close.png' alt='info-window-close'></div>";
    siwHtml += "    </div>";
    siwHtml += "    <div class='siwCon'>";
    siwHtml += "        <div class='routeTable" + (courseFlag == "Y" ? " courseTable" : "") + "'>";
    siwHtml += "            <table class='table'>";
    siwHtml += "                <colgroup>";
    siwHtml += "                    <col width='60px'>";
    siwHtml += "                    <col width='*'>";
    siwHtml += "                    <col width='60px'>";
    siwHtml += "                    <col width='60px'>";
    siwHtml += "                </colgroup>";
    siwHtml += "                <thead>";
    siwHtml += "                    <tr>";
    siwHtml += "                        <th class='th00'>노선번호</th>";
    siwHtml += "                        <th class='th01'>현재정류장</th>";
    siwHtml += "                        <th class='th02'>도착예정</th>";
    siwHtml += "                        <th class='th03'>현재위치</th>";
    siwHtml += "                    </tr>";
    siwHtml += "                </thead>";
    siwHtml += "                <tbody>";
    siwHtml += "                    <tr>";
    siwHtml += "                        <td class='th00'><span>2-1</span></td>";
    siwHtml += "                        <td class='th01'>영통아이파크캐슬2단지.래미안영통마크원1단지</td>";
    siwHtml += "                        <td class='th02'>약1분후</td>";
    siwHtml += "                        <td class='th03'>1구간전</td>";
    siwHtml += "                    </tr>";
    siwHtml += "                    <tr>";
    siwHtml += "                        <td class='th00'><span>2-2</span></td>";
    siwHtml += "                        <td class='th01'>영통아이파크캐슬1단지.래미안영통마크원2단지</td>";
    siwHtml += "                        <td class='th02'>약2분후</td>";
    siwHtml += "                        <td class='th03'>2구간전</td>";
    siwHtml += "                    </tr>";
    siwHtml += "                    <tr>";
    siwHtml += "                        <td class='th00'><span>3</span></td>";
    siwHtml += "                        <td class='th01'>방죽공원.영통힐스테이트.쌍용아파트</td>";
    siwHtml += "                        <td class='th02'>약3분후</td>";
    siwHtml += "                        <td class='th03'>3구간전</td>";
    siwHtml += "                    </tr>";
    siwHtml += "                    <tr>";
    siwHtml += "                        <td class='th00'><span>4-1</span></td>";
    siwHtml += "                        <td class='th01'>망포역3번출구.망포그대가프리미어.골든스퀘어</td>";
    siwHtml += "                        <td class='th02'>약4분후</td>";
    siwHtml += "                        <td class='th03'>4구간전</td>";
    siwHtml += "                    </tr>";
    siwHtml += "                    <tr>";
    siwHtml += "                        <td class='th00'><span>5</span></td>";
    siwHtml += "                        <td class='th01'>북수원시장입구</td>";
    siwHtml += "                        <td class='th02'>약5분후</td>";
    siwHtml += "                        <td class='th03'>5구간전</td>";
    siwHtml += "                    </tr>";
    siwHtml += "                </tbody>";
    siwHtml += "            </table>";
    siwHtml += "        </div>";
    
    if (courseFlag == "Y") {
        siwHtml += "        <div class='courseBtnArea'>";
        //siwHtml += "            <div class='courseBtn' data-station-id='" + data.stationId + "' data-station-name='" + data.stationName + "' data-station-latitude='" + data.stationLatitude + "' data-station-longitude='" + data.stationLongitude + "' onclick='setCourseInput(\"mStart\",this);'>출발</div>";
        siwHtml += "            <div class='courseBtn' data-station-id='" + data.stationId + "' data-station-name='" + data.stationName + "' data-station-latitude='" + data.stationLatitude + "' data-station-longitude='" + data.stationLongitude + "' onclick='setCourseInput(\"mArrival\",this);'>도착</div>";
        siwHtml += "        </div>";
    }
    
    siwHtml += "    </div>";
    siwHtml += "</div>";
    
    return siwHtml;
}

//버스 인포윈도우
function busInfoWindow(data) {
    var biwHtml = "";
    
    biwHtml += "<div class='busInfoWindow' data-item-type='bus' data-item-id='" + data.busId + "'>";
    biwHtml += "    <div class='biwTit'>";
    biwHtml += "        " + data.routeId;
    biwHtml += "        <span>" + data.routeLastStop + "</span>";
    biwHtml += "    </div>";
    biwHtml += "    <div class='biwCon'>";
    biwHtml += "        <div class='busDetail'>";
    biwHtml += "            <div class='busDetailTop'>";
    biwHtml += "                <div><span class='busDirection'>화서역.화서2동주민센터</span> 정류장으로 이동중</div>";
    biwHtml += "            </div>";
    biwHtml += "            <div class='busDetailBottom'>";
    biwHtml += "                <div>차량 <span class='busNum'>" + data.busId + "</span></div>";
    biwHtml += "                <div>속도 <span class='busSpeed'>00</span>km/h</div>";
    biwHtml += "                <div><span class='busUpdate'>0</span>초전 업데이트</div>";
    biwHtml += "            </div>";
    biwHtml += "            <div class='busDetailBtn'>";
    
    if (globalFileUrl.indexOf("/mobile/") > -1) {
        biwHtml += "                <div class='allRoute' data-route-id='" + data.routeId + "' data-route-num='" + data.routeId + "' onclick='setMBISL(this);'><img src='" + globalFilePath + "images/btn-iw-route.png' alt='info-window-route'></div>";
    } else {
        biwHtml += "                <div class='allRoute' data-route-id='" + data.routeId + "' data-route-num='" + data.routeId + "' onclick='setBISL(this);'><img src='" + globalFilePath + "images/btn-iw-route.png' alt='info-window-route'></div>";
    }
    
    biwHtml += "                <div class='busDrive' onclick='changeBusDrive(this);'><img src='" + globalFilePath + "images/btn-iw-drive.png' alt='info-window-drive'></div>";
    biwHtml += "                <div class='close' onclick='closeInfoWindow(\"bus\",this);'><img src='" + globalFilePath + "images/btn-iw-close.png' alt='info-window-close'></div>";
    biwHtml += "            </div>";
    biwHtml += "        </div>";
    biwHtml += "    </div>";
    biwHtml += "</div>";
    
    return biwHtml;
}

//인포윈도우 닫기
function closeInfoWindow(type, obj) {
    $(obj).closest(".infoWindowArea").css({display:"none"});
    $(obj).closest(".infoWindowArea").prev(".markerArea").removeClass("on");
    
    if (type == "station") {
        $(obj).closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");
    }
}

//버스 주행여부 설정
function changeBusDrive(obj) {
    if ($(obj).hasClass("on")) {
            $(obj).removeClass("on");
            $(obj).find("img").attr("src", globalFilePath + "images/btn-iw-drive.png");
        } else {
            $(obj).addClass("on");
            $(obj).find("img").attr("src", globalFilePath + "images/btn-iw-drive-on.png");
        }
}

//지도에서 위치보기
function markerPosition(type, id, iwFlag) {
    if (iwFlag == "Y") {
        $(".infoWindowArea").css({display:"none"});
        $(".infoWindowArea").prev(".markerArea").removeClass("on");
        $(".stationInfoWindow").closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");

        $(".infoWindowArea#iw-" + type + "-" + id).css({display:'block'});
        $(".infoWindowArea#iw-" + type + "-" + id).prev(".markerArea").addClass("on");

        if (type == "station") {
            $(".stationInfoWindow").closest(".infoWindowArea#iw-" + type + "-" + id).prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station-on.png");
        }
        
        map.setCenter(markerdata[type + "-" + id].getPosition());

        if (type == "station") {
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

//지도위에 표시되고 있는 마커를 모두 제거
function removeMarker() {    
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    
    markers = [];
    
    $(".infoWindowArea").each(function() {
        $(this).remove();
    });
    
    $(".markerArea").each(function() {
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

