/**
 * Created by jj on 2017/4/8.
 */
define(["jquery","template","bootstrap"],function($,template){
    //获取讲师列表
    $.ajax({
        url:"/api/teacher",
        type:"get",
        success:function(data){
            if(data.code == 200){
                var htmlStr = template("list_tpl",data);
                $("#tbl_teacher>tbody").html(htmlStr);
            }
        }
    });
    //获取查看按钮点击事件，点击按钮弹出模态框
    //事件代理机制 所有的查看按钮
    $("#tbl_teacher>tbody").on("click",".btn_check",function(){
        //获取当前点击的讲师的id
        var id = $(this).parent().attr("data-id");
        //向服务器请求通过id找到的讲师id
        $.ajax({
            url:"/api/teacher/view",
            type:"get",
            data:{tc_id: id},
            success:function(data){
                if(data.code == 200){
                    var htmlStr = template("check_tec",data.result);
                    $("#info_dialog").html(htmlStr);
                    $("#teacherModal").modal();
                }
            }
        })
    });

    //点击注销按钮切换到启用
    $("#tbl_teacher>tbody").on("click",".btn_handle",function(){
        //获取当前讲师的id
        var id = $(this).parent().attr("data-id");
        //获取当前讲师的状态
        var status = $(this).attr("data-status");
        var _this = this;
        $.ajax({
            url:"/api/teacher/handle",
            type:"post",
            data:{
                tc_id:id,
                tc_status:status
            },
            success:function(data){
                if(data.code == 200){
                    //重新完成修改后的状态
                    $(_this).attr("data_status",data.result.tc_status);
                    //alert(data.result.tc_status);
                    //根据当前状态切换文字
                    $(_this).text(data.result.tc_status==0?"注 销":"启 用");
                }
            }
        })
    })
})