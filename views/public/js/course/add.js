/**
 * Created by jj on 2017/4/11.
 */
define(["jquery","form"],function($){
    $("form").submit(function(){
        $(this).ajaxSubmit({
            url:"/api/course/create",
            type:"post",
            success:function(data){
                if(data.code == 200){
                    //跳转到下一个页面的时候还需要对这个课程进行编辑，所有获取到这个课程的id
                    location.href = "/course/step1?id=" + data.result.cs_id;
                }
            }
        });
        return false;
    });
})