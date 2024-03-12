// 오늘 날짜 구하기
const today = new Date();

// 년, 월, 일, 요일 구하기
let year = today.getFullYear();
let month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
let day = today.getDate();

let month_tt = (today.getMonth() + 1).toString().padStart(2, "0");
let day_tt = today.getDate().toString().padStart(2, "0"); // 일을 2자리로 표시

let daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"][today.getDay()];
// let dayName_t = daysOfWeek_t[dayOfWeek_t];
let dayOfWeek_t;
// 출력 포맷 지정
let formattedDate_tt = `${year}${month_tt}${day_tt}`;
let formattedDate_t = `${year}년 ${month}월 ${day}일 ${daysOfWeek}요일`;

// 변수들 선언
let lines;
let kepler;
let mainTable_view = "";
let TableForPre;
let itrt_num;
let realTable = []; // 배열 초기화 추가
let movedate = 0;

function addDaysToDate(date, daysToAdd) {
  const year = parseInt(date.substring(0, 4), 10);
  const month = parseInt(date.substring(4, 6), 10) - 1;
  const day = parseInt(date.substring(6, 8), 10);

  let currentDate = new Date(year, month, day);

  // 현재 달의 마지막 날짜를 구함
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  // 날짜를 더하되, 현재 달의 마지막 날을 넘어가면 다음 달로 이동
  currentDate.setDate(currentDate.getDate() + daysToAdd);
  while (currentDate.getDate() > lastDayOfMonth) {
    currentDate.setDate(currentDate.getDate() - lastDayOfMonth);
    currentDate.setMonth(currentDate.getMonth() + 1);
    lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
  }

  const newYear = currentDate.getFullYear();
  const newMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const newDay = currentDate.getDate().toString().padStart(2, "0");

  return `${newYear}${newMonth}${newDay}`;
}

async function ttr(whatgrade, whatclass, whatday) {
  console.log("시간표 함수 작동");
  realTable = [];
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
          itrt_num = itrt_num.replace("bogang", "[보]"); // 다듬기

          // 과목 이름 줄이기
          itrt_num = itrt_num.replace("통합사회", "통사");
          itrt_num = itrt_num.replace("통합과학", "통과");
          itrt_num = itrt_num.replace("과학탐구실험", "과탐");
          itrt_num = itrt_num.replace("진로활동", "진로");
          itrt_num = itrt_num.replace("한국사", "국사");
          itrt_num = itrt_num.replace("자율활동", "자율");
          itrt_num = itrt_num.replace("동아리활동", "동아리");
          itrt_num = itrt_num.replace("토요휴업일", "토요일");

          // console.log(itrt_num);
          mainTable_view += itrt_num + "\n";
          realTable = mainTable_view.split("\n");
        }
      }
    }
    if (kepler[1] == "R") {
      mainTable_view = "X";
      realTable = mainTable_view.split("\n");
    }

    // console.log(realTable)
    return realTable; // 제발 좀 되라
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
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

  // 값 업데이트 및 표시 함수
  function updateDisplay() {
    console.log("updateDisplay");
    if (movedate < 0) {
      valueDisplay.textContent = `${Math.abs(movedate)}일 전`;
    } else {
      valueDisplay.textContent = `${movedate}일 후`;
    }
  }

  let createdTable;
  async function plzman(tabledate) {
    console.log("plzman");
    const tableContainer = document.getElementById("table-container");
    console.log(createdTable)
    if (createdTable) {
      console.log("삭제함")
      tableContainer.removeChild(createdTable);
    }

    // 새로운 표 생성
    createdTable = document.createElement("table");
    tableContainer.appendChild(createdTable);
    
    // 표 초기화 및 배열 생성
    let table = new Array(rows);
    for (let i = 0; i < rows; i++) {
      table[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        table[i][j] = "";
      }
    }
      // 표에 시간표 삽입
      const promises = [];
  
      for (let j = 1; j <= 8; j++) {
        promises.push(ttr(1, j, tabledate));
      }
  
      const results = await Promise.all(promises);
  
      for (let j = 1; j <= 8; j++) {
        for (let i = 0; i <= 6; i++) {
          table[i][j] = results[j - 1][i];
        }
      }
    
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
    }}

    console.log("표 생성 함수 작동");
  
    // 화살표
  
    // HTML 요소 참조
    const valueDisplay = document.getElementById("valueDisplay");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
  
    // 왼쪽 화살표 클릭 시 이벤트 리스너 등록
    leftArrow.addEventListener("click", function () {
      movedate -= 1;
      maintabledate = addDaysToDate(formattedDate_tt, movedate);
      console.log("왼쪽");
  
      updateDisplay();
      plzman(maintabledate);
    });
  
    // 오른쪽 화살표 클릭 시 이벤트 리스너 등록
    rightArrow.addEventListener("click", function () {
      movedate += 1;
      maintabledate = addDaysToDate(formattedDate_tt, movedate);
      console.log("오른쪽");
  
      updateDisplay();
      plzman(maintabledate);
    });
    updateDisplay();
    plzman(formattedDate_tt);
  });
