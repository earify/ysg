// API 엔드포인트 URL
const tt_api_url = "https://open.neis.go.kr/hub/hisTimetable";

// 필요한 파라미터 설정
const tt_params = {
    'KEY': 'c14d61fef8954d718ab4d1f10bbae173',
    'ATPT_OFCDC_SC_CODE': 'Q10',
    'SD_SCHUL_CODE': '8490058',
    'ALL_TI_YMD':'20230913',
    'GRADE': '1',
    'CLASS_NM': '1',
};

// API 요청 보내기
fetch(`${tt_api_url}?${new URLSearchParams(tt_params)}`)
.then(response => response.text())
.then(full_text => {
    // 줄 단위로 나누기
    const lines = full_text.split('\n');
    let mainTable_preview = ''
    let mainTable_webview = ''
    // let subTable = String
    // 리스트의 각 요소를 확인
    for (let i = 0; i < lines.length; i++) {
        // 현재 요소에 "perio"가 포함되어 있는지 확인
        if (lines[i].includes('PERIO')) {
            let perio_num = String(lines[i]);
            perio_num = perio_num.substring(20,21);
            // 포함되어 있다면 출력
            // console.log(perio_num);
            mainTable_preview += 'ㅤㅤㅤㅤㅤㅤㅤㅤㅤ' + perio_num + ' | '
            mainTable_webview += perio_num + ' | '
        }
        
        if (lines[i].includes('ITRT_CNTNT')) {
            let itrt_num = String(lines[i]);
            itrt_num = itrt_num.substring(25,34);
            itrt_num = itrt_num.replace('[보강]','bogang ')
            itrt_num = itrt_num.replace(']','')
            itrt_num = itrt_num.replace(']','')
            itrt_num = itrt_num.replace('>','')
            itrt_num = itrt_num.replace('<','')
            itrt_num = itrt_num.replace('/','')
            itrt_num = itrt_num.replace('I','')
            itrt_num = itrt_num.replace('T','')
            itrt_num = itrt_num.replace('bogang','[보강]') // 다듬기
            // console.log(itrt_num);

            mainTable_preview += itrt_num + '\n'
            mainTable_webview += itrt_num + '\n'
        }
    }
    const TableForPre = mainTable_preview;
    const TableForWeb = mainTable_webview;
    console.log(TableForPre);

    const DisplayTable = document.getElementById('timeTables1');
    DisplayTable.innerText = TableForPre;
    // const DisplayTable = document.getElementById('timeTables1');
    // DisplayTable.innerText = TableForWeb;
})
.catch(error => console.error(error));