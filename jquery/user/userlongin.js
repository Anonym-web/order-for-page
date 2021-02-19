
/*登录*/
function login(){
    var username = document.getElementById('userSignIn').value;
    var userpassword = document.getElementById('passwordSignIn').value;
    $.ajax({
        type:"post",
        url:"http://localhost:8080/user/login",
        dataType:'json',
        data:{"name":username,"password":userpassword},
        async:true,
        success:function (data) {
            successHref(data)
        },
        error:function () {
            alert("0");
        }
    });
}


/*注册*/
function registered(){
    var userSignOutPhone = document.getElementById('userSignOutPhone').value;
    var passwordSignOutOne = document.getElementById('passwordSignOutOne').value;
    var passwordSignOutTwo = document.getElementById('passwordSignOutTwo').value;
    var emial = document.getElementById('email').value;
    var radio = document.getElementsByName("optionsRadios");
    var typeValue;
    for(var i=0; i<radio.length; i ++) {
        if(radio[i].checked){
            typeValue = radio[i].value;
        }
    }
    $.ajax({
        type:"post",
        url:"http://localhost:8080/user/registered",
        dataType:'json',
        data:{
            "phone":userSignOutPhone,
            "password":passwordSignOutOne,
            "email":emial,
            "type":typeValue
        },
        async:true,
        success:function (data) {
            successHref(data);
        },
        error:function () {
            alert("0");
        }
    });


}

/*验证密码是否一致*/
function verificationPassword() {
    var passwordSignOutOne = document.getElementById('passwordSignOutOne').value;
    var passwordSignOutTwo = document.getElementById('passwordSignOutTwo').value;
    var xianshi = document.getElementById("xianshi");
    if(passwordSignOutOne == passwordSignOutTwo){
        xianshi.innerText = "";
    }else{
        xianshi.innerText = "密码与确认密码不一致";
    }
}

function verificationPhone() {
    var userSignOutPhone = document.getElementById("userSignOutPhone").value;
    var phoneXianshi = document.getElementById("phoneXianshi");
    if($.trim(userSignOutPhone)==''||$.trim(userSignOutPhone)=='手     机:'||$.trim(userSignOutPhone)==null){
        phoneXianshi.innerText = "手机号不能为空";
        return false;
    }else{
        phoneXianshi.innerText = '';
    }
    //验证手机号
    var pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(!pattern.test(userSignOutPhone)) {
        phoneXianshi.innerText = "请输入正确的手机格式";
        return false;
    }else{
        phoneXianshi.innerText = '';
    }

    /*验证手机号是否存在*/
    $.ajax({
        type:"post",
        url:"http://localhost:8080/user/verificationEmailOrphone",
        dataType:'json',
        data:{
            "phone":userSignOutPhone
        },
        async:true,
        success:function (data) {
            if(data.retCode == 0){
                phoneXianshi.innerText = data.retVal;
            }else if (data.retCode == 1){
                phoneXianshi.innerText = "√";
                phoneXianshi.style.color = 'green';
            }
        },
        error:function () {
            alert("0");
        }
    });
}

function verificationEmail() {
    var email = document.getElementById("email").value;
    var emailXianshi = document.getElementById("emailXianshi");
    if($.trim(email)==''||$.trim(email)=='邮    箱:'||$.trim(email)==null){
        emailXianshi.innerText = "邮箱不能为空";
        return false;
    }else {
        emailXianshi.innerText = "";
    }
    //验证邮箱
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if(!reg.test(email)) {
        emailXianshi.innerText = "请输入正确的邮箱格式";
        return false;
    }else{
        emailXianshi.innerText = "";
    }
    /*验证邮箱是否存在*/
    $.ajax({
        type:"post",
        url:"http://localhost:8080/user/verificationEmailOrphone",
        dataType:'json',
        data:{
            "email":email
        },
        async:true,
        success:function (data) {
            if(data.retCode == 0){
                emailXianshi.innerText = data.retVal;
            }else if (data.retCode == 1){
                emailXianshi.innerText = "√";
                emailXianshi.style.color = 'green';
            }
        },
        error:function () {
            alert("0");
        }
    });
}

/*登录或注册成功后的逻辑*/
function successHref(data){
    if(data.retCode == 1){
        if(data.dataRows.type == "OrdinaryUser"){
            /*alert(data.dataRows.id);*/
            /*证明是普通用户*/
            window.location.href = "user.html?id="+data.dataRows.id
            /*window.location.href = "user.html"*/
        }
        if(data.dataRows.type == "business"){
            /*证明是普通用户*/
            window.location.href = "business.html?id="+data.dataRows.id
        }
    }else{
        if(data.retCode == 0){
            alert(data.retVal);
            return;
        }
    }
}