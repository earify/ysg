// 예시 리스트
const myList = ['abc', '123', 'test', 'abc123', 'hello'];

// 리스트의 각 요소를 확인
for (let i = 0; i < myList.length; i++) {
  // 현재 요소에 "abc"가 포함되어 있는지 확인
  if (myList[i].includes('abc')) {
    // 포함되어 있다면 출력
    console.log(myList[i]);
  }
}