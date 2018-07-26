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

  /**
   * 추가 : 컴퓨터의 AI 개선하기
   * 1. 컴퓨터의 성공확률 : 2점 슛 50%, 3점 슛 33%
   * 2. 사용자에게 6점 이상 지고 있을 경우, 슛 확률을 * * 각각 60%, 38%로 올림 
   * 3. 사용자에게 10점 이상 지고 있을 경우, 슛 확률을
   * 각각 70, 43으로 올림 
   * 4. 반대로 사용자에게 6점 이상 이길 경우 40, 28로 다운
   * 5. 10점 이상 이기고 있을 경우는 30, 23으로 다운
   */

    //변수 선언
    var comScore = 0;
    var comPercent2 = 0.5;
    var comPercent3 = 0.33;

    var userScore = 0;
    var userPercent2 = 0.5;
    var userPercent3 = 0.33;

    var isComputerTurn = true;
    var shotsLeft = 15;
    
    //안내멘트 출력
    function showText(str){
        var commentElem = document.getElementById('comment');
        commentElem.innerHTML = str;
    }

    //컴퓨터 점수 갱신
    function updateComputerScore(score){
        var comScoreElem = document.getElementById('computerScore');
        comScore += score;
        comScoreElem.innerHTML = comScore;
    }

    //사용자 점수 갱신
    function updateUserScore(score){
        var userScoreElem = document.getElementById('userScore');
        userScore += score;
        userScoreElem.innerHTML = userScore;
    }

    //컴퓨터 버튼 비 활성화
    function disableComputerButtons(flag){
        var btnComputer = document.getElementsByClassName('btnComputer');
        for(var i = 0; i < btnComputer.length; i++){
            btnComputer[i].disabled = flag;
        }
    }

    //사용자 버튼 비 활성화
    function disableUserButtons(flag){
        var btnUser = document.getElementsByClassName('btnUser');
        for(var i = 0; i < btnUser.length; i++){
            btnUser[i].disabled = flag;
        }
    }

    //컴퓨터 슛 이벤트
    function onComputerShoot(){
        if(!isComputerTurn) return;
        var shootType = Math.random() < 0.5 ? 2: 3;

        if(shootType === 2){
            if(Math.random() < comPercent2){
                //2점슛 1/2확률로 성공
                showText('컴퓨터가 2점슛을 성공 시켰습니다');
                updateComputerScore(2);
            }else{
                //실패
                showText('컴퓨터가 2점슛을 실패했습니다.');
            }
        }else{
            if(Math.random() < comPercent3){
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

    //유져 슛 이벤트
    function onUserShoot(shootType){
        if(isComputerTurn) return;
        if(shootType === 2){
            if(Math.random() < userPercent2){
                //2점슛 1/2확률로 성공
                showText('사용자가 2점슛을 성공 시켰습니다');
                updateUserScore(2)
            }else{
                //실패
                showText('사용자가 2점슛을 실패했습니다.');
            }
        }else{
            if(Math.random() < userPercent3){
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
        //슛 끝날때마다 확인 
        updateAI()
    }

    //AI 개선 
    function updateAI(){
        var diff = userScore - comScore;

        if(diff >= 10){
            console.log('확률10증가')
            comPercent2 = 0.6;
            comPercent3 = 0.38;
        }else if( diff >= 6){
            console.log('확률6증가')
            comPercent2 = 0.7;
            comPercent3 = 0.38;
        }else if( diff <= -10){
            console.log('확률10감소')
            comPercent2 = 0.4;
            comPercent3 = 0.28;
        }else if(diff <= -6){
            console.log('확률6감소')
            comPercent2 = 0.3;
            comPercent3 = 0.23;
        }
    }
