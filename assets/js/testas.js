const currentDate = new Date(); // 변수생성
const year = currentDate.getFullYear(); // 연도
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 월 (0부터 시작하므로 1을 더해줌)
const day = currentDate.getDate().toString().padStart(2, "0"); // 일
const formattedDate = `${year}${month}${day}`; // 현재 날짜 8자리로 표기
// let formattedDate = '20231106'
let friendlyDate = `${year}년 ${month}월 ${day}일`; //현재 날짜 년월일로 표기

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
      lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  }

  const newYear = currentDate.getFullYear();
  const newMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const newDay = currentDate.getDate().toString().padStart(2, '0');

  return `${newYear}${newMonth}${newDay}`;
}

let lines = '';
function bab(whatday) {
  // API 엔드포인트 URL
  const bab_api_url = "https://open.neis.go.kr/hub/mealServiceDietInfo";
  
  // 필요한 파라미터 설정
  const bab_params = {
    KEY: "c14d61fef8954d718ab4d1f10bbae173",
    ATPT_OFCDC_SC_CODE: "Q10",
    SD_SCHUL_CODE: "8490058",
    MMEAL_SC_CODE: "2",
    MLSV_YMD: whatday,
    // MLSV_YMD: "20230913",
  };
  
  // API 요청 보내기
  fetch(`${bab_api_url}?${new URLSearchParams(bab_params)}`)
    .then((response) => response.text())
    .then((full_text) => {
      // 줄 단위로 나누기
      lines = full_text.split("\n");

      let lunch_menu = lines[1]

      if (lines[2][2] == 'm') {
        lunch_menu = lines[19];
      }
      else {
        lunch_menu = lines[3];
      }

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

      let menuResult = cleanThings.substring(4);

      // 날짜 + 결과를 HTML에 표시
      let menuResultContainer = document.getElementById("menuResultContainer");
      menuResultContainer.innerText = friendlyDate + "\n\n" + menuResult;
  
      // 날짜를 HTML에 표시
      let dateDisplayElement = document.getElementById("dateDisplay");
      dateDisplayElement.innerText = `${friendlyDate}`;
  
      console.log(menuResult); // 테스트용 로그 표시
      })
      .catch((error) => console.error(error));
    }

let babday = addDaysToDate(formattedDate, 0); // 수정된 부분

document.addEventListener("DOMContentLoaded", function () {
  let asd = 0; // 초기 값 설정

  // HTML 요소 참조
  const valueDisplay = document.getElementById("valueDisplay");
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");
  
  // 초기 값 표시
  updateDisplay();
  
  // 왼쪽 화살표 클릭 시 이벤트 리스너 등록
  leftArrow.addEventListener("click", function () {
    asd -= 1;
    updateDisplay();
    babday = addDaysToDate(formattedDate, asd); // 수정된 부분
    babday = String(babday)
    bab(babday);
    console.log(babday);
    console.log(lines[2]);
  });
  
  // 오른쪽 화살표 클릭 시 이벤트 리스너 등록
  rightArrow.addEventListener("click", function () {
    asd += 1;
    updateDisplay();
    babday = addDaysToDate(formattedDate, asd); // 수정된 부분
    babday = String(babday)
    bab(babday);
    console.log(babday);
    console.log(lines[2]);
  });

  // 값 업데이트 및 표시 함수
  function updateDisplay() {
    valueDisplay.textContent = asd;
  }
});