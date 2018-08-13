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

/*ES5 */
(function(){
    var lottoList = function(max,num){
        this.max = max;
        this.num = num;
    };

    lottoList.prototype.createList = function(){
        this.list = [];
        for(var i = 1; i <= this.max; i++){
            this.list.push(i);
        }
    }

    lottoList.prototype.pickNumber = function(){
        this.lottoList = [];
        var _list = this.list;

        for(var i = 0; i < this.num; i++){
            var _idx = Math.floor(Math.random() * _list.length);

            this.lottoList.push(_list[_idx]);
            _list.splice(_idx, 1);
        }
    }

    lottoList.prototype.render = function(){
        // Q : render 함수안에서는 순수하게 render관련된 것만 있어야 하나 ? 밖에서 호출? 
        this.createList();
        this.pickNumber();

        var _list = this.lottoList;

        //sort의 기본 정렬 알고리즘은 unicode 코드값을 기반으로 한다.
        _list.sort(function(a,b){
            return a - b;
        }); 

        /*
        for(var i = 0; i < _list.length; i++){
            document.body.innerHTML += '<span>' + _list[i] + '</span>';
        }
        */
        document.body.innerHTML += _list.map(item => '<span>' + item + '</span>');
        
        document.body.innerHTML += '</br>';
    }

    var a = new lottoList(45, 6);
    a.render();
    
})()


/*ES2015+ */
const lottoList = class{
    constructor(max, num){
        this.max = max;
        this.num = num;
        this.state = {
            list : [],
            result : []
        }
    }

    createList(){
        for(let i = 1; i <= this.max; i++){
            this.state.list.push(i);
        }
    }

    pickNumber(){
        let { list , result } = this.state;
        for(let i = 0; i < this.num; i++){
            let _idx = Math.floor(Math.random() * list.length);
            result.push(list[_idx]);
            list.splice(_idx, 1);
        }
    }

    render(){
        const { result } = this.state;
        this.createList();
        this.pickNumber();

        result.sort(function(a, b){
            return a - b;
        })
        
        for(let i = 0 ; i < result.length; i++){
            document.body.innerHTML += '<span>' + result[i] + '</span>';
        }
        document.body.innerHTML += '</br>';   
    }
}

var a = new lottoList(45, 6);
a.render();
