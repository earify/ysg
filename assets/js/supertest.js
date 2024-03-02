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

let a = 10;
// 사용 예시
const currentDate = "20230124";
const newDate = addDaysToDate(currentDate, a);

console.log(newDate); // 출력: "20230203"

