var today = new Date();
var dayOfWeek = today.getDay();

// 0부터 일요일, 1부터 월요일, ..., 6부터 토요일
console.log(dayOfWeek);

// 실제 요일 이름 얻기
var daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
var dayName = daysOfWeek[dayOfWeek];
console.log(dayName);

var today = new Date();
var tomorrow = new Date(today);
console.log(tomorrow);
tomorrow.setDate(today.getDate() + 1);

// 내일 날짜 출력
console.log(tomorrow);
