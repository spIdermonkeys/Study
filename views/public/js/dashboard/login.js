/**
 * Created by jj on 2017/4/6.
 */
define(["jquery","cookie","form"],function($){
    var userInfoStr = $.cookie("userInfo");
    if(userInfoStr){
        //判断 如果获取到了用户头像就设置为用户头像
        var userInfo = JSON.parse(userInfoStr);
        $(".avatar img").attr("src",userInfo.tc_avatar);
    }
    $("form").submit(function(){
        $("form").ajaxSubmit({
            success:function(data){
                if(data.code == 200){
                    //存储用户头像 并跳转页面
                    $.cookie("userInfo",JSON.stringify(data.result),{path:"/"});
                    location.href = "/";
                }else{
                    alert(data.msg);
                }
            }
        })
        return false;
    })
})