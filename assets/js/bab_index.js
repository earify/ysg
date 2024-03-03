// 
let babtoday = new Date();
// 아래 세 줄을 추가하여 formattedDate를 먼저 정의합니다.
const year = babtoday.getFullYear();
const month = (babtoday.getMonth() + 1).toString().padStart(2, "0");
const day = babtoday.getDate().toString().padStart(2, "0");
const formattedDate = `${year}${month}${day}`; // 현재 날짜 8자리로 표기

function bab(whatday) {
  console.log('밥 함수 작동')
  // API 엔드포인트 URL
  const bab_api_url = "https://open.neis.go.kr/hub/mealServiceDietInfo";
  
  // 필요한 파라미터 설정
  const bab_params = {
    KEY: "c14d61fef8954d718ab4d1f10bbae173",
    ATPT_OFCDC_SC_CODE: "Q10",
    SD_SCHUL_CODE: "8490058",
    MMEAL_SC_CODE: "2",
    MLSV_YMD: whatday,
  };
  
  // API 요청 보내기
  fetch(`${bab_api_url}?${new URLSearchParams(bab_params)}`)
    .then((response) => response.text())
    .then((full_text) => {
      // 줄 단위로 나누기
      lines = full_text.split("\n");
      kepler = lines[2]

      if (kepler[1] == 'm') {
        console.log(kepler[1])
        let lunch_menu = lines[19];
    
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

        menuResult = cleanThings.substring(4);
        console.log(menuResult); // 테스트용 로그 표시

        // 결과를 HTML에 표시
        let menuResultContainer = document.getElementById("menuResultContainer");
        menuResultContainer.innerText = menuResult ;
    
      } 
      else {
        let menuResult = '오늘은 급식이 없습니다'
        console.log(menuResult); // 테스트용 로그 표시

        // 결과를 HTML에 표시
        let menuResultContainer = document.getElementById("menuResultContainer");
        menuResultContainer.innerText = menuResult;
      }
  })
  // .catch((error) => console.error(error));
}	

bab(formattedDate)
