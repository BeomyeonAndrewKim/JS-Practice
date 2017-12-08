### 문제 1

두 수를 입력받아 큰 수를 반환하는 함수를 작성하세요.

````javascript
function larger(x,y){
  //만약 x가 크면 x를 반환
  if(x>y){
    return x;
  }
  else{
    return y;
  }
  //아니면 y를 반환

  function large2(x,y){
  const answer = x>y ? x :y;
  console.log(answer);
  }
````



### 문제 2

세 수를 입력받아 그 곱이 양수이면 `true`, 0 혹은 음수이면 `false`, 둘 다 아니면 에러를 발생시키는 함수를 작성하세요.

```javascript
function isPositive(x,y,z){
  const product = x*y*z;
  if(product>0){
    return true;
  } else if(product<=0){
    return false;
  } else {
    throw new Error('입력값이 잘못되었습니다.')
  }
}
```



### 문제 3

세 수 `min`, `max`, `input`을 입력받아, 다음과 같이 동작하는 함수를 작성하세요.
- `min`보다 `input`이 작으면, `min`을 반환합니다.
- `max`보다 `input`이 크면, `max`를 반환합니다.
- 아니면 `input`을 반환합니다.

예:
```
limit(3, 7, 5); -> 5
limit(3, 7, 11); -> 7
limit(3, 7, 0); -> 0
```

```javascript
function limit(min,max,input){
  if(input<min){
    console.log(min);
  if(input>max){
    console.log(max);}
  }
  else{
    console.log(input);
  }
}

function limit2(min, max, input){
  return (
    input<min?min: 
    input>max?max: 
    input;
    );
}
```



### 문제 4

어떤 정수가 짝수인지 홀수인지 출력하는 함수를 작성하세요. 이를 이용해서, 1부터 20까지의 수가 각각 짝수인지 홀수인지 출력하는 프로그램을 작성하세요.

```javascript
function printIfEvenOrOdd(x){
  if (x % 2 === 0){
    console.log(`${x}는 짝수입니다.`);
  } else {
    console.log(`${x}는 홀수입니다.`);
  }
}

for(let i = 1; i<=20; i++){
  printIfEvenOrOdd(i);
}

//거꾸로
for(let i = 20; 1<+i; i--){
  printIfEvenOrOdd(i);
}
for(let i = 0; i<20; i++){
  printIfEvenOrOdd(20-i);
    }
```



### 문제 5

100 이하의 자연수 중 3과 5의 공배수를 모두 출력하는 프로그램을 작성하세요.

```javascript
for(let i=0;i<=100;i++){
  if(i%3 === 0 && i%5 === 0){
    console.log(i);
  }
}
```



### 문제 6

자연수를 입력받아, 그 수의 모든 약수를 출력하는 함수를 작성하세요.

```javascript
function printFactors(x){
  for(let i=1; i<=x; i++){
    if(x%i === 0){
      console.log(i);
    }
  }
}
```



### 문제 7

2 이상의 자연수를 입력받아, 그 수가 소수인지 아닌지를 판별하는 함수를 작성하세요.

```javascript
function isPrime(x){
  for(let i=2; i<=x-1; i++){
    if(x%i !== 0){
     return true;
    } else {
     return false;
  }  
}
}
function isPrime(x){
  for(let i=2; i<=x-1; i++){
    if(x%i === 0){
     return false;
    } else {
     return true;
  }  
}
}

function isPrime(n){
  for(let i = 2; i <=n-1; i++){
    console.log(`${i}에 대해서 루프가 실행되었습니다.`)''
    if(n % i === 0){
      //소수가 아니다!
      return false;
    }
  }
  //소수다
  return true;
}
```



### 문제 8

1부터 100까지의 수를 차례대로 출력하되, 자릿수에 3, 6, 9중 하나라도 포함되어 있으면 '짝!'을 대신 출력하는 프로그램을 작성하세요.

```javascript
for(x=1; x<101 ; x++){
  var x= x +="";
  if(x.indexOf('3')!= -1 || x.indexOf('6')!= -1 || 
  x.indexOf('9')!= -1){
    console.log('짝!');
  } else{
    console.log(`${x}`)
  }
}

for(x=1; x<101 ; x++){
  var x= x.toString();
  if(x.includes('3') || x.includes('6') || x.includes('9')){
    console.log('짝!');
  } else{
    console.log(x)
  }
}

//Fizzbuzz

for(x=1; x<100;x++ ){
   if(x%15 === 0){
    console.log('FizzBuzz');
  } else if(x%3 === 0){
    console.log('Fizz');
  } else if(x%5 === 0){
    console.log('Buzz');
  } else {
    console.log(x);
  }
}
```



### 문제 9

양의 정수를 입력받아, 다음과 같은 패턴의 출력을 하는 함수를 작성하세요.

1을 입력받은 경우:
```
*
```

3을 입력받은 경우:
```
*
* *
* * *
```

5를 입력받은 경우:
```
*
* *
* * *
* * * *
* * * * *
```

```javascript
function star(x){
  for (i=1; i<=x; i++){
    var answer = "* "
     console.log(answer.repeat(`${i}`))
  }
}
```



### 문제 10

양의 정수를 입력받아, 다음과 같은 패턴의 출력을 하는 함수를 작성하세요.

1를 입력받은 경우:
```
*
```

3를 입력받은 경우:
```
  *
 * *
* * *
 * *
  *
```

5를 입력받은 경우:
```
    *
   * *
  * * *
 * * * *
* * * * *
 * * * *
  * * *
   * *
    *
```
```javascript
function star(x){
  var answer = '* ';
  var blank = ' ';
  for (i=1; i<=x; i++){
     console.log(blank.repeat(x-i)+answer.repeat(i));
  }
for(i=x-1; i>0;i--){
  console.log(blank.repeat(x-i)+answer.repeat(i));
}
}
```



### 문제 11

두 수를 입력받아서, 두 수의 최대공약수를 반환하는 함수를 작성하세요. ([유클리드 호제법](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)을 참고하세요.)

```javascript

```



### 문제 12

세 수를 입력받아 큰 것부터 차례대로 출력하는 함수를 작성하세요.

```javascript
function whichIsBigger(x,y,z){
  const d = [x,y,z];
  const q=d.sort(function(a,b){
    return b-a;
  })
    return console.log(q);
}

function sort(x,y,z){
  //큰 걸 뒤로 보낸다.
  if(x>y){
    const temp = x;
    x=y;
    y=temp;
  }
  if(y>z){
    const temp = y;
    y = z;
    z = temp;
  }
  if(x>y){
    const temp = x;
    x=y;
    y=temp;
  }
  console.log(x,y,z);
}
function sort(x,y,z){
  //큰 걸 뒤로 보낸다.
  if(x>y){
[x,y]=[y,x]
  }
  if(y>z){
  [y,z]=[z,y]
  }
  if(x>y){
  [x,y]=[y,x]
  }
  console.log(x,y,z);
}
```



### 문제 13

자연수 `n`을 입력받아, `n`번째 피보나치 수를 반환하는 함수를 작성하세요.

```javascript
let x= 0;
let y= 1;

for(let i=0; i <10; i++){
  const sum = x+y;
  x=y;
  y=sum;
  console.log(x);
}

function fibo(n){
  let x= 0;
let y= 1;

  //n === 1 이면 한 단계도 실행하지 않는다.
  //n === 2 이면 한 단계 실행한다.
  //n === 3 이면 두 단계 실행한다.
  // ...
  for(let i = 0; i<n; i++){
    const sum = x+y;
    x = y;
    y = sum;

  }
  return x;
}
```

