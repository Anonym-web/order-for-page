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
    url:"http://localhost:8080/user/selectUserById",
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
    url:"http://localhost:8080/shop/selectShop",
    dataType:'json',
    data:{
        "type" : "business",
        "userId":searchText
    },
    async:true,
    success:function (data) {
        if (data.retCode == 1){
			$("#addShopsyUser").html("");
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
                $("#tr").append("<div class='shops'  style='margin-left:"+marginLeft+"px;margin-top:"+marginTop+"px;width: 250px;height: 300px;background: url(assets/img/bg.jpg);position: absolute'><div class='shopsDiv' style='background : white;width: 250px;height: 0px;bottom: 0px;position: absolute'><div class='shopDivli' style='width : 250px;height: 50px;position: absolute;display: none;text-align: center;font-size: 15px;line-height: 50px;word-wrap:break-word'>"+datalist[i].name+"</div><div class='shopDivli' style='width : 150px;height: 30px;position: absolute;display: none;margin-top: 50px;text-align: center;font-size: 15px;line-height: 30px;word-wrap:break-word'>"+datalist[i].price+"</div><div class='shopDivli' style='width : 100px;height: 30px;position: absolute;display: none;margin-top: 50px;margin-left: 150px;text-align: center;font-size: 15px;line-height: 30px;word-wrap:break-word'>总订单: "+datalist[i].sales+"笔</div></div></div>");
                item = item+1;
            }
        }else{
            alert(data.retVal);
        }

    },
    error:function () {
        /* alert("0"); */
    }
});

$(document).on('mouseover','.shops',function(){
    $(this).find(".shopsDiv").stop(false).animate({height:"80px"},500);
    $(this).find(".shopDivli").css("display","block");
})

$(document).on('mouseout','.shops',function(){
    $(this).find(".shopsDiv").stop(false).animate({height:"0px"},500);
    $(this).find(".shopDivli").css("display","none");
})

