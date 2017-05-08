/**
 * Created by jj on 2017/4/11.
 */
define(["jquery","template"],function($,template){
    $.ajax({
        url:"/api/course",
        type:"get",
        success:function(data){
            if(data.code == 200){
                var htmlStr = template("list_tpl",data);
                $(".courses").html(htmlStr);
            }
        }
    })
})