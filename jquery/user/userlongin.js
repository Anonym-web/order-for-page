
function login(){
    var username = document.getElementById('userSignIn').value;
    var userpassword = document.getElementById('passwordSignIn').value;
    /*alert(username);
    axios({
        url: 'http://localhost:8080/user/login',
        method: 'post',
        data: {
            "name": username,
            "password": userpassword
        },
        transformRequest: [function (data) {
            var oMyForm = new FormData();
            oMyForm.append("name", username);
            oMyForm.append("password", userpassword);
            console.info(oMyForm);
            return oMyForm;
        }],
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(function (response) {
            alert("1111");
        })
        .catch(function (error) {
            console.log(error);
        });*/
    $.ajax({
        type:"post",
        url:"http://192.168.1.30:8080/user/login",
        dataType:'json',
        data:{"name":username,"password":userpassword},
        async:true,
        success:function (data) {
            if(data.retCode == 1){
                if(data.dataRows == "OrdinaryUser"){
                    /*证明是普通用户*/
                    window.location.href = "user.html"
                }
            }else{
                error();
            }
        },
        error:function () {
            alert("0");
        }
    });
}


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
    /*alert(username);
    axios({
        url: 'http://localhost:8080/user/login',
        method: 'post',
        data: {
            "name": username,
            "password": userpassword
        },
        transformRequest: [function (data) {
            var oMyForm = new FormData();
            oMyForm.append("name", username);
            oMyForm.append("password", userpassword);
            console.info(oMyForm);
            return oMyForm;
        }],
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(function (response) {
            alert("1111");
        })
        .catch(function (error) {
            console.log(error);
        });*/
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
            alert("1")
        },
        error:function () {
            alert("0");
        }
    });


}

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
