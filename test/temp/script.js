let originalCard = cardGen();
let money = 0;

document.getElementById('original-card').textContent = `현재 카드: ${originalCard}`;

function cardGen() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    return `${randomRank} ${randomSuit}`;
}

function cal(a, b, prediction) {
    let resultMessage = '다시 시도하세요!';
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    let winnings = 0;

    const rankOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const aRank = rankOrder.indexOf(a.split(' ')[0]);
    const bRank = rankOrder.indexOf(b.split(' ')[0]);

    const bColor = (b.includes('♥') || b.includes('♦')) ? 'red' : 'black';

    if (prediction === 'higher' && bRank >= aRank) {
        winnings = 2 * betAmount;
        money += winnings;
        resultMessage = `+${winnings}`;
    } else if (prediction === 'lower' && bRank < aRank) {
        winnings = 2 * betAmount;
        money += winnings;
        resultMessage = `+${winnings}`;
    } else if (prediction === 'red' && bColor === 'red') {
        winnings = 2 * betAmount;
        money += winnings;
        resultMessage = `+${winnings}`;
    } else if (prediction === 'black' && bColor === 'black') {
        winnings = 2 * betAmount;
        money += winnings;
        resultMessage = `+${winnings}`;
    } else {
        resultMessage = '실패';
    }

    return resultMessage;
}

function placeBet(prediction) {
    const betAmount = parseInt(document.getElementById('bet-amount').value);

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

    document.getElementById('original-card').textContent = `현재 카드: ${originalCard}`;
    document.getElementById('new-card').textContent = `새로운 카드: ${newCard}`;
    document.getElementById('result').textContent = `${resultMessage} 현재 잔액: ${money}원`;

    originalCard = newCard;
}
