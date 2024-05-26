let originalCard;
let money = 1000;
let prediction = null;

window.onload = function() {
    originalCard = cardGen();
    document.getElementById('original-card').textContent = `원래 카드: ${originalCard}`;
}

function cardGen() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    return `${randomRank} ${randomSuit}`;
}

function cal(a, b, prediction) {
    let resultMessage = '다시 시도하세요!';
    const betAmount = parseInt(document.getElementById('betAmount').value);
    let winnings = 0;

    const rankOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const aRank = rankOrder.indexOf(a.split(' ')[0]);
    const bRank = rankOrder.indexOf(b.split(' ')[0]);

    const bColor = (b.includes('♥') || b.includes('♦')) ? 'red' : 'black';

    if (prediction === 'higher' && bRank > aRank) {
        winnings = 2 * betAmount;
        money += winnings;
        resultMessage = `와 샌즈! 배팅에 성공하여 ${winnings}원을 벌었습니다!`;
    } else if (prediction === 'lower' && bRank < aRank) {
        winnings = 2 * betAmount;
        money += winnings;
        resultMessage = `와 샌즈! 배팅에 성공하여 ${winnings}원을 벌었습니다!`;
    } else if (prediction === 'red' && bColor === 'red') {
        winnings = 2 * betAmount;
        money += winnings;
        resultMessage = `와 샌즈! 배팅에 성공하여 ${winnings}원을 벌었습니다!`;
    } else if (prediction === 'black' && bColor === 'black') {
        winnings = 2 * betAmount;
        money += winnings;
        resultMessage = `와 샌즈! 배팅에 성공하여 ${winnings}원을 벌었습니다!`;
    } else {
        resultMessage = '배팅에 실패하였습니다.';
    }

    return resultMessage;
}

function predict(pred) {
    prediction = pred;
    document.getElementById('predictionStatus').textContent = `예측 상태: ${pred}`;
}

function cancelPrediction() {
    prediction = null;
    document.getElementById('predictionStatus').textContent = '예측 상태: 아직 예측되지 않음';
}

function startBetting() {
    const betAmount = parseInt(document.getElementById('betAmount').value);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert('배팅 금액을 올바르게 입력하세요!');
        return;
    }

    if (!prediction) {
        alert('예상을 선택하세요!');
        return;
    }

    const newCard = cardGen();
    const resultMessage = cal(originalCard, newCard, prediction);

    const newCardRank = newCard.split(' ')[0];
    const newCardSuit = newCard.split(' ')[1];
    const newCardColorClass = (newCardSuit === '♥' || newCardSuit === '♦') ? 'red' : 'black';

    document.getElementById('new-card-rank-top').textContent = newCardRank;
    document.getElementById('new-card-suit-top').textContent = newCardSuit;
    document.getElementById('new-card-center').textContent = newCardSuit;
    document.getElementById('new-card-rank-bottom').textContent = newCardRank;
    document.getElementById('new-card-suit-bottom').textContent = newCardSuit;

    document.getElementById('new-card-rank-top').className = newCardColorClass;
    document.getElementById('new-card-suit-top').className = newCardColorClass;
    document.getElementById('new-card-center').className = newCardColorClass;
    document.getElementById('new-card-rank-bottom').className = newCardColorClass;
    document.getElementById('new-card-suit-bottom').className = newCardColorClass;

    document.getElementById('result').textContent = `${resultMessage} 현재 잔액: ${money}원`;

    originalCard = newCard;
    document.getElementById('original-card').textContent = `원래 카드: ${originalCard}`;

    cancelPrediction();
}
