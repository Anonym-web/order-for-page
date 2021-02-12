
/*登录*/
function login(){
    var username = document.getElementById('userSignIn').value;
    var userpassword = document.getElementById('passwordSignIn').value;
    $.ajax({
        type:"post",
        url:"http://192.168.1.30:8080/user/login",
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
    var emial = document.getElementById('emial').value;
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

/*登录或注册成功后的逻辑*/
function successHref(data){
    if(data.retCode == 1){
        if(data.dataRows.type == "OrdinaryUser"){
            /*证明是普通用户*/
            window.location.href = "user.html?phone="+data.dataRows.phone
            /*window.location.href = "user.html"*/
        }
        if(data.dataRows.type == "business"){
            /*证明是普通用户*/
            window.location.href = "business.html?phone="+data.dataRows.phone
        }
    }else{
        if(data.retCode == 0){
            alert(data.retVal);
            return;
        }
    }
}