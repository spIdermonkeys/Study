define(["jquery","template","nprogress","cookie" ], function ($, template,NProgress) {
    //使用nprogress插件 页面加载时显示进度条
    NProgress.start();

    NProgress.done();
    //ajax全局事件
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        NProgress.done();
    })
    //利用ajax全局事件判断当页面401报错时，直接跳转至login页面
    $(document).ajaxComplete(function(e,xhr){
        if(xhr.status == 401){
            location.href = "/login";
        }
    })
    //var phpSessID = $.cookie("PHPSESSID");
    var userInfoStr = $.cookie("userInfo");
    //alert(phpSessID);
    if(!userInfoStr){
        //判断如果没有登录就直接跳转到登录页面
        location.href = "/login"
        //下面这段代码不能再login页面中执行，因为login页面中没有侧变栏，不需要加载头像以及用户名信息
    }else if(!(location.pathname == "/login" || location.pathname == "/dashboard/login" || location.pathname == "/index.php/dashboard/login")){
        var userInfo = JSON.parse(userInfoStr);
        var htmlStr = template("userInfoTpl", userInfo);
        $("#profile").html(htmlStr);
    }

    //退出功能
    $("#logout").on("click",function(){
        $.ajax({
            url:"/api/logout",
            type:"post",
            success:function(data){
                if(data.code == 200){
                    location.href = "/login";
                }
            }
        })
    })

    //导航栏点击下拉效果
    $(".navs>ul>li>ul").parent().click(function(){
        $(this).children("ul").slideToggle();
    })
})