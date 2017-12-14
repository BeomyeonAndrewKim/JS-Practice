### 문제 1

두 문자열을 입력받아, 대소문자를 구분하지 않고(case insensitive) 두 문자열이 동일한지를 반환하는 함수를 작성하세요.

예:
```javascript
insensitiveEqual('hello', 'hello'); -> true
insensitiveEqual('hello', 'Hello'); -> true
insensitiveEqual('hello', 'world'); -> false
```

```javascript
function insensitiveCompare(str1,str2){
  return str1.toLowerCase() === str2.toLowerCase();
}
```



### 문제 2

문자열 `s`와 자연수 `n`을 입력받아, 만약 `s`의 길이가 `n`보다 작으면 `s`의 왼쪽에 공백으로 추가해서 길이가 `n`이 되게 만든 후 반환하고, 아니면 `s`를 그대로 반환하는 함수를 작성해보세요.

예:
```
leftPad('hello', 8); -> '   hello'
leftPad('hello', 3); -> 'hello'
```

```javascript
const a='hello';
const b='8';
function leftPad(str,num){
  if(str.length<num){
    var blank = " ";
    return blank.repeat(num-str.length)+str;
  } else{
    return str;
  }
}

//강사님 풀이
function leftPad(s, n) {
  if (s.length < n) {
    return ' '.repeat(n - s.length) + s;
  } else {
    return s;
  }
}

```



### 문제 3

문자열을 입력받아, 문자열 안에 들어있는 모든 모음(a, e, i, o, u)의 갯수를 반환하는 함수를 작성하세요.

```javascript

function returnA(str){
  var num=0;
  for (let item of str){
  if(item.includes('a') || item.includes('e') ||item.includes('i') ||item.includes('o') ||item.includes('u')){
    num=num+1;
    }
    
  }
  return num;
}

//강사님 풀이
function countVowel(str) {
  let count = 0;
  for (let c of str) {
    if (['a', 'e', 'i', 'o', 'u'].includes(c)) {
      count++;
    }
  }
  return count;
}

const string="umbrellaa";
returnA(string);


```



### 문제 4

문자열을 입력받아, 해당 문자열에 포함된 문자의 종류와 갯수를 나타내는 객체를 반환하는 함수를 작성하세요.

예:
```javascript
countChar('tomato'); -> {t: 2, o: 2, m: 1, a: 1}
```

```javascript
var tomato='tomato';

function countChar(str){
  var obj = {};
  for(let item of str){
    if(obj[item] === undefined){
       obj[item] = 0;
    } 
    if(str.includes(item)){
      obj[item] += 1;
    }
  }
  return obj;
  }

//강사님 풀이
function countChar(str) {
  const obj = {};
  for (let c of str) {
    if (obj[c] === undefined) {
      obj[c] = 1;
    } else {
      obj[c]++;
    }
  }
  return obj;
}

countChar('hello');
countChar(tomato);


```



### 문제 5

문자열을 입력받아 그 문자열이 회문(palindrome)인지 판별하는 함수를 작성하세요. (회문이란, '토마토', 'never odd or even'과 같이 뒤에서부터 읽어도 똑같이 읽히는 문자열을 말합니다.)

```javascript
function isPalindrome(str){
  for(let i=parseInt(str.length/2); i<str.length;i++){
    if(str.length%2===0){
    if(str[i] !== str[i+1]){
        return false;
    }
    else {
      return ture;
    }
  } else if(str.length%2 !==0){
    if(str[i-1] !== str[i+1]){
      return false;
    } else{
      return true;
    }
  }
 }
}

function isPalindrome2(str){
  for(let i=0;i<Math.floor(str.length/2);i++){
    if(str[i] !== str[str.length-1-i]){
      return false;
    }
  }
  return true;
}

function isPalindrome3(str){
  const arr1 = Array.from(str);
  const arr2 = Array.from(str).reverse();
  for (let i =0;i<Math.floor(arr1.length/2); i++){
    if(arr1[i] !== arr2[i]){
      return false;
    }
  }
  return true
}

function isPalindrome4(str){
  const spaceRemoved = str.replace(/\s/g,'');
  return spaceRemoved === Array.from(spaceRemoved).reverse().join('');
}
//배열, 객체는 내용이 같다고 해서  === 는 아니다!

const hwa='neveroddoreven';
isPalindrome2(hwa);
```



