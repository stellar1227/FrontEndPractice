/**
 * 로또 생성기 
 * 1. 숫자 6개를 하나씩 넣을 6개의 변수
 * 2. 1-45까지의 난수 발생
 * 3. 기존의 숫자와 동일한 경우 다시 발생 
 * 4. 다르면 변수에 할당
 * 5. 6개의 변수에 모두 같은 방법으로 작업
 */

/**
 * Point : 매번 난수를 발생시켜 비교하는 것 보다 난수발생 범위의 정수를 Array에 담아 둔 후 뽑힌 숫자는 배열에서 빼버리면 된다. 
 * 또한 매번 발생시키는 난수는 값이 아닌 배열의 인덱스가 된다.
 */

var list = [];
for(var i = 1; i <= 45; i++){
list.push(i);
}

var lottoList = [];
for(var i = 0; i < 6; i++){

    var index = Math.floor(Math.random() * list.length);

    lottoList.push(list[index]);
    
    list.splice(index, 1);
}

for(var i = 0; i < lottoList.length; i++){
    document.body.innerHTML += '<span>' + lottoList[i] + '</span>';
}





