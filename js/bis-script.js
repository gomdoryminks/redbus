$(document).ready(function(){
    var userAgent = navigator.userAgent.toLowerCase();
    
    //ios(아이폰, 아이패드, 아이팟) 전용 css 적용
    if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 || userAgent.indexOf("ipod") > -1) {
        var cssIosLink = document.createElement("link");
        
        cssIosLink.href = globalFilePath + "css/style-ios.css";
        cssIosLink.async = false;
        cssIosLink.rel = "stylesheet";
        cssIosLink.type = "text/css";
        
        document.head.appendChild(cssIosLink);
    }
    

    /*$(".open").hide();
    $(document).on('click','.tbl_list tbody tr td',function(){
        var open = $(".open");
        $(this).closest("tr").after(open);
        $(".open").show();
    });
    $(".popup").hide();
    $(document).on('click','.btn_popup', function(){
        $(".popup").show();
        $(".popup").after("<div class='popup_bg'><div>");
        $("body").css("overflow","hidden");
        return false;
    });
    $(document).on('click','.pop_close',function(){
        $(".popup_bg").remove();
        $(".popup").hide();
        $("body").css("overflow","auto");
        return false;
    });*/
    $(document).on('click','.tab ul li a', function(){
        $(".tab_cont > div").hide();
        $(".tab ul li a").removeClass("on");
        $(this).addClass("on");
        var tab_id = $(this).attr("href");
        $(tab_id).show();
        return false;
    });
    $(document).on("click","nav .dep01 > li > a", function(){
        $("nav .dep01 > li > .dep02").slideUp();
        $("+.dep02", this).stop().slideDown();
    });
    
    
    //로딩시 첫번째 탭 클릭
    if ($("#contList .listBtnArea .listBtnTab .listBtn").length > 0) {
        $("#contList .listBtnArea .listBtnTab .listBtn:first-child").trigger("click");
    }
    
    //관리자 화살표 버튼 클릭시 보이기/숨기기
    $("#contList .listBtnArea #arrowBtn").click(function() {
        if ($("#contList").hasClass("on")) {
            $("#contList").removeClass("on");
            $(this).find("i").attr("class", "fas fa-chevron-up");
        } else {
            $("#contList").addClass("on");
            $(this).find("i").attr("class", "fas fa-chevron-down");
        }
        
        return false;
    });
    
    //모바일 화살표 버튼 클릭시 보이기/숨기기
    $("#mContList .mListBtnArea .mListBtn").click(function() {
        if ($("#mContList").hasClass("on")) {
            $("#mContList").removeClass("on");
            $(this).find("i").attr("class", "fas fa-chevron-up");
        } else {
            $("#mContList").addClass("on");
            $(this).find("i").attr("class", "fas fa-chevron-down");
        }
        
        return false;
    });
    
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
    
    //모바일 경로검색에서 출발지/도착지 입력시 실행
    $(".mContListCourse .mListInfoArea .mInfoTop .mInfoSearch input[type='text']").keyup(function() {
        var formObj = $(this).closest("form");
        
        $(formObj).find("input[name='flag']").val("N");
        $(formObj).find("input[name='latitude']").val("");
        $(formObj).find("input[name='longitude']").val("");
        $(formObj).find("input[name='keyword']").removeClass("selected");
    });
    
    //모바일 도착알림에서 출발 버튼 클릭
    if ($("#mContList .mListInfoArea .mInfoTop .mInfoPointArea .mInfoPoint").length > 0) {
        $("#mContList .mListInfoArea .mInfoTop .mInfoPointArea .mInfoPoint:first-child").trigger("click");
    }
    
    //정류장 도착정보에 필요한 노선정보 조회
    if ($(".contMap").length > 0) {
        getRouteStationNm();
    }
    
    //노선검색에서 정류장 노출여부
    $("#infoVisible").change(function() {
    	setRouteStationVisible();
    });
    
    //정류장검색에서 현위치기준 검색 체크여부
    $("#myPosition").click(function() {
        $(".mGpsBtn").trigger("click");
    });
});

