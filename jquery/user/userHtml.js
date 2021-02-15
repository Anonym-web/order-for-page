var searchUrl = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')
var searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
var searchText = decodeURI(searchData[1]); //decodeURI解码
/*$("#userXianshiPhone").text(searchText);*/
if(searchText == ""){
    $("#loginOrloginUp").html("登录/注册");
}else{
    $("#loginOrloginUp").html("");
}

$.ajax({
    type:"post",
    url:"http://192.168.1.30:8080/user/selectUserById",
    dataType:'json',
    data:{
        "id":searchText
    },
    async:true,
    success:function (data) {
        if (data.retCode == 1){
            if (data.dataRows.name != '' && data.dataRows.name != null){
                $("#userXianshiPhone").text(data.dataRows.name);
            }else {
                $("#userXianshiPhone").text(data.dataRows.phone);
            }

        }
    },
    error:function () {
        alert("0");
    }
});

$.ajax({
    type:"post",
    url:"http://192.168.1.30:8080/shop/selectShop",
    dataType:'json',
    data:{
        "type" : "OrdinaryUser",
        "userId":searchText
    },
    async:true,
    success:function (data) {
         if (data.retCode == 1){
            if (data.dataRows == "" ){
                alert("暂时还没有店铺哦");
            }
			var datalist = data.dataRows;
			var marginLeft = 0;
			var marginTop = 0;
			var item = 1;
            for(var i = 0;i<datalist.length;i++){
				// 循环list
				if(item == 1){
					marginLeft = 100;
				}else{
					if(item > 4){
						marginLeft = 100;
						marginTop = marginTop+350;
					}else{
						marginLeft = marginLeft+350;
					}
				}
				$("#tr").append("<div class='shops'  style='margin-left:"+marginLeft+"px;margin-top:"+marginTop+"px;width: 250px;height: 300px;background: url(assets/img/bg.jpg);position: absolute'><div class='shopsDiv' style='width: 250px;height: 0px;background: grey;bottom: 0px;position: absolute'></div></div>");
				item = item+1;
			}
        }
		
    },
    error:function () {
        /* alert("0"); */
    }
});

/*鼠标移入动态效果*/
/* $(".shops").mouseover(function () {
	
    $(this).find(".shopsDiv").stop(false).animate({height:"80px"},500);
});


$(".shops").mouseout(function (){
    $(this).find(".shopsDiv").stop(false).animate({height:"0px"},500);
}) */

$(document).on('mouseover','.shops',function(){
	$(this).find(".shopsDiv").stop(false).animate({height:"80px"},500);
})

$(document).on('mouseout','.shops',function(){
	$(this).find(".shopsDiv").stop(false).animate({height:"0px"},500);
})