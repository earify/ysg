// 현재 카드와 예측을 저장하는 변수 선언
let currentCard = null;
let prediction = null;

// 카드를 뽑는 함수
function drawCard() {
  const suits = ["\u2660", "\u2666", "\u2665", "\u2663"]; // 스페이드, 다이아몬드, 하트, 클로버
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  // 랜덤으로 모양과 숫자 선택
  const suitIndex = Math.floor(Math.random() * suits.length);
  const rankIndex = Math.floor(Math.random() * ranks.length);
  const suit = suits[suitIndex];
  const rank = ranks[rankIndex];
  const { color } = calculateColorAndSuit(suit); // 모양에 따른 색깔 계산

  // 카드를 그릴 요소들 찾기
  const topLeft = document.querySelector(".top-left");
  const bottomRight = document.querySelector(".bottom-right");
  const center = document.querySelector(".center");

  // 카드에 모양과 숫자 삽입
  topLeft.innerHTML = `<span style="color: ${color}">${rank}</span><br><span style="color: ${color}">${suit}</span>`;
  bottomRight.innerHTML = `<span style="color: ${color}">${rank}</span><br><span style="color: ${color}">${suit}</span>`;
  center.innerHTML = `<span style="color: ${color}">${rank}</span><br><span style="color: ${color}">${suit}</span>`;

  return { suit, rank, color, rankIndex };
}

// 배팅 시작 함수
function startBetting() {
  // 배팅 금액과 예측이 올바르게 입력되었는지 확인
  const betAmount = document.getElementById("betAmount").value;
  if (betAmount && betAmount > 0 && prediction) {
    // 현재 카드를 뽑고 보여주기
    currentCard = drawCard();
    console.log(`Current card: ${currentCard.rank} of ${currentCard.suit}`);
    
    // 새로운 카드 그리기
    const cardContainer = document.querySelector(".card");
    cardContainer.innerHTML = `
      <div class="top-left">${currentCard.rank}<br>${currentCard.suit}</div>
      <div class="center">${currentCard.rank}<br>${currentCard.suit}</div>
      <div class="bottom-right">${currentCard.rank}<br>${currentCard.suit}</div>
    `;

    // 다음 카드 뽑기
    const nextCard = drawCard();
    const multiplier = calculateMultiplier(currentCard, nextCard);
    const winnings = betAmount * multiplier;
    console.log(`Next card: ${nextCard.rank} of ${nextCard.suit}`);
    
    // 결과 출력
    if (multiplier === 0) {
      alert("예측에 실패하여 수익은 0원입니다.");
    } else {
      alert(`다음 카드는 ${nextCard.rank} of ${nextCard.suit}입니다. 당신의 배팅 금액은 ${betAmount}이고, 당신의 수익은 ${winnings}입니다.`);
    }
  } else {
    alert("올바른 배팅 금액과 예측을 입력하세요.");
  }
}

// 예측 설정 함수
function predict(type) {
  prediction = type;
  document.getElementById("predictionStatus").innerText = `예측 상태: ${prediction}`;
  console.log(`Prediction: ${prediction}`);
}

// 예측 취소 함수
function cancelPrediction() {
  prediction = null;
  document.getElementById("predictionStatus").innerText = `예측 상태: 아직 예측되지 않음`;
}

// 배팅 배수 계산 함수
function calculateMultiplier(currentCard, nextCard) {
  if (prediction === "higher" && nextCard.rankIndex > currentCard.rankIndex) {
    return 1.5;
  } else if (prediction === "lower" && nextCard.rankIndex < currentCard.rankIndex) {
    return 1.5;
  } else if (prediction === currentCard.rank) {
    return 1.5; // 예측한 숫자가 나올 경우 배팅 금액의 1.5배를 받습니다.
  } else if (prediction === currentCard.color && currentCard.color === nextCard.color) {
    return 1.2;
  } else {
    return 0;
  }
}

// 모양과 색깔 계산 함수
function calculateColorAndSuit(suit) {
  const suits = ["\u2660", "\u2666", "\u2665", "\u2663"];
  const colors = ["black", "red", "red", "black"]; // 클로버가 검은색입니다.
  const suitIndex = suits.findIndex(s => s === suit);
  return { suit: suits[suitIndex], color: colors[suitIndex] };
}
