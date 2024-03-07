// 오늘 날짜 구하기
const today = new Date();

// 년, 월, 일, 요일 구하기
let year_t = today.getFullYear();
let month_t = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
let day_t = today.getDate();

let month_tt = (today.getMonth() + 1).toString().padStart(2, "0");
let day_tt = today.getDate().toString().padStart(2, "0"); // 일을 2자리로 표시

let daysOfWeek_asdasdasd = ["일", "월", "화", "수", "목", "금", "토"][today.getDay()];
// let dayName_t = daysOfWeek_t[dayOfWeek_t];
let dayOfWeek_t;
// 출력 포맷 지정
let formattedDate_tt = `${year_t}${month_tt}${day_tt}`;
let formattedDate_t = `${year_t}년 ${month_t}월 ${day_t}일 ${daysOfWeek_asdasdasd}요일`;

// 결과 출력
console.log(formattedDate_t);
console.log(formattedDate_tt);

let lines;
let kepler;
let mainTable_preview = '';
let mainTable_webview;
let dayName_tt;
let stayc;
let TableForPre;
let itrt_num;
// let friendlyDate;

async function timeTable_run(whatgrade, whatclass, whatday) {
  console.log('시간표 함수 작동') //삭제

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
  lines = full_text.split("\n");
  kepler = lines[2];
  // console.log(kepler_t);
  itrt_num = "";
  if (kepler[1] == "h") {
    // 리스트의 각 요소를 확인
    for (let i = 0; i < lines.length; i++) {
      // 현재 요소에 "perio"가 포함되어 있는지 확인
      if (lines[i].includes("PERIO")) {
        let perio_num = String(lines[i]);
        perio_num = perio_num.substring(20, 21);
        // 포함되어 있다면 출력
        // console.log(perio_num);
        mainTable_preview += "\nㅤㅤㅤㅤㅤㅤ" + perio_num + " | ";
        mainTable_webview += perio_num + " | ";
      }
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
        mainTable_preview += itrt_num;
      }
    }
  } 
      if (kepler[1] == 'R') {
    mainTable_preview = "\n시간표 정보가 없습니다";
  }

  TableForPre = mainTable_preview;
  const DisplayTable1 = document.getElementById("timeTables1");
  DisplayTable1.innerText = TableForPre;

      console.log(TableForPre); // 테스트용 로그 표시
} catch (error) {
      console.error(error);
}
}


// 표를 만들 데이터
const timetableData = {
  "1반": {
    "1교시": "국어",
    "2교시": "영어",
    "3교시": "수학",
    "4교시": "사회",
    "5교시": "과학",
    "6교시": "", // 비어있는 셀
    "7교시": "", // 비어있는 셀
  },
  "2반": {
    "1교시": "국어",
    "2교시": "영어",
    "3교시": "수학",
    "4교시": "사회",
    "5교시": "과학",
    "6교시": "기가",
    "7교시": "음악",
  },
  "3반": {
    "1교시": "",
    "2교시": "",
    "3교시": "",
    "4교시": "",
    "5교시": "",
    "6교시": "",
    "7교시": "",
  },
  "4반": {
    "1교시": "",
    "2교시": "",
    "3교시": "",
    "4교시": "",
    "5교시": "",
    "6교시": "",
    "7교시": "",
  },
  "5반": {
    "1교시": "",
    "2교시": "",
    "3교시": "",
    "4교시": "",
    "5교시": "",
    "6교시": "",
    "7교시": "",
  },
  "6반": {
    "1교시": "",
    "2교시": "",
    "3교시": "",
    "4교시": "",
    "5교시": "",
    "6교시": "",
    "7교시": "",
  },
  "7반": {
    "1교시": "",
    "2교시": "",
    "3교시": "",
    "4교시": "",
    "5교시": "",
    "6교시": "",
    "7교시": "",
  },
  "8반": {
    "1교시": "",
    "2교시": "",
    "3교시": "",
    "4교시": "",
    "5교시": "",
    "6교시": "",
    "7교시": "",
  },
};

// 표 생성 함수
function createTimetable(data) {
  const tableContainer = document.getElementById("table-container");

  // 새로운 테이블 엘리먼트 생성
  const table = document.createElement("table");
  table.classList.add("timetable"); // 테이블에 클래스 추가
  table.border = "1";

  // 헤더 행 생성
  const headerRow = table.insertRow();
  const headerClassCell = headerRow.insertCell();
  headerClassCell.textContent = "반";
  headerClassCell.classList.add("class-header"); // 반 헤더 셀에 클래스 추가

  // 각 교시에 대한 열 생성
  for (const time in timetableData["1반"]) {
    const headerCell = headerRow.insertCell();
    headerCell.textContent = time;
    headerCell.classList.add("time-header"); // 교시 헤더 셀에 클래스 추가
  }

  // 각 반에 대한 행 생성
  for (const className in data) {
    const classData = data[className];

    // 행 생성
    const row = table.insertRow();
    row.classList.add("class-row"); // 반 행에 클래스 추가

    const classCell = row.insertCell();
    classCell.textContent = className;
    classCell.classList.add("class-header"); // 반 헤더 셀에 클래스 추가

    // 반의 데이터에 대한 열 생성
    for (const time in classData) {
      const cell = row.insertCell();
      cell.textContent = classData[time];
      cell.classList.add("class-cell"); // 각 셀에 클래스 추가
    }
  }

  // 테이블을 컨테이너에 추가
  tableContainer.appendChild(table);
}

// 표 생성 함수 호출
createTimetable(timetableData);
