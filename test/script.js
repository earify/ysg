function drawCard() {
  const suits = ["\u2660", "\u2666", "\u2665", "\u2663"]; // 스페이드, 다이아몬드, 하트, 클로버
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  const suitIndex = Math.floor(Math.random() * 4);
  const rankIndex = Math.floor(Math.random() * 13);
  const suit = suits[suitIndex];
  const rank = ranks[rankIndex];
  const color = (suit === "\u2662" || suit === "\u2661") ? "red" : "black";

  const topLeft = document.querySelector(".top-left");
  const bottomRight = document.querySelector(".bottom-right");
  const center = document.querySelector(".center");

  topLeft.innerHTML = `<span style="color: ${color}">${rank}</span><br><span style="color: ${color}">${suit}</span>`;
  bottomRight.innerHTML = `<span style="color: ${color}">${rank}</span><br><span style="color: ${color}">${suit}</span>`;
  center.innerHTML = `<span style="color: ${color}">${rank}</span><br><span style="color: ${color}">${suit}</span>`;

  console.log(suitIndex, rankIndex)
}
