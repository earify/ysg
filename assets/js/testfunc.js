let lines;
let kepler;
let mainTable_view = "";
let TableForPre;
let itrt_num;
let realTable;
// let friendlyDate;

async function ttr(whatgrade, whatclass, whatday) {
  console.log("시간표 함수 작동"); //삭제

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
      mainTable_view = ''
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
          realTable = mainTable_view.split("\n")
        } 
      }
    }
    if (kepler[1] == "R") {
      mainTable_view = "\nX";
      realTable = mainTable_view.split("\n")
    } 
      
      TableForPre = mainTable_view;
      const DisplayTable1 = document.getElementById("timeTables1");
    DisplayTable1.innerText = TableForPre;
    
    console.log(TableForPre); // 테스트용 로그 표시
  } catch (error) {
    console.error(error);
  }
} 

