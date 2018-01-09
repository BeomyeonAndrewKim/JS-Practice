### 문제 1

양수를 입력받아 이 수를 반지름으로 하는 원의 넓이를 반환하는 함수를 작성하세요.

```javascript
function areaCircle(num){
  var answer;
  if(num>0){
    answer=Math.pow(num,2)*Math.PI;
  } else{
    throw new Error(`${num} is not a positive number`);
  }
  return answer;
}
```



### 문제 2

두 정수 `min`, `max` 를 입력받아, `min` 이상 `max` 미만인 임의의 정수를 반환하는 함수를 작성하세요.

```javascript
function ranNum(num1,num2){
 return Math.floor(Math.random()*num2)||Math.floor(Math.random()*num1+1);
}
```



### 문제 3

정수를 입력받아, 5 단위로 올림한 수를 반환하는 함수를 작성하세요.

예:
```
ceilBy5(32); -> 35
ceilBy5(37); -> 40
```

```javascript
function ceilBy5(num){
  var str=num.toString();
  if(Number(str[str.length-1])<5 && 0<Number(str[str.length-1]) ){
    var newNum=5-Number(str[str.length-1]);
    var answer=num+newNum;
  } else if(Number(str[str.length-1])===0||Number(str[str.length-1])===5){
    var answer=num;} else{
    var newNum=10-Number(str[str.length-1]);
    var answer=num+newNum;
  }
  return answer;
  
}


ceilBy5(8);
```



### 문제 4

배열을 입력받아, 요소들의 순서를 뒤섞은 새 배열을 반환하는 함수를 작성하세요.

```javascript
function ranArr(arr){
  var newArr=[];
  let arr2 = arr.slice();
  for(let i=0;i< arr.length; i++){
    console.log(i, arr.length);
    var a=arr2[parseInt(Math.random()*arr2.length)];
    newArr.push(a);
    arr2.splice(arr2.indexOf(a),1);
    console.log(arr2);
  }
  return newArr;
}

var Array=[1,'a',4,3, 3, 3,['가','나','다'],3];
ranArr(Array);

```



### 문제 5

임의의 HTML 색상 코드를 반환하는 함수를 작성하세요.

```javascript
function rgbCode(){
  var num='0123456789abcdef'
  var newStr='#';
  
  for(i=1;i<=6;i++){
    var numRan=(num[Math.floor(Math.random()*16)]);
    newStr +=numRan;
  }
  return newStr;
}

//강사님 풀이
function randomHtmlColor() {
  const availableChars = '0123456789abcdef';
  let newStr = '#';
  
  for (let i = 0; i < 6; i++) {
    newStr += availableChars[Math.floor(Math.random() * 16)];
  }
  
  return newStr;
}

function randomHtmlColor2() {
  const value = Math.random() * 256 * 256 * 256;
  return '#' + Math.floor(value).toString(16);
  // 버그!
}
```



### 문제 6

양수를 입력받아, 그 수만큼의 길이를 갖는 임의의 문자열을 반환하는 함수를 작성하세요.

```javascript
function numString(num){
  var alphabet='abcdefghijklmnopqrstuvwxyz';
  var newStr ='';
  for(i=0;i<num;i++){
    var numRan=(alphabet[Math.floor(Math.random()*26)]);
    newStr +=numRan;
  }  
return newStr;
}

//강사님 풀이

const str = '0123456789abcdefABCDEF!@#$%^&*()';

function randomString(n) {
  let newStr = '';
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    newStr += str[randomIndex];
  }
  return newStr;
}
numString(7);

```



### 문제 7

수 타입의 값으로만 이루어진 배열을 입력받아, 그 값들의 표준편차를 구하는 함수를 작성하세요.
