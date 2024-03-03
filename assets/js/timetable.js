// 오늘 날짜 구하기
const today = new Date();

// 년, 월, 일, 요일 구하기
let year_t = today.getFullYear();
let month_t = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
let day_t = today.getDate();

let month_tt = (today.getMonth() + 1).toString().padStart(2, "0");
let day_tt = today.getDate().toString().padStart(2, "0"); // 일을 2자리로 표시

let daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"][today.getDay()];
let dayOfWeek_t;
// 출력 포맷 지정
let formattedDate_tt = `${year_t}${month_tt}${day_tt}`;
let formattedDate_t = `${year_t}년 ${month_t}월 ${day_t}일 ${daysOfWeek}요일`;

// 결과 출력
console.log(formattedDate_t);
console.log(formattedDate_tt);

let lines;
let kepler;
let mainTable_preview = '';
let mainTable_webview;
let asd = 0; // 초기 값 설정
let changedDay = new Date(today);
let dayName_tt;
let stayc;
let currentDate_tt;
let currentDate_t;
let currentDate;
let TableForPre;
let itrt_num;
let friendlyDate;

function addDaysToDate(date, daysToAdd) {
    console.log('addDaysToDate') //삭제
	const year_tt = parseInt(date.substring(0, 4), 10);
	const month_tt = parseInt(date.substring(4, 6), 10) - 1;
	const day_tt = parseInt(date.substring(6, 8), 10);

	let currentDate_tt = new Date(year_tt, month_tt, day_tt);

	// 현재 달의 마지막 날짜를 구함
	const lastDayOfMonth = new Date(year_tt, month_tt + 1, 0).getDate();

	// 날짜를 더하되, 현재 달의 마지막 날을 넘어가면 다음 달로 이동
	currentDate_tt.setDate(currentDate_tt.getDate() + daysToAdd);
	while (currentDate_tt.getDate() > lastDayOfMonth) {
		currentDate_tt.setDate(currentDate_tt.getDate() - lastDayOfMonth);
		currentDate_tt.setMonth(currentDate_tt.getMonth() + 1);
		lastDayOfMonth = new Date(
			currentDate_tt.getFullYear(),
			currentDate_tt.getMonth() + 1,
		).getDate();
	}

	const newYear = currentDate_tt.getFullYear();
	const newMonth = (currentDate_tt.getMonth() + 1).toString().padStart(2, "0");
	const newDay = currentDate_tt.getDate().toString().padStart(2, "0");

	return `${newYear}${newMonth}${newDay}`;
}


async function tt_when(whatday, whatclass) {
    console.log('tt_when') //삭제

	// API 엔드포인트 URL
	const tt_api_url = "https://open.neis.go.kr/hub/hisTimetable";

	// 필요한 파라미터 설정
	const tt_params = {
		KEY: "c14d61fef8954d718ab4d1f10bbae173",
		ATPT_OFCDC_SC_CODE: "Q10",
		SD_SCHUL_CODE: "8490058",
		ALL_TI_YMD: whatday,
		GRADE: "1",
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
		// console.log(kepler);
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
					mainTable_webview += itrt_num;
				}
			}
		} 
        if (kepler[1] == 'R') {
			mainTable_preview = "\n시간표 정보가 없습니다";
			mainTable_webview = "\n시간표 정보가 없습니다";
		}
        
		const yyddmm = document.getElementById("yyddmm");
		yyddmm.innerText = formattedDate_t;
        
		const webDate = document.getElementById("webDate");
		webDate.innerText = `${friendlyDate} ${dayName_tt}요일`;

		TableForPre = mainTable_preview;
		const DisplayTable1 = document.getElementById("timeTables1");
		DisplayTable1.innerText = "\n" + TableForPre;
        
        TableForWeb = mainTable_webview;
		const DisplayTable2 = document.getElementById("timeTables2");
		DisplayTable2.innerText = "\n" + TableForWeb;

        mainTable_preview = '';
        mainTable_webview = '';
        console.log(TableForPre); // 테스트용 로그 표시
	} catch (error) {
        console.error(error);
	}
}

// 화살표
tt_when(formattedDate_tt, 1);
document.addEventListener("DOMContentLoaded", function () {
	// HTML 요소 참조
	const valueDisplay = document.getElementById("valueDisplay");
	const leftArrow = document.getElementById("leftArrow");
	const rightArrow = document.getElementById("rightArrow");

	// 왼쪽 화살표 클릭 시 이벤트 리스너 등록
	leftArrow.addEventListener("click", function () {
		asd -= 1;
		updateDisplay();

		stayc = addDaysToDate(formattedDate_tt, asd);
		stayc = String(stayc);
		friendlyDate = `${stayc.substring(0, 4)}년 ${stayc.substring(4, 6)}월 ${stayc.substring(6, 8)}일`;
		changedDay.setDate(changedDay.getDate() + asd);
		dayOfWeek_tt = changedDay.getDay();
		dayName_t = daysOfWeek[dayOfWeek_tt];
		tt_when(stayc, 1);
	});
	// 오른쪽 화살표 클릭 시 이벤트 리스너 등록
	rightArrow.addEventListener("click", function () {
		asd += 1;
		updateDisplay();

		stayc = addDaysToDate(formattedDate_tt, asd);
		stayc = String(stayc);
		friendlyDate = `${stayc.substring(0, 4)}년 ${stayc.substring(4, 6)}월 ${stayc.substring(6, 8)}일`;
		changedDay.setDate(changedDay.getDate() + asd);
		dayOfWeek_tt = changedDay.getDay();
		dayName_t = daysOfWeek[dayOfWeek_tt];
		tt_when(stayc, 1);
	});

	// 값 업데이트 및 표시 함수
	function updateDisplay() {
		if (asd < 0) {
			valueDisplay.textContent = `${Math.abs(asd)}일 전`;
		} else {
			valueDisplay.textContent = `${asd}일 후`;
		}
	}
});
