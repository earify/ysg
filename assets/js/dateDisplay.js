export function displayCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  // 결과를 HTML에 표시
  const dateDisplayElement = document.getElementById('dateDisplay');
  dateDisplayElement.innerText = formattedDate;

  return {
    year,
    month,
    day,
    formattedDate,
    dateDisplayElement,
};
}
