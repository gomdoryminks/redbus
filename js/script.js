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
});

//관리자 탭 클릭시 실행
function setListBtnTab(obj) {
    var dataType = $(obj).attr("data-type");
    var listHtml = "";
    
    if (dataType == "route") {
        listHtml += "<div id='routeInfo' class='listInfo'>";
        listHtml += "    <div class='infoTop cf'>";
        listHtml += "        <div class='infoSearch'>";
        listHtml += "            <form id='' name='' method='' class='cf'>";
        listHtml += "                <input type='hidden' name='type' value='route'>";
        listHtml += "                <input type='text' name='keyword' placeholder='노선번호를 입력해주세요.'>";
        listHtml += "                <input type='button' value='검색' onclick='setInfoSearch(this);'>";
        listHtml += "            </form>";
        listHtml += "        </div>";
        listHtml += "        <div class='infoTitle'>노선정보 (<span class='num'>5</span>)</div>";
        listHtml += "    </div>";
        listHtml += "    <div class='infoMain'>";
        listHtml += "        <div class='infoMainLeft'>";
        listHtml += "            <ul class='routeList cf'>";
        listHtml += "                <li>";
        listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='2-1' data-route-num='2-1' onclick='setRISL(this);'>";
        listHtml += "                        <div class='tit'>2-1</div>";
        listHtml += "                        <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>진흥.천천푸르지오아파트</div>";
        listHtml += "                    </a>";
        listHtml += "                </li>";
        listHtml += "                <li>";
        listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='2-2' data-route-num='2-2' onclick='setRISL(this);'>";
        listHtml += "                        <div class='tit'>2-2</div>";
        listHtml += "                        <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>화남아파트</div>";
        listHtml += "                    </a>";
        listHtml += "                </li>";
        listHtml += "                <li>";
        listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='3' data-route-num='3' onclick='setRISL(this);'>";
        listHtml += "                        <div class='tit'>3</div>";
        listHtml += "                        <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>구운동삼환아파트</div>";
        listHtml += "                    </a>";
        listHtml += "                </li>";
        listHtml += "                <li>";
        listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='4-1' data-route-num='4-1' onclick='setRISL(this);'>";
        listHtml += "                        <div class='tit'>4-1</div>";
        listHtml += "                        <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>조원뉴타운</div>";
        listHtml += "                    </a>";
        listHtml += "                </li>";
        listHtml += "                <li>";
        listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='5' data-route-num='5' onclick='setRISL(this);'>";
        listHtml += "                        <div class='tit'>5</div>";
        listHtml += "                        <div class='con'>이목동차고지.이목동입구<i class='fas fa-arrows-alt-h'></i>경희대학교</div>";
        listHtml += "                    </a>";
        listHtml += "                </li>";
        listHtml += "            </ul>";
        listHtml += "        </div>";
        listHtml += "        <div class='infoMainRight'>";
        listHtml += "            <div class='stationList'>";
        listHtml += "                <div class='empty'>노선을 선택해주세요.</div>";
        listHtml += "            </div>";
        listHtml += "        </div>";
        listHtml += "    </div>";
        listHtml += "</div>";
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
    }
    
    $("#contList").addClass("on");
    $("#contList .listBtnArea .listBtnTab .listBtn").removeClass("on");
    $(obj).addClass("on");
    
    if ($("#contList .listInfoArea").length > 0) {
        $("#contList .listInfoArea").html(listHtml);
    }
    
    removeMarker();
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

//관리자 노선정보에서 노선 클릭시 실행
function setRISL(obj) {
    var listWidth = "700px";
    var listHtml = "";
    
    listHtml += "<div class='stationList'>";
    listHtml += "    <ul class='right cf'>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"02960\",\"Y\")'>";
    listHtml += "                    <p class='name'>수원남부버스공영차고지</p>";
    listHtml += "                    <p class='num'>02960</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/next.png' alt='next'></div>";
    listHtml += "        </li>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04078\",\"Y\")'>";
    listHtml += "                    <p class='name'>영통아이파크캐슬2단지.래미안영통마크원1단지</p>";
    listHtml += "                    <p class='num'>04078</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/next.png' alt='next'></div>";
    listHtml += "        </li>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04206\",\"Y\")'>";
    listHtml += "                    <p class='name'>영통아이파크캐슬1단지.래미안영통마크원2단지</p>";
    listHtml += "                    <p class='num'>04206</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/next.png' alt='next'></div>";
    listHtml += "        </li>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04063\",\"Y\")'>";
    listHtml += "                    <p class='name'>방죽공원.영통힐스테이트.쌍용아파트</p>";
    listHtml += "                    <p class='num'>04063</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/next.png' alt='next'></div>";
    listHtml += "        </li>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04326\",\"Y\")'>";
    listHtml += "                    <p class='name'>망포역3번출구.망포그대가프리미어.골든스퀘어</p>";
    listHtml += "                    <p class='num'>04326</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/next.png' alt='next'></div>";
    listHtml += "        </li>";
    listHtml += "    </ul>";
    listHtml += "    <ul class='turn cf'>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"03155\",\"Y\")'>";
    listHtml += "                    <p class='name'>진흥.천천푸르지오아파트</p>";
    listHtml += "                    <p class='num'>03155</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/turn-down.png' alt='turn-down'></div>";
    listHtml += "        </li>";
    listHtml += "    </ul>";
    listHtml += "    <ul class='left cf'>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04217\",\"Y\")'>";
    listHtml += "                    <p class='name'>센트럴하이츠아파트</p>";
    listHtml += "                    <p class='num'>04217</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/prev.png' alt='prev'></div>";
    listHtml += "        </li>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04070\",\"Y\")'>";
    listHtml += "                    <p class='name'>청와.쌍용.그대가센트럴파크아파트</p>";
    listHtml += "                    <p class='num'>04070</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/prev.png' alt='prev'></div>";
    listHtml += "        </li>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04325\",\"Y\")'>";
    listHtml += "                    <p class='name'>망포역4번출구.영통2동행정복지센터</p>";
    listHtml += "                    <p class='num'>04325</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'>";
    listHtml += "                <img src='" + globalFilePath + "images/front-bus.png' alt='bus' class='busImg' onclick='markerPosition(\"bus\",\"0000\",\"Y\")'>";
    listHtml += "                <span class='busTit'>0000</span>";
    listHtml += "            </div>";
    listHtml += "        </li>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04064\",\"Y\")'>";
    listHtml += "                    <p class='name'>망포그대가프리미어.쌍용아파트</p>";
    listHtml += "                    <p class='num'>04064</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/prev.png' alt='prev'></div>";
    listHtml += "        </li>";
    listHtml += "        <li>";
    listHtml += "            <div class='tit'>";
    listHtml += "                <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04032\",\"Y\")'>";
    listHtml += "                    <p class='name'>래미안영통마크원2단지.영통아이파크캐슬1단지</p>";
    listHtml += "                    <p class='num'>04032</p>";
    listHtml += "                </a>";
    listHtml += "            </div>";
    listHtml += "            <div class='img'><img src='" + globalFilePath + "images/prev.png' alt='prev'></div>";
    listHtml += "        </li>";
    listHtml += "    </ul>";
    listHtml += "</div>";
    
    if ($(obj).parent("li").hasClass("on")) {
        $(obj).parent("li").removeClass("on");
    } else {
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
        routeMarker("Y","Y");
    }
}

//관리자 정류장정보에서 정류장 클릭시 실행
function setSIBL(obj) {
    var dataStationId = $(obj).attr("data-station-id");
    var listHtml = "";
    
    listHtml += "<div class='routeTable'>";
    listHtml += "    <table class='table'>";
    listHtml += "        <colgroup>";
    listHtml += "            <col width='150px'>";
    listHtml += "            <col width='*'>";
    listHtml += "            <col width='150px'>";
    listHtml += "            <col width='150px'>";
    listHtml += "        </colgroup>";
    listHtml += "        <thead>";
    listHtml += "            <tr>";
    listHtml += "                <th class='th00'>노선번호</th>";
    listHtml += "                <th class='th01'>버스이동방향</th>";
    listHtml += "                <th class='th02'>도착예정</th>";
    listHtml += "                <th class='th03'>현재위치</th>";
    listHtml += "            </tr>";
    listHtml += "        </thead>";
    listHtml += "        <tbody>";
    listHtml += "            <tr data-route-id='2-1' data-route-num='2-1' onclick='setBISL(this);'>";
    listHtml += "                <td class='th00'>2-1</td>";
    listHtml += "                <td class='th01'>영통아이파크캐슬2단지.래미안영통마크원1단지 방향</td>";
    listHtml += "                <td class='th02'>약1분후</td>";
    listHtml += "                <td class='th03'>1구간전</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr data-route-id='2-2' data-route-num='2-2' onclick='setBISL(this);'>";
    listHtml += "                <td class='th00'>2-2</td>";
    listHtml += "                <td class='th01'>영통아이파크캐슬1단지.래미안영통마크원2단지 방향</td>";
    listHtml += "                <td class='th02'>약2분후</td>";
    listHtml += "                <td class='th03'>2구간전</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr data-route-id='3' data-route-num='3' onclick='setBISL(this);'>";
    listHtml += "                <td class='th00'>3</td>";
    listHtml += "                <td class='th01'>방죽공원.영통힐스테이트.쌍용아파트 방향</td>";
    listHtml += "                <td class='th02'>약3분후</td>";
    listHtml += "                <td class='th03'>3구간전</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr data-route-id='4-1' data-route-num='4-1' onclick='setBISL(this);'>";
    listHtml += "                <td class='th00'>4-1</td>";
    listHtml += "                <td class='th01'>망포역3번출구.망포그대가프리미어.골든스퀘어 방향</td>";
    listHtml += "                <td class='th02'>약4분후</td>";
    listHtml += "                <td class='th03'>4구간전</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr data-route-id='5' data-route-num='5' onclick='setBISL(this);'>";
    listHtml += "                <td class='th00'>5</td>";
    listHtml += "                <td class='th01'>북수원시장입구 방향</td>";
    listHtml += "                <td class='th02'>약5분후</td>";
    listHtml += "                <td class='th03'>5구간전</td>";
    listHtml += "            </tr>";
    listHtml += "        </tbody>";
    listHtml += "    </table>";
    listHtml += "</div>";
    
    if ($(obj).parent("li").hasClass("on")) {
        $(obj).parent("li").removeClass("on");
    } else {
        $("#contList .listInfoArea .infoMain .infoMainLeft .stationList li").removeClass("on");
        $(obj).parent("li").addClass("on");
        
        if ($("#contList .listInfoArea .infoMain .infoMainRight").length > 0) {
            $("#contList .listInfoArea .infoMain .infoMainRight").html(listHtml);
        }
        
        markerPosition("station",dataStationId,"Y");
    }
}

//관리자 정류장정보에서 버스 클릭시 실행
function setBISL(obj) {
    var dataRouteId = $(obj).attr("data-route-id");
    var dataRouteNum = $(obj).attr("data-route-num");
    var listWidth = "700px";
    var listHtml = "";
    
    listHtml += "<div id='routeInfo' class='listInfo'>";
    listHtml += "    <div class='infoTop cf'>";
    listHtml += "        <div class='infoSearch'>";
    listHtml += "            <form id='' name='' method='' class='cf'>";
    listHtml += "                <input type='hidden' name='type' value='route'>";
    listHtml += "                <input type='text' name='keyword' value='" + dataRouteNum + "' placeholder='노선번호를 입력해주세요.'>";
    listHtml += "                <input type='button' value='검색' onclick='setInfoSearch(this);'>";
    listHtml += "            </form>";
    listHtml += "        </div>";
    listHtml += "        <div class='infoTitle'>노선정보 (<span class='num'>5</span>)</div>";
    listHtml += "    </div>";
    listHtml += "    <div class='infoMain'>";
    listHtml += "        <div class='infoMainLeft'>";
    listHtml += "            <ul class='routeList cf'>";
    listHtml += "                <li>";
    listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='2-1' data-route-num='2-1' onclick='setRISL(this);'>";
    listHtml += "                        <div class='tit'>2-1</div>";
    listHtml += "                        <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>진흥.천천푸르지오아파트</div>";
    listHtml += "                    </a>";
    listHtml += "                </li>";
    listHtml += "                <li>";
    listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='2-2' data-route-num='2-2' onclick='setRISL(this);'>";
    listHtml += "                        <div class='tit'>2-2</div>";
    listHtml += "                        <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>화남아파트</div>";
    listHtml += "                    </a>";
    listHtml += "                </li>";
    listHtml += "                <li>";
    listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='3' data-route-num='3' onclick='setRISL(this);'>";
    listHtml += "                        <div class='tit'>3</div>";
    listHtml += "                        <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>구운동삼환아파트</div>";
    listHtml += "                    </a>";
    listHtml += "                </li>";
    listHtml += "                <li>";
    listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='4-1' data-route-num='4-1' onclick='setRISL(this);'>";
    listHtml += "                        <div class='tit'>4-1</div>";
    listHtml += "                        <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>조원뉴타운</div>";
    listHtml += "                    </a>";
    listHtml += "                </li>";
    listHtml += "                <li>";
    listHtml += "                    <a href='javascript:void(0);' class='listTit' data-route-id='5' data-route-num='5' onclick='setRISL(this);'>";
    listHtml += "                        <div class='tit'>5</div>";
    listHtml += "                        <div class='con'>이목동차고지.이목동입구<i class='fas fa-arrows-alt-h'></i>경희대학교</div>";
    listHtml += "                    </a>";
    listHtml += "                </li>";
    listHtml += "            </ul>";
    listHtml += "        </div>";
    listHtml += "        <div class='infoMainRight'>";
    listHtml += "            <div class='stationList'>";
    listHtml += "                <div class='empty'>노선을 선택해주세요.</div>";
    listHtml += "            </div>";
    listHtml += "        </div>";
    listHtml += "    </div>";
    listHtml += "</div>";
    
    $("#contList").addClass("on");
    
    if ($("#contList .listBtnArea .listBtnTab .listBtn").length > 0) {
        $("#contList .listBtnArea .listBtnTab .listBtn").removeClass("on");
        $("#contList .listBtnArea .listBtnTab .listBtn[data-type='route']").addClass("on");
    }
    
    if ($("#contList .listInfoArea").length > 0) {
        $("#contList .listInfoArea").html(listHtml);
        setRISL($("#contList .listInfoArea .infoMain .infoMainLeft .routeList li .listTit[data-route-id='" + dataRouteId + "']"));
    }
    
    //검색할 때 엔터키 submit 막기
    $("input[name='keyword']").keydown(function(event) {
        if (event.keyCode == "13") {
            if (window.event) {
                event.preventDefault();
                return;
            }
        }
    });
}

//모바일 노선검색에서 노선 클릭시 실행
function setMRISL(obj) {
    var listHtml = "";
    
    listHtml += "<ul class='cf'>";        
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"02960\",\"Y\")'>";                    
    listHtml += "                <p class='name'>수원남부버스공영차고지</p>";                    
    listHtml += "                <p class='num'>02960</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down'></div>";        
    listHtml += "    </li>";        
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04078\",\"Y\")'>";                    
    listHtml += "                <p class='name'>영통아이파크캐슬2단지.래미안영통마크원1단지</p>";                    
    listHtml += "                <p class='num'>04078</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down'></div>";        
    listHtml += "    </li>";        
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04206\",\"Y\")'>";                    
    listHtml += "                <p class='name'>영통아이파크캐슬1단지.래미안영통마크원2단지</p>";                    
    listHtml += "                <p class='num'>04206</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down'></div>";       
    listHtml += "    </li>";        
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04063\",\"Y\")'>";                    
    listHtml += "                <p class='name'>방죽공원.영통힐스테이트.쌍용아파트</p>";                    
    listHtml += "                <p class='num'>04063</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down'></div>";       
    listHtml += "    </li>";        
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04326\",\"Y\")'>";                    
    listHtml += "                <p class='name'>망포역3번출구.망포그대가프리미어.골든스퀘어</p>";                    
    listHtml += "                <p class='num'>04326</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down'></div>";        
    listHtml += "    </li>"; 
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"03155\",\"Y\")'>";                    
    listHtml += "                <p class='name'>진흥.천천푸르지오아파트</p>";                    
    listHtml += "                <p class='num'>03155</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/turn-down.png' alt='turn-down'></div>";        
    listHtml += "    </li>"; 
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04217\",\"Y\")'>";                    
    listHtml += "                <p class='name'>센트럴하이츠아파트</p>";                    
    listHtml += "                <p class='num'>04217</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down'></div>";      
    listHtml += "    </li>";        
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04070\",\"Y\")'>";                    
    listHtml += "                <p class='name'>청와.쌍용.그대가센트럴파크아파트</p>";                    
    listHtml += "                <p class='num'>04070</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down'></div>";      
    listHtml += "    </li>";        
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04325\",\"Y\")'>";                    
    listHtml += "                <p class='name'>망포역4번출구.영통2동행정복지센터</p>";                    
    listHtml += "                <p class='num'>04325</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'>";                
    listHtml += "            <img src='" + globalFilePath + "images/front-bus.png' alt='bus' class='busImg' onclick='markerPosition(\"bus\",\"0000\",\"Y\")'>";             
    listHtml += "            <span class='busTit'>0000</span>";            
    listHtml += "        </div>";        
    listHtml += "    </li>";        
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04064\",\"Y\")'>";                    
    listHtml += "                <p class='name'>망포그대가프리미어.쌍용아파트</p>";                    
    listHtml += "                <p class='num'>04064</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down'></div>";      
    listHtml += "    </li>";        
    listHtml += "    <li>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);' onclick='markerPosition(\"station\",\"04032\",\"Y\")'>";                    
    listHtml += "                <p class='name'>래미안영통마크원2단지.영통아이파크캐슬1단지</p>";                    
    listHtml += "                <p class='num'>04032</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";            
    listHtml += "        <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down'></div>";      
    listHtml += "    </li>"; 
    listHtml += "</ul>";
    
    if ($(obj).parent("li").hasClass("on")) {
        $(obj).parent("li").removeClass("on");
        $(obj).next(".stationList").html("");
    } else {
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
        routeMarker("Y","Y");
    }
}

//모바일 정류장검색에서 정류장 클릭시 실행
function setMSIBL(obj) {
    var dataStationId = $(obj).attr("data-station-id");
    var listHtml = "";
    
    listHtml += "<ul class='cf'>";        
    listHtml += "    <li data-route-id='2-1' data-route-num='2-1' onclick='setMBISL(this);'>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);'>";                    
    listHtml += "                <p class='name'>2-1<span>영통아이파크캐슬2단지.래미안영통마크원1단지 방향</span></p>";                    
    listHtml += "                <p class='num'><span>도착예정</span>약1분후<span>현재위치</span>1구간전</p>";                
    listHtml += "            </a>";            
    listHtml += "        </div>";                   
    listHtml += "    </li>";        
    listHtml += "    <li data-route-id='2-2' data-route-num='2-2' onclick='setMBISL(this);'>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);'>";                    
    listHtml += "                <p class='name'>2-2<span>영통아이파크캐슬1단지.래미안영통마크원2단지 방향</span></p>";                    
    listHtml += "                <p class='num'><span>도착예정</span>약2분후<span>현재위치</span>2구간전</p>";              
    listHtml += "            </a>";            
    listHtml += "        </div>";                   
    listHtml += "    </li>";        
    listHtml += "    <li data-route-id='3' data-route-num='3' onclick='setMBISL(this);'>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);'>";                    
    listHtml += "                <p class='name'>3<span>방죽공원.영통힐스테이트.쌍용아파트 방향</span></p>";                    
    listHtml += "                <p class='num'><span>도착예정</span>약3분후<span>현재위치</span>3구간전</p>";             
    listHtml += "            </a>";            
    listHtml += "        </div>";                 
    listHtml += "    </li>";        
    listHtml += "    <li data-route-id='4-1' data-route-num='4-1' onclick='setMBISL(this);'>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);'>";                    
    listHtml += "                <p class='name'>4-1<span>망포역3번출구.망포그대가프리미어.골든스퀘어 방향</span></p>";                    
    listHtml += "                <p class='num'><span>도착예정</span>약4분후<span>현재위치</span>4구간전</p>";               
    listHtml += "            </a>";            
    listHtml += "        </div>";                 
    listHtml += "    </li>";        
    listHtml += "    <li data-route-id='5' data-route-num='5' onclick='setMBISL(this);'>";            
    listHtml += "        <div class='tit'>";                
    listHtml += "            <a href='javascript:void(0);'>";                    
    listHtml += "                <p class='name'>5<span>북수원시장입구 방향</span></p>";                    
    listHtml += "                <p class='num'><span>도착예정</span>약5분후<span>현재위치</span>5구간전</p>";            
    listHtml += "            </a>";            
    listHtml += "        </div>";                   
    listHtml += "    </li>"; 
    listHtml += "</ul>";
    
    if ($(obj).parent("li").hasClass("on")) {
        $(obj).parent("li").removeClass("on");
        $(obj).next(".routeTable").html("");
    } else {
        $("#mContList .mListInfoArea .mInfoMain>ul>li").removeClass("on");
        $(obj).parent("li").addClass("on");
        $("#mContList .mListInfoArea .mInfoMain>ul>li .routeTable").html("");
        $(obj).next(".routeTable").html(listHtml);
        
        markerPosition("station",dataStationId,"Y");
    }
}

//모바일 정류장검색에서 버스 클릭시 실행
function setMBISL(obj) {
    var dataRouteId = $(obj).attr("data-route-id");
	var dataRouteNum = $(obj).attr("data-route-num");
	var dataForm = $("<form></form>");
	
	dataForm.attr("name","dataForm");
	dataForm.attr("method","post");
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
    var listHtml = "";
    
    listHtml += "<div class='routeDetailTable'>";
    listHtml += "    <table class='table'>";
    listHtml += "		 <colgroup>";
    listHtml += "		 	 <col width='120px'>";
    listHtml += "		 	 <col width='*'>";
    listHtml += "		 </colgroup>";
    listHtml += "        <tbody>";
    listHtml += "            <tr>";
    listHtml += "                <th>노선명</th>";
    listHtml += "                <td><span class='big'>2-1</span></td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <th>노선종류</th>";
    listHtml += "                <td>일반형 시내버스</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <th>노선 정류장명</th>";
    listHtml += "                <td>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>진흥.천천푸르지오아파트</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <th>노선 상행시간</th>";
    listHtml += "                <td>05:00<span class='small'>(첫차)</span> ~ 22:30<span class='small'>(막차)</span></td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <th>노선 하행시간</th>";
    listHtml += "                <td>06:00<span class='small'>(첫차)</span> ~ 23:30<span class='small'>(막차)</span></td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <th>노선 배차간격</th>";
    listHtml += "                <td>13분<span class='small'>(기본)</span> / 11분<span class='small'>(출퇴근시)</span></td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <th>운수사명</th>";
    listHtml += "                <td>용남고속</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <th>운행지역</th>";
    listHtml += "                <td>수원,용인</td>";
    listHtml += "            </tr>";
    listHtml += "            <tr>";
    listHtml += "                <th>노선 연락처</th>";
    listHtml += "                <td>031-295-7105</td>";
    listHtml += "            </tr>";
    listHtml += "        </tbody>";
    listHtml += "    </table>";
    listHtml += "</div>";
    
    if ($("#routeDetailLayer .layerBox .layerContent").length > 0) {
        $("#routeDetailLayer .layerBox .layerContent").html(listHtml);
    }
    
    $("#routeDetailLayer").addClass("on");
}

//모바일 버스시간표에서 버스노선 클릭시 실행
function openBusLayer(obj) {
    var listHtml = "";
    
    listHtml += "<div class='busTopArea'>";
    listHtml += "    <div class='busTit'>2-1</div>";
    listHtml += "    <div class='busCon'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>진흥.천천푸르지오아파트</div>";
    listHtml += "</div>";
    listHtml += "<div class='busTable'>";
    listHtml += "    <table class='table'>";
    listHtml += "        <thead>";
    listHtml += "            <tr>";
    listHtml += "                <th>순서</th>";
    listHtml += "                <th>수원남부버스공영차고지</th>";
    listHtml += "                <th>영통아이파크캐슬2단지.래미안영통마크원1단지</th>";
    listHtml += "                <th>영통아이파크캐슬1단지.래미안영통마크원2단지</th>";
    listHtml += "                <th>방죽공원.영통힐스테이트.쌍용아파트</th>";
    listHtml += "                <th>망포역3번출구.망포그대가프리미어.골든스퀘어</th>";
    listHtml += "                <th>진흥.천천푸르지오아파트</th>";
    listHtml += "                <th>센트럴하이츠아파트</th>";
    listHtml += "                <th>청와.쌍용.그대가센트럴파크아파트</th>";
    listHtml += "                <th>망포역4번출구.영통2동행정복지센터</th>";
    listHtml += "                <th>망포그대가프리미어.쌍용아파트</th>";
    listHtml += "                <th>래미안영통마크원2단지.영통아이파크캐슬1단지</th>";
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
    
    if (dataRouteId != "" && dataRouteId != undefined) {
        listHtml += "<ul class='stationList cf'>";
        listHtml += "    <li>";
        listHtml += "        <a href='javascript:void(0);' class='listTit'>";
        listHtml += "            <div class='txt'>";
        listHtml += "                <div class='tit'>수원남부버스공영차고지</div>";
        listHtml += "                <div class='con'>02960</div>";
        listHtml += "            </div>";
        listHtml += "            <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down' class='pointer' data-station-id='02960' onclick='setNoticeCheck(this);'></div>";
        listHtml += "        </a>";
        listHtml += "    </li>";
        listHtml += "    <li>";
        listHtml += "        <a href='javascript:void(0);' class='listTit'>";
        listHtml += "            <div class='txt'>";
        listHtml += "                <div class='tit'>영통아이파크캐슬2단지.래미안영통마크원1단지</div>";
        listHtml += "                <div class='con'>04078</div>";
        listHtml += "            </div>";
        listHtml += "            <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down' class='pointer' data-station-id='04078' onclick='setNoticeCheck(this);'></div>";
        listHtml += "        </a>";
        listHtml += "    </li>";
        listHtml += "    <li>";                    
        listHtml += "        <a href='javascript:void(0);' class='listTit'>";    
        listHtml += "            <div class='txt'>";
        listHtml += "                <div class='tit'>영통아이파크캐슬1단지.래미안영통마크원2단지</div>";                        
        listHtml += "                <div class='con'>04206</div>";
        listHtml += "            </div>";
        listHtml += "            <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down' class='pointer' data-station-id='04206' onclick='setNoticeCheck(this);'></div>";
        listHtml += "        </a>";
        listHtml += "    </li>";
        listHtml += "    <li>";                    
        listHtml += "        <a href='javascript:void(0);' class='listTit'>";    
        listHtml += "            <div class='txt'>";
        listHtml += "                <div class='tit'>방죽공원.영통힐스테이트.쌍용아파트</div>";                        
        listHtml += "                <div class='con'>04063</div>";  
        listHtml += "            </div>";
        listHtml += "            <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down' class='pointer' data-station-id='04063' onclick='setNoticeCheck(this);'></div>";
        listHtml += "        </a>";
        listHtml += "    </li>";
        listHtml += "    <li>";                    
        listHtml += "        <a href='javascript:void(0);' class='listTit'>";     
        listHtml += "            <div class='txt'>";
        listHtml += "                <div class='tit'>이목동차고지.이목동입구</div>";                        
        listHtml += "                <div class='con'>01070</div>"; 
        listHtml += "            </div>";
        listHtml += "            <div class='img'><img src='" + globalFilePath + "images/down.png' alt='down' class='pointer' data-station-id='01070' onclick='setNoticeCheck(this);'></div>";
        listHtml += "        </a>";
        listHtml += "    </li>";            
        listHtml += "</ul>";

        //$("#mContList .mListInfoArea .mInfoTop .mInfoPointArea .mInfoPoint").removeClass("on");

        if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
            $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
        }

        removeMarker();
        removePolyline();
        routeMarker("N","N");
    } else {
        listHtml += "<div class='empty'>버스노선을 선택해주세요.</div>";
    	
    	if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
	        $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
	    }
	    
	    removeMarker();
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
    
    if (formObj.length > 0) {
        var type = $(formObj).find("input[name='type']").val();
        var keyword = $(formObj).find("input[name='keyword']").val();
        
        if (type != "" && type != undefined && type != null) {
            if (type == "route") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    listCnt = "0";
                    
                    listLeftHtml += "<div class='empty'>노선정보가 없습니다.</div>";
                    
                    listRightHtml += "<div class='stationList'>";
                    listRightHtml += "    <div class='empty'>노선을 선택해주세요.</div>";
                    listRightHtml += "</div>";
                } else {
                    openLayer("alert","노선번호를 입력해주세요.","");
                }
            } else if (type == "station") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    listCnt = "5";
                    
                    listLeftHtml += "<ul class='stationList cf'>";
                    listLeftHtml += "    <li>";
                    listLeftHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='02960' onclick='setSIBL(this);'>";
                    listLeftHtml += "            <div class='tit'>수원남부버스공영차고지</div>";
                    listLeftHtml += "            <div class='con'>02960</div>";
                    listLeftHtml += "        </a>";
                    listLeftHtml += "    </li>";
                    listLeftHtml += "    <li>";
                    listLeftHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04078' onclick='setSIBL(this);'>";
                    listLeftHtml += "            <div class='tit'>영통아이파크캐슬2단지.래미안영통마크원1단지</div>";
                    listLeftHtml += "            <div class='con'>04078</div>";
                    listLeftHtml += "        </a>";
                    listLeftHtml += "    </li>";
                    listLeftHtml += "    <li>";
                    listLeftHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04206' onclick='setSIBL(this);'>";
                    listLeftHtml += "            <div class='tit'>영통아이파크캐슬1단지.래미안영통마크원2단지</div>";
                    listLeftHtml += "            <div class='con'>04206</div>";
                    listLeftHtml += "        </a>";
                    listLeftHtml += "    </li>";
                    listLeftHtml += "    <li>";
                    listLeftHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04063' onclick='setSIBL(this);'>";
                    listLeftHtml += "            <div class='tit'>방죽공원.영통힐스테이트.쌍용아파트</div>";
                    listLeftHtml += "            <div class='con'>04063</div>";
                    listLeftHtml += "        </a>";
                    listLeftHtml += "    </li>";
                    listLeftHtml += "    <li>";
                    listLeftHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='01070' onclick='setSIBL(this);'>";
                    listLeftHtml += "            <div class='tit'>이목동차고지.이목동입구</div>";
                    listLeftHtml += "            <div class='con'>01070</div>";
                    listLeftHtml += "        </a>";
                    listLeftHtml += "    </li>";
                    listLeftHtml += "</ul>";
                    
                    listRightHtml += "<div class='routeTable'>";
                    listRightHtml += "    <div class='empty'>정류장을 선택해주세요.</div>";
                    listRightHtml += "</div>";
                } else {
                    openLayer("alert","정류장명 또는 정류장번호를 입력해주세요.","");
                }
            } else if (type == "mRoute") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    listCnt = "0";
                    
                    listHtml += "<div class='empty'>노선정보가 없습니다.</div>";
                } else {
                    openLayer("alert","노선번호를 입력해주세요.","");
                }
            } else if (type == "mStation") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    listCnt = "5";
                    
                    listHtml += "<ul class='stationList cf'>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='02960' onclick='setMSIBL(this);'>";
                    listHtml += "            <div class='tit'>수원남부버스공영차고지</div>";
                    listHtml += "            <div class='con'>02960</div>";                    
                    listHtml += "        </a>";
                    listHtml += "        <div class='routeTable'></div>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04078' onclick='setMSIBL(this);'>";
                    listHtml += "            <div class='tit'>영통아이파크캐슬2단지.래미안영통마크원1단지</div>";
                    listHtml += "            <div class='con'>04078</div>";
                    listHtml += "        </a>";
                    listHtml += "        <div class='routeTable'></div>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04206' onclick='setMSIBL(this);'>";                        
                    listHtml += "            <div class='tit'>영통아이파크캐슬1단지.래미안영통마크원2단지</div>";                        
                    listHtml += "            <div class='con'>04206</div>";                    
                    listHtml += "        </a>";
                    listHtml += "        <div class='routeTable'></div>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04063' onclick='setMSIBL(this);'>";                        
                    listHtml += "            <div class='tit'>방죽공원.영통힐스테이트.쌍용아파트</div>";                        
                    listHtml += "            <div class='con'>04063</div>";                    
                    listHtml += "        </a>";
                    listHtml += "        <div class='routeTable'></div>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='01070' onclick='setMSIBL(this);'>";                        
                    listHtml += "            <div class='tit'>이목동차고지.이목동입구</div>";                        
                    listHtml += "            <div class='con'>01070</div>";                    
                    listHtml += "        </a>";
                    listHtml += "        <div class='routeTable'></div>";
                    listHtml += "    </li>";            
                    listHtml += "</ul>";
                } else {
                    openLayer("alert","정류장명 또는 정류장번호를 입력해주세요.","");
                }
            } else if (type == "mStart") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    listCnt = "5";
                    
                    listHtml += "<ul class='stationList cf'>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='02960' data-station-name='수원남부버스공영차고지' data-station-latitude='37.2437383' data-station-longitude='127.0358353' onclick='setCourseInput(\"" + type + "\",this);'>";
                    listHtml += "            <div class='tit'>수원남부버스공영차고지</div>";
                    listHtml += "            <div class='con'>02960</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04078' data-station-name='영통아이파크캐슬2단지.래미안영통마크원1단지' data-station-latitude='37.244651' data-station-longitude='127.0390243' onclick='setCourseInput(\"" + type + "\",this);'>";
                    listHtml += "            <div class='tit'>영통아이파크캐슬2단지.래미안영통마크원1단지</div>";
                    listHtml += "            <div class='con'>04078</div>";
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04206' data-station-name='영통아이파크캐슬1단지.래미안영통마크원2단지' data-station-latitude='37.245036' data-station-longitude='127.0442383' onclick='setCourseInput(\"" + type + "\",this);'>";                  
                    listHtml += "            <div class='tit'>영통아이파크캐슬1단지.래미안영통마크원2단지</div>";                        
                    listHtml += "            <div class='con'>04206</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04063' data-station-name='방죽공원.영통힐스테이트.쌍용아파트' data-station-latitude='37.2454097' data-station-longitude='127.0514984' onclick='setCourseInput(\"" + type + "\",this);'>";                      
                    listHtml += "            <div class='tit'>방죽공원.영통힐스테이트.쌍용아파트</div>";                        
                    listHtml += "            <div class='con'>04063</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='01070' data-station-name='이목동차고지.이목동입구' data-station-latitude='37.3216612' data-station-longitude='126.9868473' onclick='setCourseInput(\"" + type + "\",this);'>";                        
                    listHtml += "            <div class='tit'>이목동차고지.이목동입구</div>";                        
                    listHtml += "            <div class='con'>01070</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";            
                    listHtml += "</ul>";
                } else {
                    openLayer("alert","출발지를 입력해주세요.","");
                }
            } else if (type == "mArrival") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    listCnt = "5";
                    
                    listHtml += "<ul class='stationList cf'>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='02960' data-station-name='수원남부버스공영차고지' data-station-latitude='37.2437383' data-station-longitude='127.0358353' onclick='setCourseInput(\"" + type + "\",this);'>";
                    listHtml += "            <div class='tit'>수원남부버스공영차고지</div>";
                    listHtml += "            <div class='con'>02960</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04078' data-station-name='영통아이파크캐슬2단지.래미안영통마크원1단지' data-station-latitude='37.244651' data-station-longitude='127.0390243' onclick='setCourseInput(\"" + type + "\",this);'>";
                    listHtml += "            <div class='tit'>영통아이파크캐슬2단지.래미안영통마크원1단지</div>";
                    listHtml += "            <div class='con'>04078</div>";
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04206' data-station-name='영통아이파크캐슬1단지.래미안영통마크원2단지' data-station-latitude='37.245036' data-station-longitude='127.0442383' onclick='setCourseInput(\"" + type + "\",this);'>";             
                    listHtml += "            <div class='tit'>영통아이파크캐슬1단지.래미안영통마크원2단지</div>";                        
                    listHtml += "            <div class='con'>04206</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='04063' data-station-name='방죽공원.영통힐스테이트.쌍용아파트' data-station-latitude='37.2454097' data-station-longitude='127.0514984' onclick='setCourseInput(\"" + type + "\",this);'>";                       
                    listHtml += "            <div class='tit'>방죽공원.영통힐스테이트.쌍용아파트</div>";                        
                    listHtml += "            <div class='con'>04063</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-station-id='01070' data-station-name='이목동차고지.이목동입구' data-station-latitude='37.3216612' data-station-longitude='126.9868473' onclick='setCourseInput(\"" + type + "\",this);'>";                        
                    listHtml += "            <div class='tit'>이목동차고지.이목동입구</div>";                        
                    listHtml += "            <div class='con'>01070</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";            
                    listHtml += "</ul>";
                } else {
                    openLayer("alert","도착지를 입력해주세요.","");
                }
            } else if (type == "mRouteDetail") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    listCnt = "5";
                    
                    listHtml += "<ul class='routeList cf'>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='2-1' data-route-num='2-1' onclick='openRouteDetailLayer(this);'>";
                    listHtml += "            <div class='tit'>2-1</div>";
                    listHtml += "            <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>진흥.천천푸르지오아파트</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='2-2' data-route-num='2-2' onclick='openRouteDetailLayer(this);'>";
                    listHtml += "            <div class='tit'>2-2</div>";
                    listHtml += "            <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>화남아파트</div>";
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='3' data-route-num='3' onclick='openRouteDetailLayer(this);'>"; 
                    listHtml += "            <div class='tit'>3</div>";                        
                    listHtml += "            <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>구운동삼환아파트</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='4-1' data-route-num='4-1' onclick='openRouteDetailLayer(this);'>";     
                    listHtml += "            <div class='tit'>4-1</div>";                        
                    listHtml += "            <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>조원뉴타운</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='5' data-route-num='5' onclick='openRouteDetailLayer(this);'>"; 
                    listHtml += "            <div class='tit'>5</div>";                        
                    listHtml += "            <div class='con'>이목동차고지.이목동입구<i class='fas fa-arrows-alt-h'></i>경희대학교</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";            
                    listHtml += "</ul>";
                } else {
                    openLayer("alert","노선번호를 입력해주세요.","");
                }
            } else if (type == "mBus") {
                if (keyword != "" && keyword != undefined && keyword != null) {
                    listCnt = "5";
                    
                    listHtml += "<ul class='routeList cf'>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='2-1' data-route-num='2-1' onclick='openBusLayer(this);'>";
                    listHtml += "            <div class='tit'>2-1</div>";
                    listHtml += "            <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>진흥.천천푸르지오아파트</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='2-2' data-route-num='2-2' onclick='openBusLayer(this);'>";
                    listHtml += "            <div class='tit'>2-2</div>";
                    listHtml += "            <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>화남아파트</div>";
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='3' data-route-num='3' onclick='openBusLayer(this);'>";         
                    listHtml += "            <div class='tit'>3</div>";                        
                    listHtml += "            <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>구운동삼환아파트</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='4-1' data-route-num='4-1' onclick='openBusLayer(this);'>";     
                    listHtml += "            <div class='tit'>4-1</div>";                        
                    listHtml += "            <div class='con'>수원남부버스공영차고지<i class='fas fa-arrows-alt-h'></i>조원뉴타운</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";
                    listHtml += "    <li>";                    
                    listHtml += "        <a href='javascript:void(0);' class='listTit' data-route-id='5' data-route-num='5' onclick='openBusLayer(this);'>";         
                    listHtml += "            <div class='tit'>5</div>";                        
                    listHtml += "            <div class='con'>이목동차고지.이목동입구<i class='fas fa-arrows-alt-h'></i>경희대학교</div>";                    
                    listHtml += "        </a>";
                    listHtml += "    </li>";            
                    listHtml += "</ul>";
                } else {
                    openLayer("alert","노선번호를 입력해주세요.","");
                }
            }
        }
    }
    
    if (listLeftHtml != "") {
        if ($("#contList .listInfoArea .infoTop .infoTitle .num").length > 0) {
            $("#contList .listInfoArea .infoTop .infoTitle .num").text(listCnt);
        }
        
        if ($("#contList .listInfoArea .infoMain .infoMainLeft").length > 0) {
            $("#contList .listInfoArea .infoMain .infoMainLeft").html(listLeftHtml);
        }
        
        if ($("#contList .listInfoArea .infoMain .infoMainRight").length > 0) {
            $("#contList .listInfoArea .infoMain .infoMainRight").html(listRightHtml);
        }
    }
    
    if (listHtml != "") {
        if ($("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").length > 0) {
            $("#mContList .mListInfoArea .mInfoTop .mInfoTitle .num").text(listCnt);
        }
        
        if ($("#mContList .mListInfoArea .mInfoMain").length > 0) {
            $("#mContList .mListInfoArea .mInfoMain").html(listHtml);
        }
        
        if (type == "mStart" || type == "mArrival") {
            $(formObj).find("input[name='flag']").val("N");
            $(formObj).find("input[name='latitude']").val("");
            $(formObj).find("input[name='longitude']").val("");
            $(formObj).find("input[name='keyword']").removeClass("selected");
        }
    }
    
    if (type == "station" || type == "mStation") {
        removeMarker();
        removePolyline();
        stationMarker("Y","N","N");
    } else if (type == "mStart" || type == "mArrival") {
        removeMarker();
        removePolyline();
        stationMarker("Y","Y","N");
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

