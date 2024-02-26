let currentMonth = 2; // 5월부터 시작
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

        // 특정 날짜에 이벤트 추가 (2024년 5월 15일에 "사과" 추가)
        if (currentYear === 2024 && currentMonth === 2 && currentDay === 15) {
          const eventElement = document.createElement("div");
          eventElement.classList.add("event");
          eventElement.innerText = "중간고사 같은 쪽지시험\n기말고사\n3월모고\n국어생일";
          dayElement.appendChild(eventElement);
        }

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
