// 표를 만들 데이터
const timetableData = {
  '1반': {
      '1교시': '국어',
      '2교시': '영어',
      '3교시': '수학',
      '4교시': '사회',
      '5교시': '과학',
      '6교시': '', // 비어있는 셀
      '7교시': '', // 비어있는 셀
  },
  '2반': {
      '1교시': '국어',
      '2교시': '영어',
      '3교시': '수학',
      '4교시': '사회',
      '5교시': '과학',
      '6교시': '기가',
      '7교시': '음악',
  },
  '3반': {
      '1교시': '',
      '2교시': '',
      '3교시': '',
      '4교시': '',
      '5교시': '',
      '6교시': '',
      '7교시': '',
  },
  '4반': {
      '1교시': '',
      '2교시': '',
      '3교시': '',
      '4교시': '',
      '5교시': '',
      '6교시': '',
      '7교시': '',
  },
  '5반': {
      '1교시': '',
      '2교시': '',
      '3교시': '',
      '4교시': '',
      '5교시': '',
      '6교시': '',
      '7교시': '',
  },
  '6반': {
      '1교시': '',
      '2교시': '',
      '3교시': '',
      '4교시': '',
      '5교시': '',
      '6교시': '',
      '7교시': '',
  },
  '7반': {
      '1교시': '',
      '2교시': '',
      '3교시': '',
      '4교시': '',
      '5교시': '',
      '6교시': '',
      '7교시': '',
  },
  '8반': {
      '1교시': '',
      '2교시': '',
      '3교시': '',
      '4교시': '',
      '5교시': '',
      '6교시': '',
      '7교시': '',
  },
};

// 표 생성 함수
function createTimetable(data) {
  const tableContainer = document.getElementById('table-container');

  // 새로운 테이블 엘리먼트 생성
  const table = document.createElement('table');
  table.classList.add('timetable'); // 테이블에 클래스 추가
  table.border = '1';

  // 헤더 행 생성
  const headerRow = table.insertRow();
  const headerClassCell = headerRow.insertCell();
  headerClassCell.textContent = '반';
  headerClassCell.classList.add('class-header'); // 반 헤더 셀에 클래스 추가

  // 각 교시에 대한 열 생성
  for (const time in timetableData['1반']) {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = time;
      headerCell.classList.add('time-header'); // 교시 헤더 셀에 클래스 추가
  }

  // 각 반에 대한 행 생성
  for (const className in data) {
      const classData = data[className];

      // 행 생성
      const row = table.insertRow();
      row.classList.add('class-row'); // 반 행에 클래스 추가

      const classCell = row.insertCell();
      classCell.textContent = className;
      classCell.classList.add('class-header'); // 반 헤더 셀에 클래스 추가

      // 반의 데이터에 대한 열 생성
      for (const time in classData) {
          const cell = row.insertCell();
          cell.textContent = classData[time];
          cell.classList.add('class-cell'); // 각 셀에 클래스 추가
      }
  }

  // 테이블을 컨테이너에 추가
  tableContainer.appendChild(table);
}

// 표 생성 함수 호출
createTimetable(timetableData);
