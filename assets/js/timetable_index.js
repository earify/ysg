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

let lines_t;
let kepler_t;
let mainTable_preview = '';
let mainTable_webview;
let dayName_tt;
let stayc;
let TableForPre;
let itrt_num;
// let friendlyDate;

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
		lines_t = full_text.split("\n");
		kepler_t = lines_t[2];
		// console.log(kepler_t);
		itrt_num = "";
		if (kepler_t[1] == "h") {
			// 리스트의 각 요소를 확인
			for (let i = 0; i < lines.length; i++) {
				// 현재 요소에 "perio"가 포함되어 있는지 확인
				if (lines_t[i].includes("PERIO")) {
					let perio_num = String(lines_t[i]);
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
        if (kepler_t[1] == 'R') {
			mainTable_preview = "\n시간표 정보가 없습니다";
		}
        
		const yyddmm = document.getElementById("yyddmm");
		yyddmm.innerText = formattedDate_t;

		const yyddmm1 = document.getElementById("yyddmm1")
		yyddmm1.innerText = formattedDate_t
        
		TableForPre = mainTable_preview;
		const DisplayTable1 = document.getElementById("timeTables1");
		DisplayTable1.innerText = TableForPre;

        console.log(TableForPre); // 테스트용 로그 표시
	} catch (error) {
        console.error(error);
	}
}

tt_when(formattedDate_tt, 1)