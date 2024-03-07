// 오늘 날짜 구하기
const today = new Date();

// 년, 월, 일, 요일 구하기
let year_t = today.getFullYear();
let month_t = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
let day_t = today.getDate();

let month_tt = (today.getMonth() + 1).toString().padStart(2, "0");
let day_tt = today.getDate().toString().padStart(2, "0"); // 일을 2자리로 표시

let daysOfWeek_asdasdasd = ["일", "월", "화", "수", "목", "금", "토"][
  today.getDay()
];
// let dayName_t = daysOfWeek_t[dayOfWeek_t];
let dayOfWeek_t;
// 출력 포맷 지정
let formattedDate_tt = `${year_t}${month_tt}${day_tt}`;
let formattedDate_t = `${year_t}년 ${month_t}월 ${day_t}일 ${daysOfWeek_asdasdasd}요일`;

// 결과 출력
console.log(formattedDate_t);
console.log(formattedDate_tt);

// 변수들 선언
let lines;
let kepler;
let mainTable_view = "";
let TableForPre;
let itrt_num;
let wk1;
let wk2;
let wtf;
let realTable = []// 배열 초기화 추가
let titr1;
let table;

async function ttr(whatgrade, whatclass, whatday) {
  console.log("시간표 함수 작동"); // 삭제
  
  // API 엔드포인트 URL
  const tt_api_url = "https://open.neis.go.kr/hub/hisTimetable";
  
  // 필요한 파라미터 설정
  const tt_params = {
    KEY: "c14d61fef8954d718ab4d1f10bbae173",
    ATPT_OFCDC_SC_CODE: "Q10",
    SD_SCHUL_CODE: "8490058",
    ALL_TI_YMD: whatday,
    GRADE: whatgrade,
    CLASS_NM: whatclass,
  };

  try {
    // API 요청 보내기
    const response = await fetch(
      `${tt_api_url}?${new URLSearchParams(tt_params)}`
    );
    const full_text = await response.text();

    // 줄 단위로 나누기
    mainTable_view = "";
    lines = full_text.split("\n");
    kepler = lines[2];
    // console.log(kepler_t);
    itrt_num = "";
    if (kepler[1] == "h") {
      // 리스트의 각 요소를 확인
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("ITRT_CNTNT")) {
          itrt_num = String(lines[i]);
          itrt_num = itrt_num.substring(25, 34);
          itrt_num = itrt_num.replace("[보강]", "bogang ");
          itrt_num = itrt_num.replace("]", "");
          itrt_num = itrt_num.replace("]", "");
          itrt_num = itrt_num.replace(">", "");
          itrt_num = itrt_num.replace("<", "");
          itrt_num = itrt_num.replace("/", "");
          itrt_num = itrt_num.replace("I", "");
          itrt_num = itrt_num.replace("Ⅰ", "");
          itrt_num = itrt_num.replace("T", "");
          itrt_num = itrt_num.replace("bogang", "[보강]"); // 다듬기
          // console.log(itrt_num);
          mainTable_view += itrt_num + "\n";
          realTable = mainTable_view.split("\n");
        }
      }
    }
    if (kepler[1] == "R") {
      mainTable_view = "\nX";
      realTable = mainTable_view.split("\n");
    } 

    titr1 = realTable;
    // 표에 시간표 넣기
    for (let i = 1; i <= 7; i++) {
      console.log(realTable)
      table[i - 1][2] = realTable[i - 1];
    }
    
  } catch (error) {
    console.error(error);
  }
}


console.log("realTable:", realTable);
console.log("표 데이터:", titr1);

document.addEventListener("DOMContentLoaded", function () {
  let tnt = ['국어','수학','사회','과학','영어','기가','사회탐구'];
  const rows = 7; // 세로 칸 수
  const cols = 9; // 가로 칸 수
  
  // 열의 제목과 행의 제목 생성
  const columnTitles = [
    "교시/반",
    "1반",
    "2반",
    "3반",
    "4반",
    "5반",
    "6반",
    "7반",
    "8반",
  ];
  const rowTitles = [
    "1교시",
    "2교시",
    "3교시",
    "4교시",
    "5교시",
    "6교시",
    "7교시",
  ];
  
  // 표 초기화 및 배열 생성
  let table = new Array(rows);
  for (let i = 0; i < rows; i++) {
    table[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      table[i][j] = "";
    }
  }
  
  ttr(1, 1, 20240308);
  // 표에 시간표 넣기
  // for (let i = 1; i <= 7; i++) {
    //   table[i - 1][1] = tnt[i - 1];
    // }
    
    // 표를 생성하여 HTML에 추가
    const tableContainer = document.getElementById("table-container");
    const createdTable = document.createElement("table");
    
    // 열의 제목 추가
    const titleRow = createdTable.insertRow();
    for (let i = 0; i < cols; i++) {
      const titleCell = titleRow.insertCell();
      titleCell.textContent = columnTitles[i];
    }
    
    // 행과 열의 제목 추가 (데이터는 비워져 있음)
    for (let i = 0; i < rows; i++) {
      const dataRow = createdTable.insertRow();
      const rowTitleCell = dataRow.insertCell();
      rowTitleCell.textContent = rowTitles[i];
      
      for (let j = 1; j < cols; j++) {
        const dataCell = dataRow.insertCell();
        dataCell.textContent = table[i][j];
      }
    }
    
    console.log("제발요2");
    // 생성한 표를 HTML에 추가
    tableContainer.appendChild(createdTable);
  });
  