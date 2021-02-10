
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
            alert("1");
        },
        error:function () {
            alert("0");
        }
    });
}