### 문제 6

문자열을 입력받아, 그 문자열의 모든 '부분 문자열'로 이루어진 배열을 반환하는 함수를 작성하세요.

예:
```
subString('햄버거');
// 결과: ['햄', '햄버', '햄버거', '버', '버거', '거']
```

```javascript
function subString(str){
  const newArr=[];
  for(i=0;i<str.length;i++){
    for(j=i+1;j<=str.length;j++){
      newArr.push(str.slice(i,j));
    }
  }
  return newArr;
}
const String='햄버거'
subString(String);
```



### 문제 7

문자열을 입력받아, 해당 문자열에서 중복된 문자가 제거된 새로운 문자열을 반환하는 함수를 작성하세요.

예:
```
removeDuplicates('tomato'); -> 'toma'
removeDuplicates('bartender'); -> 'bartend'
```
```javascript

function removeDuplicates(str){
  const strArr=Array.from(str);
  for(let item of strArr){
    if(strArr.indexOf(item) !== strArr.lastIndexOf(item)){
      strArr.splice(strArr.lastIndexOf(strArr[item]),1)
    }
  }
  return strArr.join('');
}

function removeDuplicates2(str){
  const strArr=Array.from(str);
  const newArr = [];
  for(let item of strArr){
    if(!newArr.includes(item)){
      newArr.push(item);
    }
  }
  return newArr.join('');
}

removeDuplicates2('tomato');

//선생님 답
function removeDuplicates(str){
  let newStr = '';
  for(let c of str){ //character
    if(!newStr.includes(c)){
      newStr += c;
    }
  }
return newStr;
}


```



### 문제 8

이메일 주소를 입력받아, 아이디 부분을 별표(`*`)로 가린 새 문자열을 반환하는 함수를 작성하세요.

```javascript
function emailID(str){
 var id=str.slice(0, str.indexOf('@'));
 var domain=str.slice(str.indexOf('@'),str.length);
 var star='*'.repeat(id.length);
 return star.concat(domain);
}



//강사님 풀이
//루프

// 루프
function hideId(email) {
  let numOfId = 0;
  let atAppeared = false;
  let domain = '';
  for (let c of email) {
    if (c === '@') {
      atAppeared = true;
    } else if (!atAppeared) {
      numOfId++;
    } else {
      domain += c;
    }
  }
  
  let result = '';
  for (let i = 0; i < numOfId; i++) {
    result += '*';
  }
  result += '@';
  result += domain;
  return result;
}

// split, repeat
function hideId2(email) {
  const [id, domain] = email.split('@');
  return '*'.repeat(id.length) + '@' + domain;
}

const email='abcde@gmail.com';
emailID(email);
```



### 문제 9

문자열을 입력받아, 대문자는 소문자로, 소문자는 대문자로 바꾼 결과를 반환하는 함수를 작성하세요.

```javascript
function changeCase(str){ 
 var newStr='';
  for(let item of str){
    if(item.toUpperCase() ===  item){
      newStr=newStr.concat(item.toLowerCase());
    } else {
      newStr=newStr.concat(item.toUpperCase());
    }
  }
  return newStr;
}
//강사님 풀이
function changeCase(str){
  let newStr = '';
  for (let c of str){
    if(c.toLowerCase() === c){
      newStr+=c.toUpperCase();
    } else{
      newStr +=c.toLowerCase();
    }
  }
  return newStr;
}

```



### 문제 10

문자열을 입력받아, 각 단어의 첫 글자를 대문자로 바꾼 결과를 반환하는 함수를 작성하세요. (문자열에 개행이 없다고 가정합니다.)

```javascript
function toUp(str){
  arr=str.split(" "); //split(/\s+/)
  newStr='';
  for(let item of arr){
    console.log(item);
    newStr=newStr.concat(item.replace(item[0],item[0].toUpperCase())+' ');
    console.log(newStr);
  }
  
  return newStr;
}

//강사님 풀이
function capitalize(str){
  let newStr = '';
  for(let i=-; i<str.length; i++){
    if(str[i-1]===' ' || i===0){
      newStr += str[i].toUpperCase();
    } else {
      newStr += str[i];
    }
  }
  return newStr;
}
var string = 'fast campus frontend development'
toUp(string);
```



