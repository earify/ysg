function loadCSV(index) {
  // .csv 파일 경로 설정
  var csvFilePath = `assets/class.csv/${index}.csv`;

  // jQuery를 사용하여 .csv 파일 가져오기
  $.get(csvFilePath, function (csvData) {
    // 각 행과 열을 나누기
    var rows = csvData.split("\n");

    // HTML 테이블 초기화
    var table = $('<table class="csv-table"></table>');

    // HTML 테이블에 데이터 추가
    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].split(",");
      var row = $("<tr></tr>");
      for (var j = 0; j < cells.length; j++) {
        var cell = $("<td></td>").text(cells[j]);

        // 각 열에 대한 배경색 클래스 추가
        if (j === 0) {
          cell.addClass("column1");
        } else if (j === 1) {
          cell.addClass("column2");
        } else if (j === 2) {
          cell.addClass("column3");
        }

        // 각 열에 대한 배경색 클래스 추가
        if (i === 0) {
          cell.addClass("row1");
        } else if (i === 1) {
          cell.addClass("row2");
        }
        row.append(cell);
      }
      table.append(row);
    }

    // 생성한 테이블을 tablesContainer에 추가
    $("#tablesContainer").append(table);

    adjustColumnHeight();
  });
  // 열 높이를 조정하는 함수
  function adjustColumnHeight() {
    // 각 열의 높이를 원하는 값으로 설정 (예: 50px)
    $(".csv-table").find("td").css("height", "10px");
  }
}

// 페이지 로드 후 1.csv부터 8.csv까지 표시하는 함수 호출
$(document).ready(function () {
  for (var i = 1; i <= 8; i++) {
    loadCSV(i);
  }
});
