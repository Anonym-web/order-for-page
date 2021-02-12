var searchUrl = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')
var searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
var searchText = decodeURI(searchData[1]); //decodeURI解码
$("#userXianshiPhone").text(searchText);
if(searchText == ""){
    $("#loginOrloginUp").html("登录/注册");
}else{
    $("#loginOrloginUp").html("");
}



