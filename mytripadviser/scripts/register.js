/* 회원가입 */
$(function(){
       
    /* 출생년도 */
    var $sel = $(".birth");
    generateYears($sel);

    $("#formRegister").submit(function(e){
        e.preventDefault();
        /*초기화 */
        $(this).find(".txt_warning").empty().hide();

        /* 이메일 */
        var email = $(".i_email").val();
        if(!validateEmail(email)){
            $(".i_email").next().html('잘못된 형식입니다.').show();
            return;
        }
        /* password */
        var password = $(".i_pswd").val();

        if(!validatePassword(password)){
            $(".i_pswd").next().html('대문자와 숫자가 포함된 최소 8자의 문자열이어야 합니다.').show();
            return;
        }

        var passwordConfirm = $(".i_pswd_confirm").val();

        if(password !== passwordConfirm){
            $(".i_pswd_confirm").next().html('비밀번호가 일치하지 않습니다.').show();
            return;
        }

        /* gender */
        var gender = $("input[name='gender']:checked").val();
        console.log(gender)
        if(!gender){
            $(".gender").next().html('필수항목입니다').show();
            return;
        }
        
        /* birth */
        var birth = $sel.val();
        if(!birth){
            $sel.next().html('필수 항목입니다.').show();
            return;
        }

        /* agree */
        var agree = $(".accept").find("input:checked").val();
        if(!agree){
            $(".accept").next().html('필수 항목입니다.').show();
            return;
        }
        
    submitData(email,password,gender, birth);
    })
 
})

function validateEmail(email){
    var re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return re.test(email);
}

function validatePassword(password){
    var re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    return re.test(password);
}

function generateYears($sel){
    for(var i = 1970; i < 2010; i++){
        $sel.append('<option value="' + i + '">' + i + '</option>')
    }
}

function submitData(email, password, gender, birth){
    var params = {
        email : email,
        password : password,
        gender : gender,
        birth : birth
    }

    $.post('same_api_url', params, function(r){
        console.log(r)
    })
}