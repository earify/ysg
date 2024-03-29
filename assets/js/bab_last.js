// 현재 날짜 정하기
const currentDate = new Date(); // 변수생성
const year = currentDate.getFullYear(); // 연도
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 월 (0부터 시작하므로 1을 더해줌)
const day = currentDate.getDate().toString().padStart(2, "0"); // 일
const formattedDate = `${year}${month}${day}`; // 현재 날짜 8자리로 표기
// let formattedDate = '20231106'
let friendlyDate = `${year}년 ${month}월 ${day}일`; //현재 날짜 년월일로 표기

// 날짜 수정
let newbab = formattedDate;

function bab() {
	// API 엔드포인트 URL
	const bab_api_url = "https://open.neis.go.kr/hub/mealServiceDietInfo";
	
	// 필요한 파라미터 설정
	const bab_params = {
		KEY: "c14d61fef8954d718ab4d1f10bbae173",
		ATPT_OFCDC_SC_CODE: "Q10",
		SD_SCHUL_CODE: "8490058",
		MMEAL_SC_CODE: "2",
		MLSV_YMD: newbab,
		// MLSV_YMD: "20230913",
	};
	
	// API 요청 보내기
	fetch(`${bab_api_url}?${new URLSearchParams(bab_params)}`)
		.then((response) => response.text())
		.then((full_text) => {
			// 줄 단위로 나누기
			const lines = full_text.split("\n");
	
			// 5번째 줄 출력
			const lunch_menu = lines[19];
	
			// 필요없는 것들 제거
			let cleanThings = lunch_menu;
			const removeNumbers = /[0-9]/g;
			const removeSpecial = /[<>!().[\]]/g;
			cleanThings = cleanThings
				.replace(removeNumbers, "")
				.replace(removeSpecial, "");
			cleanThings = cleanThings.replace("/DDISH_NM", "");
			cleanThings = cleanThings.replace("DDISH_NM", "");
			cleanThings = cleanThings.replace("DDISH_NM", "");
			cleanThings = cleanThings.replace("CDATA", "");
			cleanThings = cleanThings.replace("br/", "\n");
			cleanThings = cleanThings.replace("br/", "\n");
			cleanThings = cleanThings.replace("br/", "\n");
			cleanThings = cleanThings.replace("br/", "\n");
			cleanThings = cleanThings.replace("br/", "\n");
			cleanThings = cleanThings.replace("br/", "\n");
			cleanThings = cleanThings.replace("br/", "\n");
			cleanThings = cleanThings.replace("/", " + ");
			cleanThings = cleanThings.replace("/", " + ");
			cleanThings = cleanThings.replace("/", " + ");
			cleanThings = cleanThings.replace("/", " + ");
	
			const menuResult = cleanThings.substring(4);
	
			// 날짜 + 결과를 HTML에 표시
			const menuResultContainer = document.getElementById("menuResultContainer");
			menuResultContainer.innerText = friendlyDate + "\n\n" + menuResult;
	
			// 날짜를 HTML에 표시
			const dateDisplayElement = document.getElementById("dateDisplay");
			dateDisplayElement.innerText = `${friendlyDate}`;
	
			console.log(menuResult); // 테스트용 로그 표시
		})
		.catch((error) => console.error(error));
}	

bab()