//정류장 도착정보에 필요한 노선정보 조회
function getRouteStationNm() {
    $(".preloader").addClass("opacity");
    $(".preloader").css("display","block");
    
    //모든 노선정보 가져오기
    $.ajax({
        dataType: "xml",
        type: "GET",
        url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeNo=&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
        success: function(result) {
            //console.log(result);
            var resultXml = $(result).find("response").find("body").find("items").find("item");

            $(resultXml).each(function() {
                var routeId = $(this).find("routeid").text().replace(globalCityName, "");
                
                globalRouteStationNm[routeId] = $(this).find("startnodenm").text() + "<i class='fas fa-arrows-alt-h'></i>" + $(this).find("endnodenm").text();
            });
            
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

//관리자 탭 클릭시 실행
function setListBtnTab(obj) {
    var dataType = $(obj).attr("data-type");
    var listHtml = "";
    var resultJson = {};
    
    if (dataType == "route") {
    	$(".preloader").removeClass("opacity");
    	$(".preloader").css("display","block");
        
        if (globalFileUrl.indexOf("/JWN/") > -1) {
            removeMarker();
	        removeLowBusMarker();
	        lowBusMarker("start");
        } else {
            //모든 노선정보 가져오기
            $.ajax({
                dataType: "xml",
                type: "GET",
                url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeNo=&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                success: function(result) {
                    //console.log(result);
                    var resultXml = $(result).find("response").find("body").find("items").find("item");

                    var listCnt = (resultXml.length > 0) ? resultXml.length : 0;

                    listHtml += "<div id='routeInfo' class='listInfo'>";
                    listHtml += "    <div class='infoTop cf'>";
                    listHtml += "        <div class='infoSearch'>";
                    listHtml += "            <form id='' name='' method='' class='cf'>";
                    listHtml += "                <input type='hidden' name='type' value='route'>";
                    listHtml += "                <input type='text' name='keyword' placeholder='노선번호를 입력해주세요.'>";
                    listHtml += "                <input type='button' value='검색' onclick='setInfoSearch(this);'>";
                    listHtml += "            </form>";
                    listHtml += "        </div>";
                    listHtml += "        <div class='infoTitle'>노선정보 (<span class='num'>" + listCnt + "</span>)</div>";
                    listHtml += "    </div>";
                    listHtml += "    <div class='infoMain'>";
                    listHtml += "        <div class='infoMainLeft'>";

                    if (listCnt > 0) {
                        listCnt = 0;

                        $(resultXml).each(function() {
                            var routeId = $(this).find("routeid").text().replace(globalCityName, "");

                            var resultXmlJson = {routeId:routeId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),startStationNm:$(this).find("startnodenm").text(),endStationNm:$(this).find("endnodenm").text()};

                            resultJson[listCnt] = resultXmlJson;

                            listCnt++;
                        });

                        if (listCnt > 0) {
                            listHtml += "            <ul class='routeList cf'>";

                            for (var row in resultJson) {
                                listHtml += "                <li>";
                                listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='" + resultJson[row].routeId + "' data-route-num='" + resultJson[row].routeNm + "' onclick='setRISL(this);'>";
                                listHtml += "                        <div class='tit'>" + resultJson[row].routeNm + "</div>";
                                listHtml += "                        <div class='con'>" + resultJson[row].startStationNm + "<i class='fas fa-arrows-alt-h'></i>" + resultJson[row].endStationNm + "</div>";
                                listHtml += "                    </a>";
                                listHtml += "                </li>";
                            }	        

                            listHtml += "            </ul>";
                        } else {
                            listHtml += "            <div class='empty'>노선정보가 없습니다.</div>";
                        }
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

                    removeMarker();
                    removeLowBusMarker();
                    removePolyline();

                    $(".preloader").fadeOut(400);

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
    } else if (dataType == "station") {
        listHtml += "<div id='stationInfo' class='listInfo'>";
        listHtml += "    <div class='infoTop cf'>";
        listHtml += "        <div class='infoSearch'>";
        listHtml += "            <form id='' name='' method='' class='cf'>";
        listHtml += "                <input type='hidden' name='type' value='station'>";
        listHtml += "                <input type='text' name='keyword' placeholder='정류장명 또는 정류장번호를 입력해주세요.'>";
        listHtml += "                <input type='button' value='검색' onclick='setInfoSearch(this);'>";
        listHtml += "            </form>";
        listHtml += "        </div>";
        listHtml += "        <div class='infoTitle'>정류장정보 (<span class='num'>0</span>)</div>";
        listHtml += "    </div>";
        listHtml += "    <div class='infoMain'>";
        listHtml += "        <div class='infoMainLeft'>";
        listHtml += "            <div class='empty'>정류장을 검색해주세요.</div>";
        listHtml += "        </div>";
        listHtml += "        <div class='infoMainRight'>";
        listHtml += "            <div class='routeTable'>";
        listHtml += "                <div class='empty'>정류장을 선택해주세요.</div>";
        listHtml += "            </div>";
        listHtml += "        </div>";
        listHtml += "    </div>";
        listHtml += "</div>";
        
        if ($("#contList .listInfoArea").length > 0) {
            $("#contList .listInfoArea").html(listHtml);
        }
        
        removeMarker();
        removeLowBusMarker();
        removePolyline();
        
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
    }
    
    $("#contList").addClass("on");
    $("#contList .listBtnArea .listBtnTab .listBtn").removeClass("on");
    $(obj).addClass("on");
}

//관리자 노선정보에서 노선 클릭시 실행
function setRISL(obj) {
    var dataRouteId = $(obj).attr("data-route-id");
    var listWidth = "0px";
    var listHtml = "";
    var resultJson = {};
    var resultArr = [];
    
    if ($(obj).parent("li").hasClass("on")) {
        listHtml += "<div class='stationList'>";
        listHtml += "   <div class='empty'>노선을 선택해주세요.</div>";
        listHtml += "</div>";
        
        $(obj).parent("li").removeClass("on");
        
        if ($("#contList .listInfoArea .infoMain .infoMainRight").length > 0) {
            $("#contList .listInfoArea .infoMain .infoMainRight").html(listHtml);
        }
        
        if (globalFileUrl.indexOf("/JWN/") > -1) {
        	setRouteBusVisible();
        }
    } else {
        if (dataRouteId != undefined) {
            $(".preloader").addClass("opacity");
            $(".preloader").css("display","block");
            
            if (globalFileUrl.indexOf("/JWN/") > -1) {
        		$("#contList").removeClass("on");
                $("#contList .listBtnArea #arrowBtn").find("i").attr("class", "fas fa-chevron-up");
        	}

            //노선에 매핑된 정류장정보 가져오기
            $.ajax({
                dataType: "xml",
                type: "GET",
                url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteAcctoThrghSttnList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeId=" + globalCityName + dataRouteId + "&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                success: function(result) {
                    //console.log(result);
                    var resultXml = $(result).find("response").find("body").find("items").find("item");

                    var listCnt = (resultXml.length > 0) ? resultXml.length : 0;

                    listHtml += "<div class='stationList'>";

                    if (listCnt > 0) {
                        listCnt = 0;

                        $(resultXml).each(function() {
                            var routeId = $(this).find("routeid").text().replace(globalCityName, "");
                            var stationId = $(this).find("nodeid").text().replace(globalCityName, "");

                            var resultXmlJson = {routeId:routeId,stationId:stationId,stationNm:$(this).find("nodenm").text(),stationOrd:$(this).find("nodeord").text(),updnDir:$(this).find("updowncd").text(),localX:$(this).find("gpslong").text(),localY:$(this).find("gpslati").text()};

                            resultJson[$(this).find("nodeord").text()] = resultXmlJson;

                            listCnt++;
                        });

                        if (listCnt > 0) {
                            listHtml += "    <ul class='right onlyRight stationListList cf'>";

                            for (var row in resultJson) {
                                listHtml += "        <li data-station-order='" + resultJson[row].stationOrd + "'>";
                                listHtml += "            <div class='tit'>";
                                listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"" + resultJson[row].stationId + "\",\"Y\")'>";
                                listHtml += "                    <p class='name'>" + resultJson[row].stationNm + "</p>";
                                listHtml += "                    <p class='num'>" + resultJson[row].stationId + "</p>";
                                listHtml += "                </a>";
                                listHtml += "            </div>";
                                listHtml += "            <div class='img'><img src='" + globalFilePath + "images/next.png' alt='next' class='arrowImg'></div>";
                                listHtml += "        </li>";

                                resultArr.push(resultJson[row]);
                            }

                            listHtml += "    </ul>";

                            listWidth = ((listCnt + 2) * 100) + "px";
                        } else {
                            listHtml += "    <div class='empty'>해당 노선의 정류장정보가 없습니다.</div>";
                        }
                    } else {
                        listHtml += "    <div class='empty'>해당 노선의 정류장정보가 없습니다.</div>";
                    }

                    listHtml += "</div>";

                    $("#contList .listInfoArea .infoMain .infoMainLeft .routeList li").removeClass("on");
                    $(obj).parent("li").addClass("on");

                    var position = $("#contList .listInfoArea .infoMain .infoMainLeft ul>li.on").position();

                    if (position != undefined) {
                       $("#contList .listInfoArea .infoMain .infoMainLeft").animate({scrollTop : position.top}, 0);
                    }

                    if ($("#contList .listInfoArea .infoMain .infoMainRight").length > 0) {
                        $("#contList .listInfoArea .infoMain .infoMainRight").html(listHtml);
                        $("#contList .listInfoArea .infoMain .infoMainRight .stationList ul").css("width",listWidth);
                    }

                    removeMarker();
                    removePolyline();
                    routeMarker("Y","Y",dataRouteId,resultArr);
                    
                    if (globalFileUrl.indexOf("/JWN/") > -1) {
        	        	setRouteBusVisible(dataRouteId);
        	        }

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
        } else {
            map.setCenter(new kakao.maps.LatLng(mapLatitude,mapLongitude));
            map.setLevel(5);
            
            if (globalFileUrl.indexOf("/JWN/") > -1) {
            	setRouteBusVisible();
            }
        }
    }
}

//관리자 정류장정보에서 정류장 클릭시 실행
function setSIBL(obj) {
    var dataStationId = $(obj).attr("data-station-id");
    var listHtml = "";
    
    if ($(obj).parent("li").hasClass("on")) {
        listHtml += "<div class='routeTable'>";
        listHtml += "   <div class='empty'>정류장을 선택해주세요.</div>";
        listHtml += "</div>";
        
        $(obj).parent("li").removeClass("on");
        
        if ($("#contList .listInfoArea .infoMain .infoMainRight").length > 0) {
            $("#contList .listInfoArea .infoMain .infoMainRight").html(listHtml);
        }
    } else {
        listHtml += "<div class='routeTable'>";
        listHtml += "    <table class='table routeTableList' data-station-id='" + dataStationId + "'>";
        listHtml += "        <colgroup>";
        listHtml += "            <col width='*'>";
        listHtml += "            <col width='150px'>";
        listHtml += "            <col width='150px'>";
        listHtml += "            <col width='150px'>";
        listHtml += "        </colgroup>";
        listHtml += "        <thead>";
        listHtml += "            <tr>";
        listHtml += "                <th>노선번호</th>";
        listHtml += "                <th>버스종류</th>";
        listHtml += "                <th>도착예정</th>";
        listHtml += "                <th>현재위치</th>";
        listHtml += "            </tr>";
        listHtml += "        </thead>";
        listHtml += "        <tbody></tbody>";
        listHtml += "    </table>";
        listHtml += "</div>";
        
        $("#contList .listInfoArea .infoMain .infoMainLeft .stationList li").removeClass("on");
        $(obj).parent("li").addClass("on");
        
        if ($("#contList .listInfoArea .infoMain .infoMainRight").length > 0) {
            $("#contList .listInfoArea .infoMain .infoMainRight").html(listHtml);
        }
        
        var position = $("#contList .listInfoArea .infoMain .infoMainLeft ul>li.on").position();
        
        if (position != undefined) {
            $("#contList .listInfoArea .infoMain .infoMainLeft").animate({scrollTop : position.top}, 0);
        }
        
        markerPosition("station",dataStationId,"Y");
    }
}

//관리자 정류장정보에서 버스 클릭시 실행
function setBISL(obj) {
    var dataRouteId = $(obj).attr("data-route-id");
	var dataRouteNum = $(obj).attr("data-route-num");
	var listHtml = "";
    var resultJson = {};
    
    $(".preloader").removeClass("opacity");
	$(".preloader").css("display","block");
    
    if (globalFileUrl.indexOf("/JWN/") > -1) {
        removeMarker();
        removeLowBusMarker();
        lowBusMarker("start",dataRouteId,dataRouteNum);
    } else {
        //검색한 노선정보 가져오기
        $.ajax({
            dataType: "xml",
            type: "GET",
            url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeNo=" + dataRouteNum + "&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
            success: function(result) {
                //console.log(result);
                var resultXml = $(result).find("response").find("body").find("items").find("item");

                var listCnt = (resultXml.length > 0) ? resultXml.length : 0;

                listHtml += "<div id='routeInfo' class='listInfo'>";
                listHtml += "    <div class='infoTop cf'>";
                listHtml += "        <div class='infoSearch'>";
                listHtml += "            <form id='' name='' method='' class='cf'>";
                listHtml += "                <input type='hidden' name='type' value='route'>";
                listHtml += "                <input type='text' name='keyword' value='" + dataRouteNum + "' placeholder='노선번호를 입력해주세요.'>";
                listHtml += "                <input type='button' value='검색' onclick='setInfoSearch(this);'>";
                listHtml += "            </form>";
                listHtml += "        </div>";
                listHtml += "        <div class='infoTitle'>노선정보 (<span class='num'>" + listCnt + "</span>)</div>";
                listHtml += "    </div>";
                listHtml += "    <div class='infoMain'>";
                listHtml += "        <div class='infoMainLeft'>";

                if (listCnt > 0) {
                    listCnt = 0;

                    $(resultXml).each(function() {
                        var routeId = $(this).find("routeid").text().replace(globalCityName, "");

                        var resultXmlJson = {routeId:routeId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),startStationNm:$(this).find("startnodenm").text(),endStationNm:$(this).find("endnodenm").text()};

                        resultJson[listCnt] = resultXmlJson;

                        listCnt++;
                    });

                    if (listCnt > 0) {
                        listHtml += "            <ul class='routeList cf'>";	        

                        for (var row in resultJson) {
                            listHtml += "                <li>";
                            listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='" + resultJson[row].routeId + "' data-route-num='" + resultJson[row].routeNm + "' onclick='setRISL(this);'>";
                            listHtml += "                        <div class='tit'>" + resultJson[row].routeNm + "</div>";
                            listHtml += "                        <div class='con'>" + resultJson[row].startStationNm + "<i class='fas fa-arrows-alt-h'></i>" + resultJson[row].endStationNm + "</div>";
                            listHtml += "                    </a>";
                            listHtml += "                </li>";
                        }

                        listHtml += "            </ul>";
                    } else {
                        listHtml += "            <div class='empty'>노선정보가 없습니다.</div>";
                    }
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
                    setRISL($("#contList .listInfoArea .infoMain .infoMainLeft .routeList li .listTit[data-route-id='" + dataRouteId + "']"));	            
                }

                $(".preloader").fadeOut(400);

                //검색할 때 엔터키 submit 막기
                $("input[name='keyword']").keydown(function(event) {
                    if (event.keyCode == "13") {
                        if (window.event) {
                            event.preventDefault();
                            return;
                        }
                    }
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
	
	$("#contList").addClass("on");
    
    if ($("#contList .listBtnArea .listBtnTab .listBtn").length > 0) {
        $("#contList .listBtnArea .listBtnTab .listBtn").removeClass("on");
        $("#contList .listBtnArea .listBtnTab .listBtn[data-type='route']").addClass("on");
    }
}

//모바일 노선검색에서 노선 클릭시 실행
function setMRISL(obj,busId) {
    var dataRouteId = $(obj).attr("data-route-id");
    var listHtml = "";
    var resultJson = {};
    var resultArr = [];
    busId = (busId != undefined) ? busId : "";
    
    if ($(obj).parent("li").hasClass("on") && busId == "") {
        $(obj).parent("li").removeClass("on");
        $(obj).next(".stationList").html(listHtml);
        
        if (globalFileUrl.indexOf("/JWN/") > -1) {
        	setRouteBusVisible();
        }
    } else {
        if (dataRouteId != undefined) {
            $(".preloader").addClass("opacity");
            $(".preloader").css("display","block");
            
            if (globalFileUrl.indexOf("/JWN/") > -1) {
        		$("#mContList").removeClass("on");
                $("#mContList .mListBtnArea .mListBtn").find("i").attr("class", "fas fa-chevron-up");
        	}

            //노선에 매핑된 정류장정보 가져오기
            $.ajax({
                dataType: "xml",
                type: "GET",
                url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteAcctoThrghSttnList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeId=" + globalCityName + dataRouteId + "&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                success: function(result) {
                    //console.log(result);
                    var resultXml = $(result).find("response").find("body").find("items").find("item");

                    var listCnt = (resultXml.length > 0) ? resultXml.length : 0;

                    if (listCnt > 0) {
                        listCnt = 0;

                        $(resultXml).each(function() {
                            var routeId = $(this).find("routeid").text().replace(globalCityName, "");
                            var stationId = $(this).find("nodeid").text().replace(globalCityName, "");

                            var resultXmlJson = {routeId:routeId,stationId:stationId,stationNm:$(this).find("nodenm").text(),stationOrd:$(this).find("nodeord").text(),updnDir:$(this).find("updowncd").text(),localX:$(this).find("gpslong").text(),localY:$(this).find("gpslati").text()};

                            resultJson[$(this).find("nodeord").text()] = resultXmlJson;

                            listCnt++;
                        });

                        if (listCnt > 0) {
                            listHtml += "<ul class='stationListList cf'>";

                            for (var row in resultJson) {
                                listHtml += "    <li data-station-order='" + resultJson[row].stationOrd + "'>";            
                                listHtml += "        <div class='tit'>";                
                                listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"" + resultJson[row].stationId + "\",\"Y\")'>";   
                                listHtml += "                <p class='name'>" + resultJson[row].stationNm + "</p>";    
                                listHtml += "                <p class='num'>" + resultJson[row].stationId + "</p>";         
                                listHtml += "            </a>";            
                                listHtml += "        </div>"; 
                                listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down' class='arrowImg'></div>"; 
                                listHtml += "    </li>"; 

                                resultArr.push(resultJson[row]);
                            }

                            listHtml += "</ul>";
                        } else {
                            listHtml += "    <div class='empty'>해당 노선의 정류장정보가 없습니다.</div>";
                        }
                    } else {
                        listHtml += "    <div class='empty'>해당 노선의 정류장정보가 없습니다.</div>";
                    }

                    $("#mContList .mListInfoArea .mInfoMain>ul>li").removeClass("on");
                    $(obj).parent("li").addClass("on");
                    $("#mContList .mListInfoArea .mInfoMain>ul>li .stationList").html("");
                    $(obj).next(".stationList").html(listHtml);

                    var position = $("#mContList .mListInfoArea .mInfoMain>ul>li.on").position();

                    if (position != undefined) {
                        $("#mContList .mListInfoArea .mInfoMain").animate({scrollTop : position.top}, 0);
                    }

                    removeMarker();
                    removePolyline();
                    routeMarker("Y","Y",dataRouteId,resultArr,busId);
                    
                    if (globalFileUrl.indexOf("/JWN/") > -1) {
        	        	setRouteBusVisible(dataRouteId,busId);
        	        }

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
        } else {
            map.setCenter(new kakao.maps.LatLng(mapLatitude,mapLongitude));
            map.setLevel(5);
            
            if (globalFileUrl.indexOf("/JWN/") > -1) {
            	setRouteBusVisible();
            }
        }
    }
}

//모바일 정류장검색에서 정류장 클릭시 실행
function setMSIBL(obj) {
    var dataStationId = $(obj).attr("data-station-id");
    var listHtml = "";
    
    if ($(obj).parent("li").hasClass("on")) {
        $(obj).parent("li").removeClass("on");
        $(obj).next(".routeTable").html(listHtml);
    } else {
        listHtml += "<ul class='routeTableList cf' data-station-id='" + dataStationId + "'></ul>";
        
        $("#mContList .mListInfoArea .mInfoMain>ul>li").removeClass("on");
        $(obj).parent("li").addClass("on");
        $("#mContList .mListInfoArea .mInfoMain>ul>li .routeTable").html("");
        $(obj).next(".routeTable").html(listHtml);
        
        var position = $("#mContList .mListInfoArea .mInfoMain>ul>li.on").position();
        
        if (position != undefined) {
            $("#mContList .mListInfoArea .mInfoMain").animate({scrollTop : position.top}, 0);
        }
        
        markerPosition("station",dataStationId,"Y");
    }
}

//모바일 정류장검색에서 버스 클릭시 실행
function setMBISL(obj) {
    var dataRouteId = $(obj).attr("data-route-id");
	var dataRouteNum = $(obj).attr("data-route-num");
	var dataForm = $("<form></form>");
	
	dataForm.attr("name","dataForm");
	dataForm.attr("method","get");
	dataForm.attr("action","route-info.html");
	
	dataForm.append($("<input>",{type: "hidden", name: "dataRouteId", value: dataRouteId}));
	dataForm.append($("<input>",{type: "hidden", name: "dataRouteNum", value: dataRouteNum}));
	
	dataForm.appendTo("body");
	dataForm.submit();
}

//모바일 경로검색에서 정류장 클릭시 실행
function setCourseInput(type, obj) {
    var dataStationId = $(obj).attr("data-station-id");
    var dataStationName = $(obj).attr("data-station-name");
    var dataStationLatitude = $(obj).attr("data-station-latitude");
    var dataStationLongitude = $(obj).attr("data-station-longitude");
    var formObj = $("#mContList .mListInfoArea .mInfoTop .mInfoSearch").find("input[name='type'][value='" + type + "']").closest("form");
    
    if (formObj.length > 0) {
        $(formObj).find("input[name='flag']").val("Y");
        $(formObj).find("input[name='latitude']").val(dataStationLatitude);
        $(formObj).find("input[name='longitude']").val(dataStationLongitude);
        $(formObj).find("input[name='keyword']").val(dataStationName);
        $(formObj).find("input[name='keyword']").addClass("selected");
        
        if ($(".infoWindowArea#iw-station-" + dataStationId).css("display") != "block") {
            markerPosition("station",dataStationId,"Y");
        }
    }
}

//모바일 경로검색에서 경로검색 버튼 클릭시 실행
function setCourseSearch() {
    //var formStartObj = $("#mContList .mListInfoArea .mInfoTop .mInfoSearch input[name='type'][value='mStart']").closest("form");
    var formArrivalObj = $("#mContList .mListInfoArea .mInfoTop .mInfoSearch input[name='type'][value='mArrival']").closest("form");
    
    //if (formStartObj.length > 0 && formArrivalObj.length > 0) {
    if (formArrivalObj.length > 0) {
        /*if ($(formStartObj).find("input[name='flag']").val() != "Y") {
            openLayer("alert","출발지를 선택해주세요.","");
        } else if ($(formArrivalObj).find("input[name='flag']").val() != "Y") {*/
        if ($(formArrivalObj).find("input[name='flag']").val() != "Y") {
            openLayer("alert","도착지를 선택해주세요.","");
        } else {
            /*var startName = $(formStartObj).find("input[name='keyword']").val();
            var startLatitude = $(formStartObj).find("input[name='latitude']").val();
            var startLongitude = $(formStartObj).find("input[name='longitude']").val();*/
            var arrivalName = $(formArrivalObj).find("input[name='keyword']").val();
            var arrivalLatitude = $(formArrivalObj).find("input[name='latitude']").val();
            var arrivalLongitude = $(formArrivalObj).find("input[name='longitude']").val();
            
            //window.open("http://map.daum.net?sName=" + startName + "&eName=" + arrivalName + "&by=FOOT");
            window.open("https://map.kakao.com/link/to/" + arrivalName + "," + arrivalLatitude + "," + arrivalLongitude);
        }
    }
}

//모바일 노선정보에서 노선 클릭시 실행
function openRouteDetailLayer(obj) {
    var dataRouteId = $(obj).attr("data-route-id");
    var listHtml = "";
    var listSubHtml = "";
    var resultJson = {};
    
    $(".preloader").addClass("opacity");
    $(".preloader").css("display","block");
    
    //노선 상세정보 가져오기
    $.ajax({
        dataType: "xml",
        type: "GET",
        url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteInfoIem?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeId=" + globalCityName + dataRouteId,
        success: function(result) {
            //console.log(result);
            var resultXml = $(result).find("response").find("body").find("items").find("item");
            
            $(resultXml).each(function() {
                var routeId = $(this).find("routeid").text().replace(globalCityName, "");

                var resultXmlJson = {routeId:routeId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),startStationNm:$(this).find("startnodenm").text(),endStationNm:$(this).find("endnodenm").text(),endvehicletime:$(this).find("endvehicletime").text(),startvehicletime:$(this).find("startvehicletime").text(),intervaltime:$(this).find("intervaltime").text(),intervalsattime:$(this).find("intervalsattime").text(),intervalsuntime:$(this).find("intervalsuntime").text()};

                resultJson = resultXmlJson;
            });
            
            listHtml += "<div class='routeDetailTable'>";
            listHtml += "    <table class='table'>";
            listHtml += "		 <colgroup>";
            listHtml += "		 	 <col width='120px'>";
            listHtml += "		 	 <col width='*'>";
            listHtml += "		 </colgroup>";
            listHtml += "        <tbody>";
            listHtml += "            <tr>";
            listHtml += "                <th>노선명</th>";
            listHtml += "                <td><span class='big'>" + resultJson.routeNm + "</span></td>";
            listHtml += "            </tr>";
            listHtml += "            <tr>";
            listHtml += "                <th>노선종류</th>";
            listHtml += "                <td>" + resultJson.routeTp + "</td>";
            listHtml += "            </tr>";
            listHtml += "            <tr>";
            listHtml += "                <th>노선 정류장명</th>";
            listHtml += "                <td>" + resultJson.startStationNm + "<i class='fas fa-arrows-alt-h'></i>" + resultJson.endStationNm + "</td>";
            listHtml += "            </tr>";
            
            if (resultJson.startvehicletime != "") {
                listHtml += "            <tr>";
                listHtml += "                <th>노선 첫차시간</th>";
                listHtml += "                <td>" + resultJson.startvehicletime.substr(0,2) + "시 " + resultJson.startvehicletime.substr(3,2) + "분</td>";
                listHtml += "            </tr>";
            }
            
            if (resultJson.endvehicletime != "") {
                listHtml += "            <tr>";
                listHtml += "                <th>노선 막차시간</th>";
                listHtml += "                <td>" + resultJson.endvehicletime.substr(0,2) + "시 " + resultJson.endvehicletime.substr(3,2) + "분</td>";
                listHtml += "            </tr>";
            }
            
            if (resultJson.intervaltime != "" && resultJson.intervaltime > 0) {
                listSubHtml += resultJson.intervaltime + "분<span class='small'>(평일)</span>";
            }

            if (resultJson.intervalsattime != "" && resultJson.intervalsattime > 0) {
                if (listSubHtml != "") {
                    listSubHtml += " / ";
                }

                listSubHtml += resultJson.intervalsattime + "분<span class='small'>(토요일)</span>";
            }

            if (resultJson.intervalsuntime != "" && resultJson.intervalsuntime > 0) {
                if (listSubHtml != "") {
                    listSubHtml += " / ";
                }

                listSubHtml += resultJson.intervalsuntime + "분<span class='small'>(일요일)</span>";
            }
            
            if (listSubHtml != "") {
                listHtml += "            <tr>";
                listHtml += "                <th>노선 배차간격</th>";
                listHtml += "                <td>" + listSubHtml + "</td>";
                listHtml += "            </tr>";
            }
            
            listHtml += "        </tbody>";
            listHtml += "    </table>";
            listHtml += "</div>";

            if ($("#routeDetailLayer .layerBox .layerContent").length > 0) {
                $("#routeDetailLayer .layerBox .layerContent").html(listHtml);
            }

            $("#routeDetailLayer").addClass("on");

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

//모바일 버스시간표에서 버스노선 클릭시 실행
function openBusLayer(obj) {
    var listHtml = "";
    
    listHtml += "<div class='busTopArea'>";
    listHtml += "    <div class='busTit'>300-1</div>";
    listHtml += "    <div class='busCon'>번대동<i class='fas fa-arrows-alt-h'></i>신사동</div>";
    listHtml += "</div>";
    listHtml += "<div class='busTable'>";
    listHtml += "    <table class='table'>";
    listHtml += "        <thead>";
    listHtml += "            <tr>";
    listHtml += "                <th>순서</th>";
    listHtml += "                <th>번대동</th>";
    listHtml += "                <th>하귀초등학교</th>";
    listHtml += "                <th>하귀환승정류장(하귀하나로마트)</th>";
    listHtml += "                <th>외도초등학교</th>";
    listHtml += "                <th>이호2동</th>";
    listHtml += "                <th>S중앙병원</th>";
    listHtml += "                <th>노형오거리/한라병원방면</th>";
    listHtml += "                <th>한라병원</th>";
    listHtml += "                <th>세기아파트</th>";
    listHtml += "                <th>보건소</th>";
    listHtml += "                <th>정부제주 지방합동청사</th>";
    listHtml += "            </tr>";
    listHtml += "        </thead>";
    listHtml += "        <tbody>";
    listHtml += "            <tr>";
    listHtml += "                <td>1</td>";
    listHtml += "                <td>05:00</td>";
    listHtml += "                <td>05:05</td>";
    listHtml += "                <td>05:10</td>";
    listHtml += "                <td>05:15</td>";
    listHtml += "                <td>05:20</td>";
    listHtml += "                <td>05:25</td>";
    listHtml += "                <td>05:30</td>";
    listHtml += "                <td>05:35</td>";
    listHtml += "                <td>05:40</td>";
    listHtml += "                <td>05:45</td>";
    listHtml += "                <td>05:50</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <td>2</td>";
    listHtml += "                <td>06:00</td>";
    listHtml += "                <td>06:05</td>";
    listHtml += "                <td>06:10</td>";
    listHtml += "                <td>06:15</td>";
    listHtml += "                <td>06:20</td>";
    listHtml += "                <td>06:25</td>";
    listHtml += "                <td>06:30</td>";
    listHtml += "                <td>06:35</td>";
    listHtml += "                <td>06:40</td>";
    listHtml += "                <td>06:45</td>";
    listHtml += "                <td>06:50</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <td>3</td>";
    listHtml += "                <td>07:00</td>";
    listHtml += "                <td>07:05</td>";
    listHtml += "                <td>07:10</td>";
    listHtml += "                <td>07:15</td>";
    listHtml += "                <td>07:20</td>";
    listHtml += "                <td>07:25</td>";
    listHtml += "                <td>07:30</td>";
    listHtml += "                <td>07:35</td>";
    listHtml += "                <td>07:40</td>";
    listHtml += "                <td>07:45</td>";
    listHtml += "                <td>07:50</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <td>4</td>";
    listHtml += "                <td>08:00</td>";
    listHtml += "                <td>08:05</td>";
    listHtml += "                <td>08:10</td>";
    listHtml += "                <td>08:15</td>";
    listHtml += "                <td>08:20</td>";
    listHtml += "                <td>08:25</td>";
    listHtml += "                <td>08:30</td>";
    listHtml += "                <td>08:35</td>";
    listHtml += "                <td>08:40</td>";
    listHtml += "                <td>08:45</td>";
    listHtml += "                <td>08:50</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <td>5</td>";
    listHtml += "                <td>09:00</td>";
    listHtml += "                <td>09:05</td>";
    listHtml += "                <td>09:10</td>";
    listHtml += "                <td>09:15</td>";
    listHtml += "                <td>09:20</td>";
    listHtml += "                <td>09:25</td>";
    listHtml += "                <td>09:30</td>";
    listHtml += "                <td>09:35</td>";
    listHtml += "                <td>09:40</td>";
    listHtml += "                <td>09:45</td>";
    listHtml += "                <td>09:50</td>";
    listHtml += "            </tr>";
    listHtml += "        </tbody>";
    listHtml += "    </table>";
    listHtml += "</div>";
    
    if ($("#busLayer .layerBox .layerContent").length > 0) {
        $("#busLayer .layerBox .layerContent").html(listHtml);
    }
    
    $("#busLayer").addClass("on");
}

//모바일 도착알림에서 버스노선 선택시 실행
function setNoticeSelect(obj) {
    var dataRouteId = $(obj).val();
    var listHtml = "";
    var resultJson = {};
    var resultArr = [];
    
    if (dataRouteId != "" && dataRouteId != undefined) {
    	$(".preloader").addClass("opacity");
    	$(".preloader").css("display","block");
    	
    	//노선에 매핑된 정류장정보 가져오기
    	$.ajax({
    		dataType: "xml",
    		type: "GET",
    		url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteAcctoThrghSttnList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeId=" + globalCityName + dataRouteId + "&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
    		success: function(result) {
    			//console.log(result);
                var resultXml = $(result).find("response").find("body").find("items").find("item");
                
                var listCnt = (resultXml.length > 0) ? resultXml.length : 0;
    			
    			if (listCnt > 0) {
                    listCnt = 0;
                    
                    $(resultXml).each(function() {
                        var routeId = $(this).find("routeid").text().replace(globalCityName, "");
                        var stationId = $(this).find("nodeid").text().replace(globalCityName, "");
                        
                        var resultXmlJson = {routeId:routeId,stationId:stationId,stationNm:$(this).find("nodenm").text(),stationOrd:$(this).find("nodeord").text(),updnDir:$(this).find("updowncd").text(),localX:$(this).find("gpslong").text(),localY:$(this).find("gpslati").text()};
                        
                        resultJson[$(this).find("nodeord").text()] = resultXmlJson;
                        
                        listCnt++;
                    });
                    
                    if (listCnt > 0) {
                        listHtml += "<ul class='stationList cf'>";

                        for (var row in resultJson) {
                            listHtml += "    <li>";
                            listHtml += "        <a href='javascript:void(0);' class='listTit'>";
                            listHtml += "            <div class='txt'>";
                            listHtml += "                <div class='tit'>" + resultJson[row].stationNm + "</div>";
                            listHtml += "                <div class='con'>" + resultJson[row].stationId + "</div>";
                            listHtml += "            </div>";
                            listHtml += "            <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down' class='pointer' data-station-id='" + resultJson[row].stationId + "' onclick='setNoticeCheck(this);'></div>";
                            listHtml += "        </a>";
                            listHtml += "    </li>";
                            
                            resultArr.push(resultJson[row]);
                        }

                        listHtml += "</ul>";
                    } else {
                        listHtml += "    <div class='empty'>해당 버스노선의 정류장정보가 없습니다.</div>";
                    }
    			} else {
    				listHtml += "    <div class='empty'>해당 버스노선의 정류장정보가 없습니다.</div>";
    			}
    	        
    			if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
    		        $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
    		    }
    		    
    		    removeMarker();
                removeLowBusMarker();
    		    removePolyline();
    		    routeMarker("N","N",dataRouteId,resultArr);
    		    
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
    } else {
    	listHtml += "<div class='empty'>버스노선을 선택해주세요.</div>";
    	
    	if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
	        $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
	    }
	    
	    removeMarker();
        removeLowBusMarker();
	    removePolyline();
    }
}

//모바일 도착알림에서 출발/도착 버튼 클릭시 실행
function setNoticeClick(obj) {
    var dataType = $(obj).attr("data-type");
    
    /*if ($(obj).hasClass("on")) {
        $(obj).removeClass("on");
        $("#mContList .mListInfoArea .mInfoMain>ul>li .img img").removeClass("pointer");
    } else {
        $("#mContList .mListInfoArea .mInfoTop .mInfoPointArea .mInfoPoint").removeClass("on");
        $(obj).addClass("on");
        $("#mContList .mListInfoArea .mInfoMain>ul>li .img img").addClass("pointer");
    }*/
    
    $("#mContList .mListInfoArea .mInfoTop .mInfoPointArea .mInfoPoint").removeClass("on");
    $(obj).addClass("on");
    //$("#mContList .mListInfoArea .mInfoMain>ul>li .img img").addClass("pointer");
}

//모바일 도착알림에서 정류장 클릭시 실행
function setNoticeCheck(obj) {
    if ($(obj).hasClass("pointer")) {
        var dataType = $("#mContList .mListInfoArea .mInfoTop .mInfoPointArea .mInfoPoint.on").attr("data-type");
        var dataStationId = $(obj).attr("data-station-id");
        
        if (dataType == "start") {
            var startIdx = $(obj).closest("li").index();
            var arrivalIdx = $("#mContList .mListInfoArea .mInfoMain>ul>li .img img.arrival").closest("li").index();
            
            if (arrivalIdx == -1 || arrivalIdx >= startIdx) {
                if ($(obj).hasClass(dataType)) {
                    $(obj).removeClass(dataType);
                    $(".markerArea#m-station-" + dataStationId).removeClass(dataType);
                    
                    $(obj).attr("src",globalFilePath + "images/" + $(obj).attr("alt") + ".png");
                    $(".markerArea#m-station-" + dataStationId + ">img").attr("src",globalFilePath + "images/map-station.png");
                } else {
                    $("#mContList .mListInfoArea .mInfoMain>ul>li .img img.pointer:not(img.arrival)").removeClass(dataType);
                    $(".markerArea:not(.markerArea.arrival)").removeClass(dataType);
                    
                    $("#mContList .mListInfoArea .mInfoMain>ul>li .img img.pointer:not(img.arrival)").each(function() {
                    	$(this).attr("src",globalFilePath + "images/" + $(this).attr("alt") + ".png");
                    });
                    $(".markerArea:not(.markerArea.on,.markerArea.arrival)>img").attr("src",globalFilePath + "images/map-station.png");
                    
                    $(obj).removeClass("arrival");
                    $(".markerArea#m-station-" + dataStationId).removeClass("arrival");
                    $(obj).addClass(dataType);
                    $(".markerArea#m-station-" + dataStationId).addClass(dataType);
                    
                    $(obj).attr("src",globalFilePath + "images/" + dataType + ".png");
                    $(".markerArea#m-station-" + dataStationId + ">img").attr("src",globalFilePath + "images/map-" + dataType + ".png");
                    
                    markerPosition("station",dataStationId,"N");
                }
            } else {
                openLayer("alert","도착 정류장 이후의 정류장은 선택할 수 없습니다.","");
            }
        } else if (dataType == "arrival") {
            var startIdx = $("#mContList .mListInfoArea .mInfoMain>ul>li .img img.start").closest("li").index();
            var arrivalIdx = $(obj).closest("li").index();
            
            if (startIdx == -1 || startIdx <= arrivalIdx) {
                if ($(obj).hasClass(dataType)) {
                    $(obj).removeClass(dataType);
                    $(".markerArea#m-station-" + dataStationId).removeClass(dataType);
                    
                    $(obj).attr("src",globalFilePath + "images/" + $(obj).attr("alt") + ".png");
                    $(".markerArea#m-station-" + dataStationId + ">img").attr("src",globalFilePath + "images/map-station.png");
                } else {
                    $("#mContList .mListInfoArea .mInfoMain>ul>li .img img.pointer:not(img.start)").removeClass(dataType);
                    $(".markerArea:not(.markerArea.start)").removeClass(dataType);
                    
                    $("#mContList .mListInfoArea .mInfoMain>ul>li .img img.pointer:not(img.start)").each(function() {
                    	$(this).attr("src",globalFilePath + "images/" + $(this).attr("alt") + ".png");
                    });
                    $(".markerArea:not(.markerArea.on,.markerArea.start)>img").attr("src",globalFilePath + "images/map-station.png");
                    
                    $(obj).removeClass("start");
                    $(".markerArea#m-station-" + dataStationId).removeClass("start");
                    $(obj).addClass(dataType);
                    $(".markerArea#m-station-" + dataStationId).addClass(dataType);
                    
                    $(obj).attr("src",globalFilePath + "images/" + dataType + ".png");
                    $(".markerArea#m-station-" + dataStationId + ">img").attr("src",globalFilePath + "images/map-" + dataType + ".png");
                    
                    markerPosition("station",dataStationId,"N");
                }
            } else {
                openLayer("alert","출발 정류장 이전의 정류장은 선택할 수 없습니다.","");
            }
        }
    }
}

//모바일 도착알림에서 공유하기 버튼 클릭시 실행
function setNoticeShare() {
    var startObj = $("#mContList .mListInfoArea .mInfoMain>ul>li .img img.start");
    var arrivalObj = $("#mContList .mListInfoArea .mInfoMain>ul>li .img img.arrival");
    
    if ($(startObj).length == 0) {
        openLayer("alert","출발 정류장을 선택해주세요.","");
    } else if ($(arrivalObj).length == 0) {
        openLayer("alert","도착 정류장을 선택해주세요.","");
    } else {
        openLayer("alert","개발 예정입니다.","");
    }
}

//검색시 실행
function setInfoSearch(obj) {
    var formObj = $(obj).closest("form");
    var listCnt = "0";
    var listLeftHtml = "";
    var listRightHtml = "";
    var listHtml = "";
    var resultJson = {};
    var resultArr = [];
    
    if (formObj.length > 0) {
        var type = $(formObj).find("input[name='type']").val();
        var keyword = $(formObj).find("input[name='keyword']").val();
        
        if (type != "" && type != undefined && type != null) {
            if (type == "route") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    if (globalFileUrl.indexOf("/JWN/") > -1) {
                        var listCnt = 0;
                		
                		$("#contList .listInfoArea .infoMain .infoMainLeft .routeList>li").each(function() {
                			if ($(this).find(".listTit").attr("data-route-num").indexOf(keyword) > -1) {
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
                		
                		$("#contList .listInfoArea .infoMain .infoMainRight .stationList").html("<div class='empty'>노선을 선택해주세요.</div>");
                    } else {
                        $(".preloader").addClass("opacity");
                        $(".preloader").css("display","block");

                        //검색한 노선정보 가져오기
                        $.ajax({
                            dataType: "xml",
                            type: "GET",
                            url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeNo=" + keyword + "&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                            success: function(result) {
                                //console.log(result);
                                var resultXml = $(result).find("response").find("body").find("items").find("item");

                                var listCnt = (resultXml.length > 0) ? resultXml.length : 0;

                                if (listCnt > 0) {
                                    listCnt = 0;

                                    $(resultXml).each(function() {
                                        var routeId = $(this).find("routeid").text().replace(globalCityName, "");

                                        var resultXmlJson = {routeId:routeId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),startStationNm:$(this).find("startnodenm").text(),endStationNm:$(this).find("endnodenm").text()};

                                        resultJson[listCnt] = resultXmlJson;

                                        listCnt++;
                                    });

                                    if (listCnt > 0) {
                                        listLeftHtml += "<ul class='routeList cf'>";	        

                                        for (var row in resultJson) {
                                            listLeftHtml += "	 <li>";
                                            listLeftHtml += "    	 <a href='javascript:void(0);' class='listTit' data-route-id='" + resultJson[row].routeId + "' data-route-num='" + resultJson[row].routeNm + "' onclick='setRISL(this);'>";
                                            listLeftHtml += "	         <div class='tit'>" + resultJson[row].routeNm + "</div>";
                                            listLeftHtml += "            <div class='con'>" + resultJson[row].startStationNm + "<i class='fas fa-arrows-alt-h'></i>" + resultJson[row].endStationNm + "</div>";
                                            listLeftHtml += "        </a>";
                                            listLeftHtml += "    </li>";
                                        }

                                        listLeftHtml += "</ul>";
                                    } else {
                                        listLeftHtml += "<div class='empty'>노선정보가 없습니다.</div>";
                                    }
                                } else {
                                    listLeftHtml += "<div class='empty'>노선정보가 없습니다.</div>";
                                }

                                listRightHtml += "<div class='stationList'>";
                                listRightHtml += "    <div class='empty'>노선을 선택해주세요.</div>";
                                listRightHtml += "</div>";

                                if ($("#contList .listInfoArea .infoTop .infoTitle .num").length > 0) {
                                    $("#contList .listInfoArea .infoTop .infoTitle .num").text(listCnt);
                                }

                                if ($("#contList .listInfoArea .infoMain .infoMainLeft").length > 0) {
                                    $("#contList .listInfoArea .infoMain .infoMainLeft").html(listLeftHtml);
                                }

                                if ($("#contList .listInfoArea .infoMain .infoMainRight").length > 0) {
                                    $("#contList .listInfoArea .infoMain .infoMainRight").html(listRightHtml);
                                }

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
                } else {
                    openLayer("alert","노선번호를 입력해주세요.","");
                }
            } else if (type == "station") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                	$(".preloader").addClass("opacity");
                	$(".preloader").css("display","block");
                	
                	//검색한 정류장정보 가져오기
                	$.ajax({
                		dataType: "xml",
                		type: "GET",
                		url: "http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getSttnNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeNm=&nodeNo=&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                		success: function(result) {
                			//console.log(result);
                            var resultXml = $(result).find("response").find("body").find("items").find("item");

                            var listCnt = (resultXml.length > 0) ? resultXml.length : 0;
                	        
                	        if (listCnt > 0) {
                                listCnt = 0;
                                
                                $(resultXml).each(function() {
                                    var stationId = $(this).find("nodeid").text().replace(globalCityName, "");
                                    
                                    if (stationId.replace(/\s/gi, "") == keyword.replace(/\s/gi, "") || $(this).find("nodenm").text().replace(/\s/gi, "").indexOf(keyword.replace(/\s/gi, "")) > -1) {
                                        var resultXmlJson = {stationId:stationId,stationNm:$(this).find("nodenm").text(),localX:$(this).find("gpslong").text(),localY:$(this).find("gpslati").text()};

                                        resultJson[listCnt] = resultXmlJson;

                                        listCnt++;
                                    }
                                });
                                
                                if (listCnt > 0) {
                                    listLeftHtml += "<ul class='stationList cf'>";

                                    for (var row in resultJson) {
                                        listLeftHtml += "	 <li>";
                                        listLeftHtml += "    	 <a href='javascript:void(0);' data-station-id='" + resultJson[row].stationId + "' class='listTit' onclick='setSIBL(this);'>";
                                        listLeftHtml += "	         <div class='tit'>" + resultJson[row].stationNm + "</div>";
                                        listLeftHtml += "            <div class='con'>" + resultJson[row].stationId + "</div>";
                                        listLeftHtml += "        </a>";
                                        listLeftHtml += "    </li>";
                                        
                                        resultArr.push(resultJson[row]);
                                    }    	        

                                    listLeftHtml += "</ul>";
                                } else {
                                    listLeftHtml += "<div class='empty'>정류장정보가 없습니다.</div>";
                                }
                	        } else {
                	        	listLeftHtml += "<div class='empty'>정류장정보가 없습니다.</div>";
                	        }
                	        
                	        listRightHtml += "<div class='routeTable'>";
                            listRightHtml += "    <div class='empty'>정류장을 선택해주세요.</div>";
                            listRightHtml += "</div>";
                	        
                            if ($("#contList .listInfoArea .infoTop .infoTitle .num").length > 0) {
                                $("#contList .listInfoArea .infoTop .infoTitle .num").text(listCnt);
                            }
                            
                            if ($("#contList .listInfoArea .infoMain .infoMainLeft").length > 0) {
                                $("#contList .listInfoArea .infoMain .infoMainLeft").html(listLeftHtml);
                            }
                            
                            if ($("#contList .listInfoArea .infoMain .infoMainRight").length > 0) {
                                $("#contList .listInfoArea .infoMain .infoMainRight").html(listRightHtml);
                            }
                            
                            removeMarker();
                            removeLowBusMarker();
                            removePolyline();
                            stationMarker("Y","N","N",resultArr);
                            
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
                } else {
                    openLayer("alert","정류장명 또는 정류장번호를 입력해주세요.","");
                }
            } else if (type == "mRoute") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    if (globalFileUrl.indexOf("/JWN/") > -1) {
                        var listCnt = 0;
                		
                		$("#mContList .mListInfoArea .mInfoMain .routeList>li").each(function() {
                			$(this).find(".stationList").html("");
                			
                			if ($(this).find(".listTit").attr("data-route-num").indexOf(keyword) > -1) {
                				$(this).css("display","block");
                				listCnt++;
                			} else {
                				$(this).css("display","none");
                			}
                		});
                		
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
                    } else {
                        $(".preloader").addClass("opacity");
                        $(".preloader").css("display","block");

                        //검색한 노선정보 가져오기
                        $.ajax({
                            dataType: "xml",
                            type: "GET",
                            url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeNo=" + keyword + "&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                            success: function(result) {
                                //console.log(result);
                                var resultXml = $(result).find("response").find("body").find("items").find("item");

                                var listCnt = (resultXml.length > 0) ? resultXml.length : 0;

                                if (listCnt > 0) {
                                    listCnt = 0;

                                    $(resultXml).each(function() {
                                        var routeId = $(this).find("routeid").text().replace(globalCityName, "");

                                        var resultXmlJson = {routeId:routeId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),startStationNm:$(this).find("startnodenm").text(),endStationNm:$(this).find("endnodenm").text()};

                                        resultJson[listCnt] = resultXmlJson;

                                        listCnt++;
                                    });

                                    if (listCnt > 0) {
                                        listHtml += "<ul class='routeList cf'>";	        

                                        for (var row in resultJson) {
                                            listHtml += "	 <li>";
                                            listHtml += "    	 <a href='javascript:void(0);' class='listTit' data-route-id='" + resultJson[row].routeId + "' data-route-num='" + resultJson[row].routeNm + "' onclick='setMRISL(this);'>";
                                            listHtml += "	         <div class='tit'>" + resultJson[row].routeNm + "</div>";
                                            listHtml += "            <div class='con'>" + resultJson[row].startStationNm + "<i class='fas fa-arrows-alt-h'></i>" + resultJson[row].endStationNm + "</div>";
                                            listHtml += "        </a>";
                                            listHtml += "		 <div class='stationList'></div>";
                                            listHtml += "    </li>";
                                        }

                                        listHtml += "</ul>";
                                    } else {
                                        listHtml += "<div class='empty'>노선정보가 없습니다.</div>";
                                    }
                                } else {
                                    listHtml += "<div class='empty'>노선정보가 없습니다.</div>";
                                }

                                if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
                                    $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
                                }

                                if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
                                    $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
                                }

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
                } else {
                    if (globalFileUrl.indexOf("/JWN/") > -1) {
                        var listCnt = 0;
                		
                		$("#mContList .mListInfoArea .mInfoMain .routeList>li").each(function() {
                			$(this).find(".stationList").html("");
                			
                			$(this).css("display","block");
                            listCnt++;
                		});
                		
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
                    } else {
                        openLayer("alert","노선번호를 입력해주세요.","");
                    }
                }
            } else if (type == "mStation") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                	$(".preloader").addClass("opacity");
                	$(".preloader").css("display","block");
                    
                    clearTimeout(gpsTimer);
                	
                	//검색한 정류장정보 가져오기
                	$.ajax({
                		dataType: "xml",
                		type: "GET",
                		url: "http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getSttnNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeNm=&nodeNo=&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                		success: function(result) {
                			//console.log(result);
                			var resultXml = $(result).find("response").find("body").find("items").find("item");

                            var listCnt = (resultXml.length > 0) ? resultXml.length : 0;
                	        
                            gpsSearchArr = [];
                            gpsSearchKeyword = keyword;
                            
                	        if (listCnt > 0) {
                                listCnt = 0;
                                
                                $(resultXml).each(function() {
                                    var stationId = $(this).find("nodeid").text().replace(globalCityName, "");
                                    
                                    if (stationId.replace(/\s/gi, "") == keyword.replace(/\s/gi, "") || $(this).find("nodenm").text().replace(/\s/gi, "").indexOf(keyword.replace(/\s/gi, "")) > -1) {
                                        var resultXmlJson = {stationId:stationId,stationNm:$(this).find("nodenm").text(),localX:$(this).find("gpslong").text(),localY:$(this).find("gpslati").text()};

                                        resultJson[listCnt] = resultXmlJson;

                                        listCnt++;
                                        
                                        gpsSearchArr.push(stationId);
                                    }
                                });
                                
                                if (listCnt > 0) {
                                    listHtml += "<ul class='stationList cf'>";
                                    
                                    for (var row in resultJson) {
                                        listHtml += "	 <li>";
                                        listHtml += "    	 <a href='javascript:void(0);' data-station-id='" + resultJson[row].stationId + "' class='listTit' onclick='setMSIBL(this);'>";
                                        listHtml += "	         <div class='tit'>" + resultJson[row].stationNm + "</div>";
                                        listHtml += "            <div class='con'>" + resultJson[row].stationId + "</div>";
                                        listHtml += "        </a>";
                                        listHtml += "        <div class='routeTable'></div>";
                                        listHtml += "    </li>";
                                        
                                        resultArr.push(resultJson[row]);
                                    }
                                    
                                    listHtml += "</ul>";
                                } else {
                                    listHtml += "<div class='empty'>정류장정보가 없습니다.</div>";
                                }
                	        } else {
                	        	listHtml += "<div class='empty'>정류장정보가 없습니다.</div>";
                	        }
                	        
                	        if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
            	            }
            	            
            	            if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
            	            }
                	        
            	            removeMarker();
                            removeLowBusMarker();
            	            removePolyline();
            	            stationMarker("Y","N","N",resultArr);
                            
                            if (globalFileUrl.indexOf("/JWN/") > -1 && $(".mGpsBtn").hasClass("on")) {
                                setGpsPosition2("station","start");
                            } else {
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
                    if (globalFileUrl.indexOf("/JWN/") > -1) {
                        $(".preloader").addClass("opacity");
                        $(".preloader").css("display","block");
                        
                        clearTimeout(gpsTimer);
                        
                        var listCnt = 0;
                        
                        gpsSearchArr = [];
                        gpsSearchKeyword = "";

                        listHtml += "<div class='empty'>정류장을 검색해주세요.</div>";

                        if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
                            $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
                        }

                        if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
                            $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
                        }

                        removeMarker();
                        removeLowBusMarker();
                        removePolyline();

                        if ($(".mGpsBtn").hasClass("on")) {
                            setGpsPosition2("station","start");
                        } else {
                            $(".preloader").fadeOut(400);
                        }
                    } else {
                        openLayer("alert","정류장명 또는 정류장번호를 입력해주세요.","");
                    }
                }
            } else if (type == "mStart") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                	$(".preloader").addClass("opacity");
                	$(".preloader").css("display","block");
                	
                	//검색한 정류장정보 가져오기
                	$.ajax({
                		dataType: "xml",
                		type: "GET",
                		url: "http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getSttnNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeNm=&nodeNo=&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                		success: function(result) {
                			//console.log(result);
                            var resultXml = $(result).find("response").find("body").find("items").find("item");

                            var listCnt = (resultXml.length > 0) ? resultXml.length : 0;
                	        
                	        if (listCnt > 0) {
                                listCnt = 0;
                                
                                $(resultXml).each(function() {
                                    var stationId = $(this).find("nodeid").text().replace(globalCityName, "");
                                    
                                    if (stationId.replace(/\s/gi, "") == keyword.replace(/\s/gi, "") || $(this).find("nodenm").text().replace(/\s/gi, "").indexOf(keyword.replace(/\s/gi, "")) > -1) {
                                        var resultXmlJson = {stationId:stationId,stationNm:$(this).find("nodenm").text(),localX:$(this).find("gpslong").text(),localY:$(this).find("gpslati").text()};

                                        resultJson[listCnt] = resultXmlJson;

                                        listCnt++;
                                    }
                                });
                                
                                if (listCnt > 0) {
                                    listHtml += "<ul class='stationList cf'>";

                                    for (var row in resultJson) {
                                        listHtml += "	 <li>";
                                        listHtml += "    	 <a href='javascript:void(0);' data-station-id='" + resultJson[row].stationId + "' data-station-name='" + resultJson[row].stationNm + "' data-station-latitude='" + resultJson[row].localY + "' data-station-longitude='" + resultJson[row].localX + "' class='listTit' onclick='setCourseInput(\"" + type + "\",this);'>";
                                        listHtml += "	         <div class='tit'>" + resultJson[row].stationNm + "</div>";
                                        listHtml += "            <div class='con'>" + resultJson[row].stationId + "</div>";
                                        listHtml += "        </a>";
                                        listHtml += "    </li>";
                                        
                                        resultArr.push(resultJson[row]);
                                    }    	        

                                    listHtml += "</ul>";
                                } else {
                                    listHtml += "<div class='empty'>정류장정보가 없습니다.</div>";
                                }
                	        } else {
                	        	listHtml += "<div class='empty'>정류장정보가 없습니다.</div>";
                	        }
                	        
                	        if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
            	            }
            	            
            	            if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
            	            }
            	            
            	            $(formObj).find("input[name='flag']").val("N");
        	                $(formObj).find("input[name='latitude']").val("");
        	                $(formObj).find("input[name='longitude']").val("");
        	                $(formObj).find("input[name='keyword']").removeClass("selected");
                	        
        	                removeMarker();
                            removeLowBusMarker();
        	                removePolyline();
            	            stationMarker("Y","Y","N",resultArr);
            	            
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
                } else {
                    openLayer("alert","출발지를 입력해주세요.","");
                }
            } else if (type == "mArrival") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                	$(".preloader").addClass("opacity");
                	$(".preloader").css("display","block");
                	
                	//검색한 정류장정보 가져오기
                	$.ajax({
                		dataType: "xml",
                		type: "GET",
                		url: "http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getSttnNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeNm=&nodeNo=&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                		success: function(result) {
                			//console.log(result);
                            var resultXml = $(result).find("response").find("body").find("items").find("item");

                            var listCnt = (resultXml.length > 0) ? resultXml.length : 0;
                	        
                	        if (listCnt > 0) {
                                listCnt = 0;
                                
                                $(resultXml).each(function() {
                                    var stationId = $(this).find("nodeid").text().replace(globalCityName, "");
                                    
                                    if (stationId.replace(/\s/gi, "") == keyword.replace(/\s/gi, "") || $(this).find("nodenm").text().replace(/\s/gi, "").indexOf(keyword.replace(/\s/gi, "")) > -1) {
                                        var resultXmlJson = {stationId:stationId,stationNm:$(this).find("nodenm").text(),localX:$(this).find("gpslong").text(),localY:$(this).find("gpslati").text()};

                                        resultJson[listCnt] = resultXmlJson;

                                        listCnt++;
                                    }
                                });
                                
                                if (listCnt > 0) {
                                    listHtml += "<ul class='stationList cf'>";

                                    for (var row in resultJson) {
                                        listHtml += "	 <li>";
                                        listHtml += "    	 <a href='javascript:void(0);' data-station-id='" + resultJson[row].stationId + "' data-station-name='" + resultJson[row].stationNm + "' data-station-latitude='" + resultJson[row].localY + "' data-station-longitude='" + resultJson[row].localX + "' class='listTit' onclick='setCourseInput(\"" + type + "\",this);'>";
                                        listHtml += "	         <div class='tit'>" + resultJson[row].stationNm + "</div>";
                                        listHtml += "            <div class='con'>" + resultJson[row].stationId + "</div>";
                                        listHtml += "        </a>";
                                        listHtml += "    </li>";
                                        
                                        resultArr.push(resultJson[row]);
                                    }    	        

                                    listHtml += "</ul>";
                                } else {
                                    listHtml += "<div class='empty'>정류장정보가 없습니다.</div>";
                                }
                	        } else {
                	        	listHtml += "<div class='empty'>정류장정보가 없습니다.</div>";
                	        }
                	        
                	        if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
            	            }
            	            
            	            if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
            	            }
            	            
            	            $(formObj).find("input[name='flag']").val("N");
        	                $(formObj).find("input[name='latitude']").val("");
        	                $(formObj).find("input[name='longitude']").val("");
        	                $(formObj).find("input[name='keyword']").removeClass("selected");
                	        
        	                removeMarker();
                            removeLowBusMarker();
        	                removePolyline();
            	            stationMarker("Y","Y","N",resultArr);
            	            
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
                } else {
                    openLayer("alert","도착지를 입력해주세요.","");
                }
            } else if (type == "mRouteDetail") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                	$(".preloader").addClass("opacity");
                	$(".preloader").css("display","block");
                	
                	//검색한 노선정보 가져오기
                	$.ajax({
                		dataType: "xml",
                        type: "GET",
                        url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeNo=" + keyword + "&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                		success: function(result) {
                			//console.log(result);
                            var resultXml = $(result).find("response").find("body").find("items").find("item");

                            var listCnt = (resultXml.length > 0) ? resultXml.length : 0;
                	        
                	        if (listCnt > 0) {
                                listCnt = 0;
                                
                                $(resultXml).each(function() {
                                    var routeId = $(this).find("routeid").text().replace(globalCityName, "");

                                    var resultXmlJson = {routeId:routeId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),startStationNm:$(this).find("startnodenm").text(),endStationNm:$(this).find("endnodenm").text()};

                                    resultJson[listCnt] = resultXmlJson;

                                    listCnt++;
                                });
                                
                                if (listCnt > 0) {
                                    listHtml += "<ul class='routeList cf'>";

                                    for (var row in resultJson) {
                                        listHtml += "	 <li>";
                                        listHtml += "    	 <a href='javascript:void(0);' class='listTit' data-route-id='" + resultJson[row].routeId + "' data-route-num='" + resultJson[row].routeNm + "' onclick='openRouteDetailLayer(this);'>";
                                        listHtml += "	         <div class='tit'>" + resultJson[row].routeNm + "</div>";
                                        listHtml += "            <div class='con'>" + resultJson[row].startStationNm + "<i class='fas fa-arrows-alt-h'></i>" + resultJson[row].endStationNm + "</div>";
                                        listHtml += "        </a>";
                                        listHtml += "    </li>";
                                    }    	        

                                    listHtml += "</ul>";
                                } else {
                                    listHtml += "<div class='empty'>노선정보가 없습니다.</div>";
                                }
                	        } else {
                	        	listHtml += "<div class='empty'>노선정보가 없습니다.</div>";
                	        }
                	        
                	        if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
            	            }
            	            
            	            if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
            	            }
            	            
            	            if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
            	            }
            	            
            	            if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
            	            }
            	            
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
                } else {
                    openLayer("alert","노선번호를 입력해주세요.","");
                }
            } else if (type == "mBus") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                	$(".preloader").addClass("opacity");
                	$(".preloader").css("display","block");
                	
                	//검색한 노선정보 가져오기
                	$.ajax({
                		dataType: "xml",
                        type: "GET",
                        url: "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeNo=" + keyword + "&numOfRows=" + globalNumOfRows + "&pageNo=" + globalPageNo,
                		success: function(result) {
                			//console.log(result);
                            var resultXml = $(result).find("response").find("body").find("items").find("item");

                            var listCnt = (resultXml.length > 0) ? resultXml.length : 0;
                	        
                	        if (listCnt > 0) {
                                listCnt = 0;
                                
                                $(resultXml).each(function() {
                                    var routeId = $(this).find("routeid").text().replace(globalCityName, "");

                                    var resultXmlJson = {routeId:routeId,routeNm:$(this).find("routeno").text(),routeTp:$(this).find("routetp").text(),startStationNm:$(this).find("startnodenm").text(),endStationNm:$(this).find("endnodenm").text()};

                                    resultJson[listCnt] = resultXmlJson;

                                    listCnt++;
                                });
                                
                                if (listCnt > 0) {
                                    listHtml += "<ul class='routeList cf'>";

                                    for (var row in resultJson) {
                                        listHtml += "	 <li>";
                                        listHtml += "    	 <a href='javascript:void(0);' class='listTit' data-route-id='" + resultJson[row].routeId + "' data-route-num='" + resultJson[row].routeNm + "' onclick='openBusLayer(this);'>";
                                        listHtml += "	         <div class='tit'>" + resultJson[row].routeNm + "</div>";
                                        listHtml += "            <div class='con'>" + resultJson[row].startStationNm + "<i class='fas fa-arrows-alt-h'></i>" + resultJson[row].endStationNm + "</div>";
                                        listHtml += "        </a>";
                                        listHtml += "    </li>";
                                    }    	        

                                    listHtml += "</ul>";
                                } else {
                                    listHtml += "<div class='empty'>버스노선정보가 없습니다.</div>";
                                }
                	        } else {
                	        	listHtml += "<div class='empty'>버스노선정보가 없습니다.</div>";
                	        }
                	        
                	        if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
            	            }
            	            
            	            if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
            	            }
            	            
            	            if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
            	            }
            	            
            	            if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
            	                $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
            	            }
            	            
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
                } else {
                    openLayer("alert","노선번호를 입력해주세요.","");
                }
            }
        }
    }
}

//레이어 팝업 열기
function openLayer(type, msg, fun) {
    $("#" + type + "Layer .layerBox .layerContent").html(msg);
    
    $("#" + type + "Layer .layerBox .layerBtnArea .confirmBtn").removeAttr("onclick");
    $("#" + type + "Layer .layerBox .layerBtnArea .confirmBtn").attr("onclick","closeLayer(this);" + fun);
    
    $("#" + type + "Layer").addClass("on");
}

//레이어 팝업 닫기
function closeLayer(obj) {
    $(obj).closest(".layerWrap").removeClass("on");
}

//파라미터 가져오기
function getURLParams(url) {
    var result = {};
    
    url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { 
        result[k] = decodeURIComponent(v); 
    });
    
    return result;
}

//해당 파라미터의 값 가져오기
function getURLParamValue(url, key) {
    var result = "";
    var paramArr = getURLParams(url);
    
    for (var i in paramArr) {
        if (i == key) {
            result = paramArr[i];
        }
    }
    
    return result;
}

