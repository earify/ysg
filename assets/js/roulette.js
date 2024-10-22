const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const resultDisplay = document.getElementById('result');
const totalAttemptsDisplay = document.getElementById('totalAttempts'); // 추가

// 각 세그먼트의 확률과 각도 정보 수정
// 세그먼트를 11개로 나누기 (gkgkgkgk 5칸, 꽝 5칸, 초코파이 1칸)
const segments = [
  { name: '꽝', probability: 0.35, startAngle: 0, endAngle: 43.2 },   // 35%
  { name: '오레오', probability: 0.60, startAngle: 43.2, endAngle: 57.6 },      // 60%
  { name: '꽝', probability: 0.35, startAngle: 57.6, endAngle: 100.8 }, // 35%
  { name: '하리보', probability: 0.60, startAngle: 100.8, endAngle: 133.2 },    // 60%
  { name: '꽝', probability: 0.35, startAngle: 133.2, endAngle: 176.4 }, // 35%
  { name: '하리보', probability: 0.60, startAngle: 176.4, endAngle: 208.8 },     // 60%
  { name: '꽝', probability: 0.35, startAngle: 208.8, endAngle: 252 }, // 35%
  { name: '하리보', probability: 0.60, startAngle: 252, endAngle: 284.4 },     // 60%
  { name: '꽝', probability: 0.35, startAngle: 284.4, endAngle: 327.6 }, // 35%
  { name: '하리보', probability: 0.60, startAngle: 327.6, endAngle: 360 }      // 60%
];




let isSpinning = false;
let totalSpins = 0;
let currentRotation = 0;

function getRandomDegree() {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const segment of segments) {
    cumulativeProbability += segment.probability;
    if (random <= cumulativeProbability) {
      const randomAngle = segment.startAngle + Math.random() * (segment.endAngle - segment.startAngle);
      return (Math.floor(Math.random() * 5) + 5) * 360 + (360 - randomAngle);
    }
  }
  return 0;
}

function getResult(degree) {
  const normalizedDegree = degree % 360;
  const finalAngle = 360 - normalizedDegree;

  for (const segment of segments) {
    if (finalAngle >= segment.startAngle && finalAngle < segment.endAngle) {
      return segment.name;
    }
  }
  return '꽝';
}

spinButton.addEventListener('click', () => {
  if (isSpinning) return;

  isSpinning = true;
  spinButton.disabled = true;
  resultDisplay.textContent = '돌리는 중...';

  const degree = getRandomDegree();
  currentRotation += degree;

  wheel.style.transform = `rotate(${currentRotation}deg)`;
  totalSpins++;

  // 총 시도 횟수 업데이트
  totalAttemptsDisplay.textContent = `총 시도 횟수: ${totalSpins}`; // 추가

  setTimeout(() => {
    const result = getResult(currentRotation);
    resultDisplay.textContent = `결과: ${result}!`;
    console.log(`결과: ${result}!`);
    isSpinning = false;
    spinButton.disabled = false;

    // if (totalSpins % 10 === 0) {
    //   resultDisplay.textContent += `\n지금까지 ${totalSpins}번 시도했습니다!`;
    // }
  }, 4100);
});
