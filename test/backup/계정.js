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

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);

// 이메일 유효성 검사 함수
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// 회원가입 함수
function signUp() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // 이메일 유효성 검사
  if (!isValidEmail(email)) {
    alert("유효한 이메일을 입력하세요.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // 회원가입 성공 시 동작
      var user = userCredential.user;
      console.log("User signed up:", user);
      initializeGame(user.uid);
    })
    .catch((error) => {
      // 회원가입 실패 시 동작
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Error:", errorMessage);
    });
}

// 로그인 함수
function signIn() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // 로그인 성공 시 동작
      var user = userCredential.user;
      console.log("User signed in:", user);
      initializeGame(user.uid);
    })
    .catch((error) => {
      // 로그인 실패 시 동작
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Error:", errorMessage);
    });
}

// 게임 초기화 함수
function initializeGame(uid) {
  // 사용자의 UID를 기반으로 게임 데이터를 가져옵니다.
  firebase.database().ref('users/' + uid).once('value')
    .then((snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        // 게임 데이터가 있는 경우: 기존 데이터를 사용하여 게임을 계속합니다.
        money = userData.money; // 사용자의 잔액을 불러옵니다.
        // 여기에 필요한 게임 초기화 로직을 추가하세요.
        // 예: 사용자의 돈을 표시하는 등의 UI 업데이트
        updateStatus();
      } else {
        // 게임 데이터가 없는 경우: 새로운 게임을 시작합니다.
        money = 1000; // 초기 잔액을 설정합니다.
        // 여기에 필요한 게임 초기화 로직을 추가하세요.
        // 예: 사용자의 돈을 표시하는 등의 UI 업데이트
        updateStatus();
        // 사용자의 초기 게임 데이터를 저장합니다.
        firebase.database().ref('users/' + uid).set({
          money: money
        });
      }
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
}
