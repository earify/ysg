let createdTable; // 이전에 생성된 표를 저장할 변수

async function plzman() {
  console.log("plzman");
  const tableContainer = document.getElementById("table-container");
  
  // 이전에 생성된 표가 있을 경우 제거
  if (createdTable) {
    tableContainer.removeChild(createdTable);
  }
  
  // 새로운 표 생성
  createdTable = document.createElement("table");
  tableContainer.appendChild(createdTable);
  
  // 표 초기화 및 배열 생성
  let table = new Array(rows);
  for (let i = 0; i < rows; i++) {
    table[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      table[i][j] = "";
    }
  }
  
  // 열의 제목 추가
  const titleRow = createdTable.insertRow();
  for (let i = 0; i < cols; i++) {
    const titleCell = titleRow.insertCell();
    titleCell.textContent = columnTitles[i];
  }
  
  // 행과 열의 제목 추가 (데이터는 비워져 있음)
  for (let i = 0; i < rows; i++) {
    const dataRow = createdTable.insertRow();
    const rowTitleCell = dataRow.insertCell();
    rowTitleCell.textContent = rowTitles[i];
    
    for (let j = 1; j < cols; j++) {
      const dataCell = dataRow.insertCell();
      dataCell.textContent = table[i][j];
    }
  }
}
