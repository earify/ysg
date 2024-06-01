let originalCard = cardGen();
let money = 1000;
let prediction = "";

document.addEventListener("DOMContentLoaded", () => {
    displayCard("new-card", originalCard);
    updateStatus();
});

function cardGen() {
    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    return `${randomRank} ${randomSuit}`;
}

function displayCard(elementId, card) {
    const [rank, suit] = card.split(" ");
    const isRed = suit === "♥" || suit === "♦";

    const cardElement = document.getElementById(elementId);
    cardElement.classList.toggle("red", isRed);

    document.getElementById("new-card-rank-top").textContent = rank;
    document.getElementById("new-card-suit-top").textContent = suit;
    document.getElementById("new-card-center").textContent = suit;
    document.getElementById("new-card-rank-bottom").textContent = rank;
    document.getElementById("new-card-suit-bottom").textContent = suit;

    const elements = [
        "new-card-rank-top",
        "new-card-suit-top",
        "new-card-center",
        "new-card-rank-bottom",
        "new-card-suit-bottom"
    ];

    elements.forEach(elementId => {
        document.getElementById(elementId).className = isRed ? 'red' : '';
    });
}

function predict(pred) {
    prediction = pred;
    updateStatus();
}

function startBetting() {
    if (!prediction) {
        alert("예상을 선택하세요!");
        return;
    }

    const betAmount = parseInt(document.getElementById("betAmount").value);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert("유효한 배팅 금액을 입력하세요!");
        return;
    }

    const newCard = cardGen();
    const resultMessage = cal(originalCard, newCard, prediction, betAmount);

    displayCard("new-card", newCard);
    document.getElementById("result").textContent = resultMessage;
    originalCard = newCard;
    updateStatus();
}

function cal(a, b, prediction, betAmount) {
    let resultMessage = "다시 시도하세요!";

    const rankOrder = [
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
    ];
    const aRank = rankOrder.indexOf(a.split(" ")[0]);
    const bRank = rankOrder.indexOf(b.split(" ")[0]);
    const bSuit = b.split(" ")[1];
    const bColor = bSuit === "♥" || bSuit === "♦" ? "red" : "black";

    const bettingMultiplier = betting_calculator(aRank, prediction);

    if (prediction === "higher" && bRank > aRank) {
        money += betAmount * bettingMultiplier;
        resultMessage = `축하합니다! ${betAmount * bettingMultiplier}원을 벌었습니다!`;
    } else if (prediction === "lower" && bRank < aRank) {
        money += betAmount * bettingMultiplier;
        resultMessage = `축하합니다! ${betAmount * bettingMultiplier}원을 벌었습니다!`;
    } else if ((prediction === "red" || prediction === "black") && bColor === prediction) {
        money += betAmount * bettingMultiplier;
        resultMessage = `축하합니다! ${betAmount * bettingMultiplier}원을 벌었습니다!`;
    } else {
        money -= betAmount;
        resultMessage = `아쉽습니다! ${betAmount}원을 잃었습니다.`;
    }

    return resultMessage;
}

function updateStatus() {
    document.getElementById("predictionStatus").textContent = `예측 상태: ${
        prediction ? prediction : "아직 예측되지 않음"
    }`;
    document.getElementById("balance").textContent = `현재 잔액: ${money}원`;
}

function betting_calculator(OC, prediction) {
    let betting_multiplier = 1.0;

    const higherMultipliers = [1.5, 1.5, 1.5, 1.75, 1.75, 1.75, 1.75, 2, 2, 2.5, 2.5, 3, 5];
    const lowerMultipliers = [100, 5, 2.5, 2.5, 2, 2, 1.75, 1.75, 1.75, 1.75, 1.5, 1.5, 1.5];

    if (prediction === "higher") {
        betting_multiplier = higherMultipliers[OC];
    } else if (prediction === "lower") {
        betting_multiplier = lowerMultipliers[OC];
    } else if (prediction === "red" || prediction === "black") {
        betting_multiplier = 1.25;
    }

    return betting_multiplier;
}
