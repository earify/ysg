let currentMonth = 3; // 3월부터 시작
let currentYear = 2024;


function updateCalendar() {
  const calendarElement = document.getElementById("currentCalendar");
  calendarElement.innerHTML = ""; // 달력 비우기

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayIndex = new Date(`${currentYear}-${currentMonth}-1`).getDay();

  const dayNames = ["일      ", "월      ", "화      ", "수      ", "목      ", "금      ", "토      "];

  // 달력 헤더 생성
  const header = document.createElement("div");
  header.classList.add("calendar-header");
  header.innerText = `${currentYear}년 ${currentMonth}월`;
  calendarElement.appendChild(header);

  // 요일 생성
  const daysRow = document.createElement("div");
  daysRow.classList.add("days");
  dayNames.forEach((dayName) => {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.innerText = dayName;
    daysRow.appendChild(dayElement);
  });
  calendarElement.appendChild(daysRow);

  // 날짜 생성
  let currentDay = 1;
  for (let row = 0; row < 6; row++) {
    // 6주로 고정
    const weekRow = document.createElement("div");
    weekRow.classList.add("days");
    for (let col = 0; col < 7; col++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");

      // 현재 날짜가 이번 달의 첫 날짜 이전이면 빈 칸으로 처리
      if (row === 0 && col < firstDayIndex) {
        dayElement.innerText = "";
      } else if (currentDay > daysInMonth) {
        // 현재 날짜가 이번 달의 마지막 날짜 이후면 빈 칸으로 처리
        dayElement.innerText = "";
      } else {
        // 텍스트 위치 조정
        dayElement.innerHTML = `<div class="day-text">${currentDay}</div>`;

        // 일요일과 토요일에 색상 적용
        if (col === 0) {
          dayElement.classList.add("sunday");
        } else if (col === 6) {
          dayElement.classList.add("saturday");
        }

        // 그냥 함수
        function addEvent(y,m,d,whatevent){
          // 특정 날짜에 이벤트 추가 (2024년 5월 15일에 "사과" 추가)
          if (currentYear === y && currentMonth  === m && currentDay === d) {
            const eventElement = document.createElement("div");
            eventElement.classList.add("event");
            eventElement.innerText = whatevent;
            dayElement.appendChild(eventElement);
          }
        }

        // for (i = 1; i <= 12; i++){
        //   for (j = 1; j <= 31; i++){
        //     if (i==3, )
        // }
        addEvent(2024,3,4,"신입생 OT")
        addEvent(2024,3,15,"1-7,8 건강검진")
        addEvent(2024,3,22,"3-교육과정설명회")
        addEvent(2024,3,25,"2-교육과정설명회")
        addEvent(2024,3,26,"1-교육과정설명회")
        addEvent(2024,3,28,"모의고사")
        addEvent(2024,4,9,"1-영어듣기평가")
        addEvent(2024,4,11,"2-영어듣기평가")
        addEvent(2024,4,12,"3-영어듣기평가")
        addEvent(2024,4,10,"22대 국회의원 선거(?)")
        addEvent(2024,4,15,"체육대회")
        addEvent(2024,4,16,"체육대회")
        addEvent(2024,5,1,"중간고사 (점심없음)")
        addEvent(2024,5,2,"중간고사")
        addEvent(2024,5,3,"중간고사")
        addEvent(2024,5,6,"대체휴일")
        addEvent(2024,5,8,"3-모의고사")
        addEvent(2024,5,13,"1-1,2 건강검진")
        addEvent(2024,5,14,"1-3,4 건강검진")
        addEvent(2024,5,16,"1-5,6 건강검진")
        addEvent(2024,5,27,"수련회\n수학여행\n3-단축수업")
        addEvent(2024,5,28,"수련회\n수학여행\n3-단축수업")
        addEvent(2024,5,29,"수련회\n수학여행\n3-단축수업")
        addEvent(2024,5,30,"에듀페어 박람회\n3-단축수업")
        addEvent(2024,5,31,"3-단축수업")
        addEvent(2024,6,4,"모의고사")
        addEvent(2024,6,7,"재량휴업")
        addEvent(2024,6,13,"학부모 공개수업")
        addEvent(2024,7,2,"1-기말고사")
        addEvent(2024,7,3,"1-기말고사")
        addEvent(2024,7,4,"1-기말고사")
        addEvent(2024,7,5,"1-기말고사")
        addEvent(2024,7,11,"3-모의고사")
        addEvent(2024,7,18,"사정회")
        addEvent(2024,7,19,"여름방학 선언")
        
        addEvent(2024,7,22,"여름방학 방과후~")
        addEvent(2024,8,2,"~여름방학 방과후")
        
        addEvent(2024,8,16,"개학")
        addEvent(2024,9,4,"모의고사")
        addEvent(2024,9,9,"3-중간고사")
        addEvent(2024,9,10,"3-중간고사\n1-영어듣기")
        addEvent(2024,9,11,"3-중간고사\n2-영어듣기")
        addEvent(2024,9,12,"3-영어듣기")
        addEvent(2024,9,30,"1,2-중간고사\n3-기말고사")
        addEvent(2024,10,1,"개교기념일\n1,2-중간고사\n3-기말고사")
        addEvent(2024,10,2,"1,2-중간고사\n3-기말고사")
        addEvent(2024,10,4,"재량휴업일")
        addEvent(2024,10,15,"모의고사")
        addEvent(2024,10,25,"자공고 수업 나눔의 날\n학부모 공개수업")
        addEvent(2024,10,31,"3-J-FINAL 모의고사")
        addEvent(2024,11,14,"2-재량휴업\n3-수능")
        addEvent(2024,12,4,"1,2-기말고사")
        addEvent(2024,12,5,"1,2-기말고사")
        addEvent(2024,12,6,"1,2-기말고사")
        addEvent(2024,12,9,"1,2-기말고사")
        addEvent(2024,12,10,"1,2-단축수업")
        addEvent(2024,12,11,"1,2-단축수업")
        addEvent(2024,12,12,"1,2-단축수업")
        addEvent(2024,12,13,"1,2-단축수업")
        addEvent(2024,12,26,"사정회")
        addEvent(2024,12,27,"장대축제")
        addEvent(2024,12,31,"겨울방학 선언")



        currentDay++;
      }

      weekRow.appendChild(dayElement);
    }
    calendarElement.appendChild(weekRow);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const calendarElement = document.getElementById('currentCalendar');

  // 이벤트 처리 함수
  function showEventPopup(eventContent) {
      // 팝업 생성
      const popup = document.createElement('div');
      popup.classList.add('event-popup');
      popup.innerHTML = `<div class="event-content">${eventContent}</div>`;
      document.body.appendChild(popup);

      // 닫기 버튼 추가
      const closeButton = document.createElement('button');
      closeButton.classList.add('close-button');
      closeButton.innerText = '닫기';
      closeButton.addEventListener('click', function () {
          document.body.removeChild(popup);
      });
      popup.appendChild(closeButton);
  }

  // 각 날짜 칸에 이벤트 처리 추가
  const dayElements = calendarElement.querySelectorAll('.day');
  dayElements.forEach(function (dayElement) {
      dayElement.addEventListener('click', function () {
          const eventContent = dayElement.getAttribute('data-event');
          if (eventContent) {
              showEventPopup(eventContent);
          }
      });
  });
});
function prevMonth() {
  currentMonth--;
  if (currentMonth === 0) {
    currentMonth = 12;
    currentYear--;
  }
  updateCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth === 13) {
    currentMonth = 1;
    currentYear++;
  }
  updateCalendar();
}

// 초기 달력 표시
updateCalendar();
