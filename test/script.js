// Firebase 구성
const firebaseConfig = {
  apiKey: "AIzaSyCW_IvizOEOiLU96ODpb_zr-AS_3BF3tQo",
  authDomain: "ysg-totoro.firebaseapp.com",
  databaseURL: "https://ysg-totoro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ysg-totoro",
  storageBucket: "ysg-totoro.appspot.com",
  messagingSenderId: "552068912089",
  appId: "1:552068912089:web:29e40221aef49bbf98ffc8",
  measurementId: "G-WZV210EN3C"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase 인증 및 Firestore 참조
const auth = firebase.auth();
const db = firebase.firestore();

let originalCard = cardGen();
let money = 0;
let prediction = "";

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged(user => {
      if (user) {
          document.getElementById('userStatus').textContent = `로그인 상태: ${user.email}`;
          loadUserData(user.uid);
      } else {
          document.getElementById('userStatus').textContent = '로그인 상태: 로그아웃됨';
          document.getElementById('balance').textContent = '현재 잔액: 0원';
      }
  });

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

function cancelPrediction() {
  prediction = "";
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

  saveUserData();
}

function cal(a, b, prediction, betAmount) {
  let resultMessage = "다시 시도하세요!";

  const rankOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const aRank = rankOrder.indexOf(a.split(" ")[0]);
  const bRank = rankOrder.indexOf(b.split(" ")[0]);
  const bSuit = b.split(" ")[1];
  const bColor = bSuit === "♥" || bSuit === "♦" ? "red" : "black";

  const bettingMultiplier = betting_calculator(aRank, prediction);
  let winnings = 0;

  if ((prediction === "higher" && bRank > aRank) ||
      (prediction === "lower" && bRank < aRank) ||
      (prediction === "red" && bColor === "red") ||
      (prediction === "black" && bColor === "black")) {
      winnings = betAmount * bettingMultiplier;
      money += winnings;
      resultMessage = `축하합니다! ${winnings}원을 벌었습니다!`;
  } else {
      money -= betAmount;
      resultMessage = `아쉽습니다! ${betAmount}원을 잃었습니다.`;
  }

  return resultMessage;
}

function betting_calculator(OC, prediction) {
  let betting_multiplier = 1.0;

  const higherMultipliers = [1.1, 1.1, 1.1, 1.15, 1.15, 1.15, 1.15, 1.2, 1.2, 1.3, 1.3, 1.5, 3];
  const lowerMultipliers = [100, 1.5, 1.3, 1.3, 1.2, 1.2, 1.15, 1.15, 1.15, 1.15, 1.1, 1.1, 1.1];

  if (prediction === "higher") {
      betting_multiplier = higherMultipliers[OC];
  } else if (prediction === "lower") {
      betting_multiplier = lowerMultipliers[OC];
  } else if (prediction === "red" || prediction === "black") {
      betting_multiplier = 1.25;
  }

  return betting_multiplier;
}

function updateStatus() {
  document.getElementById("predictionStatus").textContent = `예측 상태: ${
      prediction ? prediction : "아직 예측되지 않음"
  }`;
  document.getElementById("balance").textContent = `현재 잔액: ${money}원`;
}

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
          alert("회원가입 성공!");
      })
      .catch(error => {
          console.error("회원가입 오류:", error);
          alert("회원가입 오류:", error.message);
      });
}

function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
          alert("로그인 성공!");
          loadUserData(userCredential.user.uid);
      })
      .catch(error => {
          console.error("로그인 오류:", error);
          alert("로그인 오류:", error.message);
      });
}

function signOut() {
  auth.signOut()
      .then(() => {
          alert("로그아웃 성공!");
          document.getElementById('balance').textContent = '현재 잔액: 0원';
      })
      .catch(error => {
          console.error("로그아웃 오류:", error);
          alert("로그아웃 오류:", error.message);
      });
}

function saveUserData() {
  const user = auth.currentUser;
  if (user) {
      db.collection("users").doc(user.uid).set({
          money: money
      })
      .then(() => {
          console.log("유저 데이터 저장 성공!");
      })
      .catch(error => {
          console.error("유저 데이터 저장 오류:", error);
      });
  }
}

// Firestore 오프라인 데이터 처리 활성화
db.enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            // 여러 탭이 열려 있으면 퍼시스턴스가 작동하지 않음
            console.error("Firestore persistence failed: Multiple tabs open");
        } else if (err.code == 'unimplemented') {
            // 브라우저가 퍼시스턴스를 지원하지 않는 경우
            console.error("Firestore persistence is not available");
        }
    });

    
function loadUserData(uid) {
    db.collection("users").doc(uid).get()
        .then(doc => {
            if (doc.exists) {
                money = doc.data().money;
                updateStatus();
            } else {
                console.log("No such document!");
                // 유저 데이터가 없으면 새로 생성
                money = 1000; // 초기 잔액 설정
                saveUserData();
            }
        })
        .catch(error => {
            console.error("유저 데이터 로드 오류:", error);
        });
}