### 문제 11

문자열을 입력받아, 문자열 안에 들어있는 단어 중 가장 긴 단어를 반환하는 함수를 작성하세요. (문자열에 개행이 없다고 가정합니다.)

```javascript
function longest(str){
  arr=str.split(" ");
  for(let i=0;i<arr.length;i++){
    for(let j=i+1; j<arr.length;j++)
    if(arr[i].length<arr[j].length){
      [arr[i],arr[j]]=[arr[j],arr[i]];
      console.log(arr);
    }
  }
 return arr[0];
}

//강사님 풀이
// 문자열을 입력받아, 문자열 안에 들어있는 단어 중 가장 긴 단어를 반환하는 함수를 작성하세요. (문자열에 개행이 없다고 가정합니다.)

function longestWord(str) {
  const arr = str.split(' ');
  let longest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].length > longest.length) {
      longest = arr[i];
    }
  }
  return longest;
}
var string = 'fast campus frontend development'
longest(string);
```



### 문제 12

문자열 `s`과 자연수 `n`을 입력받아, `s`의 첫 `n`개의 문자만으로 이루어진 새 문자열을 반환하는 함수를 작성하세요.

```javascript
function firstChars(s,n){
  ///.
}

firstChars('hello',3);//'hel'
```



```javascript
function newString(str,num){
  var newStr='';
  for(let i=0;i<num && i<str.length;i++){
    newStr=newStr.concat(str[i]);
  }
  return newStr;
}
//강사님 풀이
function firstChars(s, n) {
  let newStr = '';
  for (let i = 0; i < n && i < s.length; i++) {
    newStr += s[i];
  }
  return newStr;
}

var string ='hello'
newString(string, 3);
```



### 문제 13

Camel case의 문자열을 입력받아, snake case로 바꾸어주는 함수를 작성하세요.

```javascript
function toSnake(str){
  var newStr='';
  for(let item of str){
    if(item.toUpperCase()!==item){
      newStr=newStr.concat(item);
      console.log(newStr);
    } else{
      newStr=newStr.concat('_'+item.toLowerCase());
      console.log(newStr);
    }
  }
 return newStr; 
}

var string='kimBeom';
toSnake(string);
```



### 문제 14

Snake case의 문자열을 입력받아, camel case로 바꾸어주는 함수를 작성하세요.

```javascript
function toSnake(str){
  var arr=str.split("_");
  var newStr='';
  console.log(arr);
  newStr=newStr.concat(arr[0]+'');
  for(i=1;i<arr.length;i++){
    var Strr=arr[i];
    newStr=newStr.concat(Strr.replace(Strr[0],Strr[0].toUpperCase()));
  }
 return newStr; 
}

var string='kim_beom_yeon';
toSnake(string);

//
```



### 문제 15

`String.prototype.split`과 똑같이 동작하는 함수를 작성하세요.

예:
```
split('Hello World'); -> ['Hello World']
split('Hello World', ' '); -> ['Hello', 'World']
split('let,const,var', ',') -> ['let', 'const', 'var']
```

```javascript
const array1='Hello!World!World!World';
const brk1='!';

function split1(str,brk){
  var newArr=[];
  for(let item of str){
      if(item===brk){
      newArr.push(str.slice(0,str.indexOf(item)));
      str=str.slice(str.indexOf(item)+1,str.length);
    } 
  }
  newArr.push(str.slice());
  if(brk===''){
    newArr=[];
    for(let item of str){
      newArr.push(item);
    }
  }
  return newArr;
}
  

split1(array1,brk1);
```



### 문제 16

2진수를 표현하는 문자열을 입력받아, 그 문자열이 나타내는 수 타입의 값을 반환하는 함수를 작성하세요. (`parseInt`를 사용하지 말고 작성해보세요.)

예:
```
convertBinary('1101'); -> 13
```

### 문제 17

숫자로만 이루어진 문자열을 입력받아, 연속된 두 짝수 사이에 하이픈(-)을 끼워넣은 문자열을 반환하는 함수를 작성하세요.

예:
```
insertHyphen('437027423'); -> '4370-274-23'
```
