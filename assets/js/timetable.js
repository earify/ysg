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

async function timeTableExecute(whatday, whatclass) {
	console.log('시간표 함수 작동') //삭제

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
				mainTable += itrt_num;
			}
		}
	} 
			if (kepler[1] == 'R') {
		mainTable= "\n시간표 정보가 없습니다";
	}
			
	const DisplayTable = document.getElementById("timeTables");
	DisplayTable.innerText = "\n" + TableForWeb;

			mainTable = '';
			console.log(TableForPre); // 테스트용 로그 표시
} catch (error) {
			console.error(error);
}
}