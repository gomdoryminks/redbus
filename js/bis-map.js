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

//저상버스 json 데이터
var lowBusJson = [
 {
  "idx": 110,
  "routeNm": "316-2",
  "vehicleno": "제주79아3106",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 112,
  "routeNm": "316-2",
  "vehicleno": "제주79아3108",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 115,
  "routeNm": "315-2",
  "vehicleno": "제주79아3111",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 125,
  "routeNm": "315-2",
  "vehicleno": "제주79아3121",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 130,
  "routeNm": "316-1",
  "vehicleno": "제주79아3126",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 132,
  "routeNm": "315-1",
  "vehicleno": "제주79아3128",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 135,
  "routeNm": "316-1",
  "vehicleno": "제주79아3131",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 140,
  "routeNm": "316-1",
  "vehicleno": "제주79아3136",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 141,
  "routeNm": "315-1",
  "vehicleno": "제주79아3137",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 142,
  "routeNm": "316-1",
  "vehicleno": "제주79아3138",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 143,
  "routeNm": "315-1",
  "vehicleno": "제주79아3139",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 148,
  "routeNm": "315-1",
  "vehicleno": "제주79아3144",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 154,
  "routeNm": "315-1",
  "vehicleno": "제주79아3150",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 165,
  "routeNm": "316-2",
  "vehicleno": "제주79아3161",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주여객"
 },
 {
  "idx": 320,
  "routeNm": "325-12",
  "vehicleno": "제주79아3503",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 321,
  "routeNm": "325-12",
  "vehicleno": "제주79아3504",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 325,
  "routeNm": "431-1",
  "vehicleno": "제주79아3508",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 327,
  "routeNm": "325-11",
  "vehicleno": "제주79아3510",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 333,
  "routeNm": "325-11",
  "vehicleno": "제주79아3516",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 339,
  "routeNm": "326-2",
  "vehicleno": "제주79아3522",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 341,
  "routeNm": "326-1",
  "vehicleno": "제주79아3524",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 342,
  "routeNm": "325-11",
  "vehicleno": "제주79아3525",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 343,
  "routeNm": "432-1",
  "vehicleno": "제주79아3526",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 344,
  "routeNm": "325-12",
  "vehicleno": "제주79아3527",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 349,
  "routeNm": "325-11",
  "vehicleno": "제주79아3532",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 353,
  "routeNm": "325-11",
  "vehicleno": "제주79아3536",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 363,
  "routeNm": "344-1",
  "vehicleno": "제주79아3546",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 364,
  "routeNm": "344-1",
  "vehicleno": "제주79아3547",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 365,
  "routeNm": "343-10",
  "vehicleno": "제주79아3548",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 400,
  "routeNm": "432-1",
  "vehicleno": "제주79아3583",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 401,
  "routeNm": "432-1",
  "vehicleno": "제주79아3584",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 402,
  "routeNm": "431-1",
  "vehicleno": "제주79아3585",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 403,
  "routeNm": "431-1",
  "vehicleno": "제주79아3586",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 404,
  "routeNm": "431-1",
  "vehicleno": "제주79아3587",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "극동여객"
 },
 {
  "idx": 406,
  "routeNm": "415-2",
  "vehicleno": "제주79아3601",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 407,
  "routeNm": "415-2",
  "vehicleno": "제주79아3602",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 409,
  "routeNm": "415-1",
  "vehicleno": "제주79아3604",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 411,
  "routeNm": "441-7",
  "vehicleno": "제주79아3606",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 413,
  "routeNm": "455-7",
  "vehicleno": "제주79아3608",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 415,
  "routeNm": "455-5",
  "vehicleno": "제주79아3610",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 416,
  "routeNm": "415-2",
  "vehicleno": "제주79아3611",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 422,
  "routeNm": "415-2",
  "vehicleno": "제주79아3617",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 438,
  "routeNm": "415-1",
  "vehicleno": "제주79아3633",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 439,
  "routeNm": "415-1",
  "vehicleno": "제주79아3634",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 440,
  "routeNm": "415-1",
  "vehicleno": "제주79아3635",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 446,
  "routeNm": "415-2",
  "vehicleno": "제주79아3641",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 447,
  "routeNm": "442-1",
  "vehicleno": "제주79아3642",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 448,
  "routeNm": "441-7",
  "vehicleno": "제주79아3643",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 449,
  "routeNm": "442-1",
  "vehicleno": "제주79아3644",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 450,
  "routeNm": "455-7",
  "vehicleno": "제주79아3645",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 451,
  "routeNm": "415-2",
  "vehicleno": "제주79아3646",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 452,
  "routeNm": "455-6",
  "vehicleno": "제주79아3647",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 453,
  "routeNm": "415-1",
  "vehicleno": "제주79아3648",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 454,
  "routeNm": "455-5",
  "vehicleno": "제주79아3649",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 455,
  "routeNm": "455-6",
  "vehicleno": "제주79아3650",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 456,
  "routeNm": "455-8",
  "vehicleno": "제주79아3651",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼화여객"
 },
 {
  "idx": 588,
  "routeNm": "300-1",
  "vehicleno": "제주79자6026",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주시공영"
 },
 {
  "idx": 589,
  "routeNm": "300-5",
  "vehicleno": "제주79자6027",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주시공영"
 },
 {
  "idx": 590,
  "routeNm": "300-2",
  "vehicleno": "제주79자6028",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "제주시공영"
 },
 {
  "idx": 639,
  "routeNm": "690-1",
  "vehicleno": "제주79자6620",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포공영"
 },
 {
  "idx": 640,
  "routeNm": "690-2",
  "vehicleno": "제주79자6621",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포공영"
 },
 {
  "idx": 655,
  "routeNm": "691-3",
  "vehicleno": "제주79자6636",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포공영"
 },
 {
  "idx": 656,
  "routeNm": "880-1",
  "vehicleno": "제주79자6637",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포공영"
 },
 {
  "idx": 657,
  "routeNm": "880-1",
  "vehicleno": "제주79자6638",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포공영"
 },
 {
  "idx": 658,
  "routeNm": "880-1",
  "vehicleno": "제주79자6639",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포공영"
 },
 {
  "idx": 676,
  "routeNm": "341-2",
  "vehicleno": "제주79자7012",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 677,
  "routeNm": "341-1",
  "vehicleno": "제주79자7013",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 679,
  "routeNm": "342-2",
  "vehicleno": "제주79자7015",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 703,
  "routeNm": "349-2",
  "vehicleno": "제주79자7039",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 704,
  "routeNm": "341-2",
  "vehicleno": "제주79자7040",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 705,
  "routeNm": "348-1",
  "vehicleno": "제주79자7041",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 714,
  "routeNm": "380-2",
  "vehicleno": "제주79자7050",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 715,
  "routeNm": "380-2",
  "vehicleno": "제주79자7051",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 717,
  "routeNm": "370-2",
  "vehicleno": "제주79자7053",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 718,
  "routeNm": "370-1",
  "vehicleno": "제주79자7054",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 719,
  "routeNm": "341-2",
  "vehicleno": "제주79자7055",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 722,
  "routeNm": "348-1",
  "vehicleno": "제주79자7058",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 723,
  "routeNm": "342-1",
  "vehicleno": "제주79자7059",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 724,
  "routeNm": "342-1",
  "vehicleno": "제주79자7060",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 763,
  "routeNm": "370-1",
  "vehicleno": "제주79자7099",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 764,
  "routeNm": "370-2",
  "vehicleno": "제주79자7100",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 765,
  "routeNm": "380-2",
  "vehicleno": "제주79자7101",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 766,
  "routeNm": "380-1",
  "vehicleno": "제주79자7102",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 767,
  "routeNm": "342-1",
  "vehicleno": "제주79자7103",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "삼영교통"
 },
 {
  "idx": 797,
  "routeNm": "621-3",
  "vehicleno": "제주79자7500",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 800,
  "routeNm": "621-1",
  "vehicleno": "제주79자7503",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 801,
  "routeNm": "510-2",
  "vehicleno": "제주79자7504",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 804,
  "routeNm": "630-1",
  "vehicleno": "제주79자7507",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 806,
  "routeNm": "625-5",
  "vehicleno": "제주79자7509",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 807,
  "routeNm": "624-6",
  "vehicleno": "제주79자7510",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 810,
  "routeNm": "645-5",
  "vehicleno": "제주79자7513",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 812,
  "routeNm": "510-2",
  "vehicleno": "제주79자7515",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 813,
  "routeNm": "520-2",
  "vehicleno": "제주79자7516",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 814,
  "routeNm": "510-1",
  "vehicleno": "제주79자7517",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 818,
  "routeNm": "624-3",
  "vehicleno": "제주79자7521",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 819,
  "routeNm": "635-2",
  "vehicleno": "제주79자7522",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 820,
  "routeNm": "621-2",
  "vehicleno": "제주79자7523",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 821,
  "routeNm": "623-3",
  "vehicleno": "제주79자7524",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 822,
  "routeNm": "623-4",
  "vehicleno": "제주79자7525",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 823,
  "routeNm": "635-4",
  "vehicleno": "제주79자7526",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 824,
  "routeNm": "625-4",
  "vehicleno": "제주79자7527",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 825,
  "routeNm": "520-2",
  "vehicleno": "제주79자7528",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 826,
  "routeNm": "630-1",
  "vehicleno": "제주79자7529",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 827,
  "routeNm": "630-2",
  "vehicleno": "제주79자7530",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 828,
  "routeNm": "520-2",
  "vehicleno": "제주79자7531",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 829,
  "routeNm": "635-1",
  "vehicleno": "제주79자7532",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 830,
  "routeNm": "510-2",
  "vehicleno": "제주79자7533",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 831,
  "routeNm": "520-2",
  "vehicleno": "제주79자7534",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 832,
  "routeNm": "521-2",
  "vehicleno": "제주79자7535",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 833,
  "routeNm": "630-4",
  "vehicleno": "제주79자7536",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 834,
  "routeNm": "510-1",
  "vehicleno": "제주79자7537",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 835,
  "routeNm": "510-13",
  "vehicleno": "제주79자7538",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 836,
  "routeNm": "621-3",
  "vehicleno": "제주79자7539",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 837,
  "routeNm": "510-2",
  "vehicleno": "제주79자7540",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 838,
  "routeNm": "624-4",
  "vehicleno": "제주79자7541",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 839,
  "routeNm": "510-4",
  "vehicleno": "제주79자7542",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 840,
  "routeNm": "531-1",
  "vehicleno": "제주79자7543",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 841,
  "routeNm": "510-2",
  "vehicleno": "제주79자7544",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 842,
  "routeNm": "621-1",
  "vehicleno": "제주79자7545",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 843,
  "routeNm": "532-2",
  "vehicleno": "제주79자7546",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 844,
  "routeNm": "625-4",
  "vehicleno": "제주79자7547",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 845,
  "routeNm": "520-2",
  "vehicleno": "제주79자7548",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 846,
  "routeNm": "510-1",
  "vehicleno": "제주79자7549",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 847,
  "routeNm": "510-1",
  "vehicleno": "제주79자7550",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 848,
  "routeNm": "531-6",
  "vehicleno": "제주79자7551",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 849,
  "routeNm": "520-1",
  "vehicleno": "제주79자7552",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 850,
  "routeNm": "520-1",
  "vehicleno": "제주79자7553",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 851,
  "routeNm": "532-2",
  "vehicleno": "제주79자7554",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 852,
  "routeNm": "510-2",
  "vehicleno": "제주79자7555",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 853,
  "routeNm": "531-1",
  "vehicleno": "제주79자7556",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 854,
  "routeNm": "521-1",
  "vehicleno": "제주79자7557",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 855,
  "routeNm": "521-2",
  "vehicleno": "제주79자7558",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 856,
  "routeNm": "531-2",
  "vehicleno": "제주79자7559",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 857,
  "routeNm": "530-2",
  "vehicleno": "제주79자7560",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 858,
  "routeNm": "531-2",
  "vehicleno": "제주79자7561",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 859,
  "routeNm": "530-1",
  "vehicleno": "제주79자7562",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 860,
  "routeNm": "625-3",
  "vehicleno": "제주79자7563",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 861,
  "routeNm": "510-4",
  "vehicleno": "제주79자7564",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 862,
  "routeNm": "531-4",
  "vehicleno": "제주79자7565",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 863,
  "routeNm": "532-1",
  "vehicleno": "제주79자7566",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 864,
  "routeNm": "521-1",
  "vehicleno": "제주79자7567",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 865,
  "routeNm": "532-1",
  "vehicleno": "제주79자7568",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 },
 {
  "idx": 866,
  "routeNm": "510-1",
  "vehicleno": "제주79자7569",
  "vehicletp": "대형승합차",
  "vehiclelowtp": "저상버스",
  "maximumnumber": 0,
  "buscorporation": "서귀포운수(동서교통)"
 }
]

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
function routeMarker(iwFlag, busFlag, routeId, smjson) {    
	//노선 좌표 가져오기
    
    stationMarker(iwFlag,"N","Y",smjson);
    
    if (globalFileUrl.indexOf("/JWN/") == -1) {
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

    for (var row in smjson) {
        if (smjson[row].localX != null && smjson[row].localY != null) {
            var itemPos = new kakao.maps.LatLng(smjson[row].localY,smjson[row].localX);
            bounds.extend(itemPos);
            linePath.push(itemPos);
        }
    }
    
    var lineOpacity = 1;
    
    if (globalFileUrl.indexOf("/JWN/") > -1) {
    	lineOpacity = 0;
    }

    var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: '#e43726', // 선의 색깔입니다
        strokeOpacity: lineOpacity, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    });

    polyline.setMap(map);
    polylines.push(polyline);
    map.setBounds(bounds);
    
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
            
            var siwHtml = stationInfoWindow("start",smdata.stationId,smdata.stationNm,smdata.localY,smdata.localX,courseFlag);
            
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
                        
                        stationInfoWindow("click",dataItemId,"","","","");

                        $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                        $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).prev(".markerArea").addClass("on");
                        $(".stationInfoWindow").closest(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station-on.png");
                        
                        if ($("ul.stationList>li a[data-station-id='" + dataItemId + "']").length > 0) {
                        	$("ul.stationList>li a[data-station-id='" + dataItemId + "']").parent("li").removeClass("on");
                        	$("ul.stationList>li a[data-station-id='" + dataItemId + "']").trigger("click");
                        }
                    }
                    
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
        url: "http://openapi.tago.go.kr/openapi/service/BusLcInfoInqireService/getRouteAcctoBusLcList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&routeId=" + globalCityName + routeId,
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
                        $(".infoWindowArea").prev(".markerArea").removeClass("on");
                        $(".stationInfoWindow").closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");

                        if (dataItemTitle.length > 1) {
                            var dataItemType = dataItemTitle[0];
                            var dataItemId = dataItemTitle[1];
                            
                            changeBusDrive("add","bus",$(".infoWindowArea#iw-bus-" + bmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
                            
                            $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                            $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).prev(".markerArea").addClass("on");
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

                    mar.win.open(map, mar);

                    kakao.maps.event.addListener(mar, "click", function() {
                        var dataItemTitle = mar.getTitle().split('-');

                        $(".infoWindowArea").css({display:"none"});
                        $(".infoWindowArea").prev(".markerArea").removeClass("on");
                        $(".stationInfoWindow").closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");

                        if (dataItemTitle.length > 1) {
                            var dataItemType = dataItemTitle[0];
                            var dataItemId = dataItemTitle[1];
                            
                            changeBusDrive("add","lowbus",$(".infoWindowArea#iw-lowbus-" + lbmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
                            
                            $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                            $(".infoWindowArea#iw-" + dataItemType + "-" + dataItemId).prev(".markerArea").addClass("on");
                        }
                        
                        if (globalFileUrl.indexOf("/mobile/") > -1) {
                        	$("#mContList").removeClass("on");
                            $("#mContList .mListBtnArea .mListBtn").find("i").attr("class", "fas fa-chevron-up");
                        } else {
                        	$("#contList").removeClass("on");
                            $("#contList .listBtnArea #arrowBtn").find("i").attr("class", "fas fa-chevron-up");
                        }
                        
                        map.setCenter(mar.getPosition());
                        map.setLevel(3);
                    });
                    
                    kakao.maps.event.addListener(map, "dragend", function() {
                        changeBusDrive("remove","lowbus",$(".infoWindowArea#iw-lowbus-" + lbmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
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
                    //반복 호출시
                    lowBusInfoWindow("loop",lbmdata);
                    
                    lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].setPosition(pos);
                    lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].win.setPosition(pos);
                    
                    if ($(".busMarkerArea.on + .infoWindowArea#iw-lowbus-" + lbmdata.vehicleno + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive.on").length > 0) {
                    	map.panTo(pos);
                    }
                    
                    var lowBusAngle = 90;
                    
                    if (lbmdata.angle != 0) {
                    	lowBusAngle = lbmdata.angle;
                    } else if (lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].lastAngle && lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].lastAngle != 0) {
                    	lowBusAngle = lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].lastAngle;
                    }
                    
                    $(".infoWindowArea#iw-lowbus-" + lbmdata.vehicleno).prev(".markerArea").children("img").css({"transform":"rotate(" + lowBusAngle + "deg)","transform-origin":"center"});
                    lowbusmarkerdata["lowbus-" + lbmdata.vehicleno].lastAngle = lowBusAngle;
                    
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
                    
                    if ($(".markerArea#m-" + dataItemType + "-" + dataItemId + " .bmTit").length == 0) {
                    	$(".markerArea#m-" + dataItemType + "-" + dataItemId).append("<div class='bmTit'>" + dataItemId + "</div>");
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
function stationInfoWindow(state, stationId, stationName, stationLatitude, stationLongitude, courseFlag) {
    var siwHtml = "";
    var resultArr = [];
    
    if (state == "start") {
        //마커 생성시
        siwHtml += "<div class='stationInfoWindow' data-item-type='station' data-item-id='" + stationId + "'>";
        siwHtml += "    <div class='siwTop'>";
        siwHtml += "        <div class='siwTit'>";
        siwHtml += "            " + stationName + "";
        siwHtml += "            <span>" + stationId + "</span>";
        siwHtml += "        </div>";
        siwHtml += "        <div class='close' onclick='closeInfoWindow(\"station\",this);'><img src='" + globalFilePath + "images/menu_top_close.png' alt='info-window-close'></div>";
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
            siwHtml += "            <div class='courseBtn' data-station-id='" + stationId + "' data-station-name='" + stationName + "' data-station-latitude='" + stationLatitude + "' data-station-longitude='" + stationLongitude + "' onclick='setCourseInput(\"mArrival\",this);'>도착</div>";
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
            url: "http://openapi.tago.go.kr/openapi/service/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeId=" + globalCityName + stationId,
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
                            
                            if (globalFileUrl.indexOf("/mobile/") > -1) {
                            	siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setMBISL(this);'>";
                            } else {
                            	siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setBISL(this);'>";
                            }
                            
                            siwHtml += "    <td><span>" + resultArr[row].routeNm + "</span>" + (routeStationNm != undefined ? " (" + routeStationNm + ")" : "") + "</td>";
                            siwHtml += "    <td>" + resultArr[row].vehicletp + "</td>";
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
                
                $(".infoWindowArea#iw-station-" + stationId + " .stationInfoWindow .siwCon .routeTable .table tbody").html(siwHtml);

                stationTimer = setTimeout(function() {
                    stationInfoWindow("loop",stationId,"","","","");
                }, 10000);

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
                url: "http://openapi.tago.go.kr/openapi/service/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeId=" + globalCityName + stationId,
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
                                
                                if (globalFileUrl.indexOf("/mobile/") > -1) {
                                	siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setMBISL(this);'>";
                                } else {
                                	siwHtml += "<tr data-route-id='" + resultArr[row].routeId + "' data-route-num='" + resultArr[row].routeNm + "' onclick='setBISL(this);'>";
                                }
                                
                                siwHtml += "    <td><span>" + resultArr[row].routeNm + "</span>" + (routeStationNm != undefined ? " (" + routeStationNm + ")" : "") + "</td>";
                                siwHtml += "    <td>" + resultArr[row].vehicletp + "</td>";
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

                    $(".infoWindowArea#iw-station-" + stationId + " .stationInfoWindow .siwCon .routeTable .table tbody").html(siwHtml);

                    stationTimer = setTimeout(function() {
                        stationInfoWindow("loop",stationId,"","","","");
                    }, 10000);

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
            url: "http://openapi.tago.go.kr/openapi/service/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=" + globalServiceKey + "&cityCode=" + globalCityCode + "&nodeId=" + globalCityName + dataStationId,
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
    $(obj).closest(".infoWindowArea").css({display:"none"});
    $(obj).closest(".infoWindowArea").prev(".markerArea").removeClass("on");
    
    if (type == "station") {
        $(obj).closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");
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
        } else {
            $(obj).addClass("on");
            $(obj).find("img").attr("src", globalFilePath + "images/btn-iw-drive-on.png");
            
            if (type == "bus") {
            	map.setCenter(markerdata[type + "-" + dataItemId].getPosition());
            } else if (type == "lowbus") {
            	map.setCenter(lowbusmarkerdata[type + "-" + dataItemId].getPosition());
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
    }
}

//지도에서 위치보기
function markerPosition(type, id, iwFlag) {
    if (iwFlag == "Y") {
        $(".infoWindowArea").css({display:"none"});
        $(".infoWindowArea").prev(".markerArea").removeClass("on");
        $(".stationInfoWindow").closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");
        
        if (type == "station") {
            stationInfoWindow("click",id,"","","","");
            stationInfoWindow2(id);
        }
        
        if (type == "bus") {
            changeBusDrive("add","bus",$(".infoWindowArea#iw-bus-" + id + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
        }
        
        if (type == "lowbus") {
            changeBusDrive("add","lowbus",$(".infoWindowArea#iw-lowbus-" + id + " .busInfoWindow .biwCon .busDetail .busDetailBtn .busDrive"));
        }
        
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

//노선검색에서 정류장 노출여부
function setRouteStationVisible() {
	if ($("#infoVisible").is(":checked")) {
		$(".infoWindowArea[id^='iw-station-']").prev(".markerArea").removeClass("not-visible");
	} else {
		$(".infoWindowArea[id^='iw-station-']").css({display:"none"});
        $(".infoWindowArea[id^='iw-station-']").prev(".markerArea").removeClass("on");
        $(".infoWindowArea[id^='iw-station-']").prev(".markerArea").addClass("not-visible");
        $(".stationInfoWindow").closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");
	}
}

//노선검색(휠네비)에서 노선선택시 해당 노선의 버스만 노출
function setRouteBusVisible(routeId) {
	if (routeId != undefined) {
		$(".lowBusInfoWindowArea").css({display:"none"});
        $(".lowBusInfoWindowArea").prev(".lowBusMarkerArea").removeClass("on");
        $(".lowBusInfoWindowArea").prev(".lowBusMarkerArea").addClass("not-visible");
        $(".lowBusInfoWindowArea.iw-lowbus-route-" + routeId).prev(".lowBusMarkerArea").removeClass("not-visible");
        $(".stationInfoWindow").closest(".infoWindowArea").prev(".markerArea").children("img").attr("src",globalFilePath + "images/map-station.png");
	} else {
		$(".lowBusInfoWindowArea").prev(".lowBusMarkerArea").removeClass("not-visible");
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
    
    $(".infoWindowArea:not(.lowBusInfoWindowArea)").each(function() {
        $(this).remove();
    });
    
    $(".markerArea:not(.lowBusMarkerArea)").each(function() {
        $(this).remove();
    });
    
    $(".lowBusInfoWindowArea").each(function() {
        $(this).css({display:"none"});
    });
    
    $(".lowBusMarkerArea").each(function() {
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

//지도위에 표시되고 있는 라인을 모두 제거
function removePolyline() {    
    for (var i = 0; i < polylines.length; i++) {
    	polylines[i].setMap(null);
    }
    
    polylines = [];
}

