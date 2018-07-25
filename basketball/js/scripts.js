/**
 * basketball game
 */

 /**
  * 1.컴퓨터 차례로 시작
  * 2.사용자가 컴퓨터의 슛 버튼을 클릭
  * 3.컴퓨터는 2점슛 or 3점슛을 랜덤하게 쏨
  * 4.성공 시 점수를 올려준다.
  * 5.턴 변경
  * 6.사용자는 2점 or 3점슛을 골라서 쏨
  * 7.성공 시 점수 변경
  * 8.턴을 변경하고 남은 슛 횟수를 깎는다
  * 9.남은 슛이 0이 될때까지 1-8 반복
  * 10.점수 비교로 승자 정하기 
  */

    var comScore = 0;
    var userScore = 0;
    var isComputerTurn = true;
    var shotsLeft = 15;

    function showText(str){
        var commentElem = document.getElementById('comment');
        commentElem.innerHTML = str;
    }

    function updateComputerScore(score){
        var comScoreElem = document.getElementById('computerScore');
        comScore += score;
        comScoreElem.innerHTML = score;
    }

    function updateUserScore(score){
        var userScoreElem = document.getElementById('userScore');
        userScore += score;
        userScoreElem.innerHTML = score;
    }
    function disableComputerButtons(flag){
        var btnComputer = document.getElementsByClassName('btnComputer');
        for(var i = 0; i < btnComputer.length; i++){
            btnComputer[i].disabled = flag;
        }
    }

    function disableUserButtons(flag){
        var btnUser = document.getElementsByClassName('btnUser');
        for(var i = 0; i < btnUser.length; i++){
            btnUser[i].disabled = flag;
        }
    }

    function onComputerShoot(){
        if(!isComputerTurn) return;
        var shootType = Math.random() < 0.5 ? 2: 3;

        if(shootType === 2){
            if(Math.random() < 0.5){
                //2점슛 1/2확률로 성공
                showText('컴퓨터가 2점슛을 성공 시켰습니다');
                updateComputerScore(2);
            }else{
                //실패
                showText('컴퓨터가 2점슛을 실패했습니다.');
            }
        }else{
            if(Math.random() < 0.33){
                //3점 슛 1/3 확률로 성공
                showText('컴퓨터가 3점슛을 성공 시켰습니다');
                updateComputerScore(3);
            }else{
                //실패
                showText('컴퓨터가 2점슛을 실패했습니다.');
            }
        }
        isComputerTurn = false;
        disableComputerButtons(true);
        disableUserButtons(false);
    }

    function onUserShoot(shootType){
        if(isComputerTurn) return;
        if(shootType === 2){
            if(Math.random() < 0.5){
                //2점슛 1/2확률로 성공
                showText('사용자가 2점슛을 성공 시켰습니다');
                updateUserScore(2)
            }else{
                //실패
                showText('사용자가 2점슛을 실패했습니다.');
            }
        }else{
            if(Math.random() < 0.33){
                //3점 슛 1/3 확률로 성공
                showText('사용자가 3점슛을 성공 시켰습니다');
                updateUserScore(3);
            }else{
                //실패
                showText('사용자가 2점슛을 실패했습니다.');
            }
        }

        isComputerTurn = true;
        disableComputerButtons(false);
        disableUserButtons(true);

        shotsLeft--;
        var shotsLeftElem = document.getElementById('reaminShoot');
        shotsLeftElem.innerHTML = shotsLeft;

        if(shotsLeft === 0){
            if(userScore > comScore){
                showText('승리했습니다');
            }else if(userScore === comScore){
                showText('비겼습니다');
            }else{
                showText('졌습니다.');
            }

            disableComputerButtons(true);
            disableUserButtons(true);
        }

    }
