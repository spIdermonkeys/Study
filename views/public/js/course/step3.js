/**
 * Created by jj on 2017/4/12.
 */
define(["jquery","template","util","bootstrap","form"],function($,template,util){
    var id = util.getQuery().id;
    $.ajax({
        url:"/api/course/lesson",
        type:"get",
        data:{cs_id:id},
        success:function(data){
            if(data.code == 200){
                var htmlStr = template("lesson_tpl",data.result);
                $(".course-add").html(htmlStr);
            }
        }
    })
    //课时添加按钮的事件
    $(".course-add").on("click","#btn_add",function(){
        var data = {
            url:"/api/course/chapter/add",
            title:"添加课时",
            buttonText:"添加",
            ct_cs_id: id
        };
        var htmlStr = template("moadle_tpl",data);
        $(".modal-content").html(htmlStr);
        $("#chapterModal").modal();
    })
    //点击保存按钮事件
    $("#chapterModal").on("click","#btn_save",function(){
        var isFree = Number($("#ct_is_free").prop("checked"));
        $("form").ajaxSubmit({
            data:{ct_is_free:isFree},
            success:function(data){
                if(data.code == 200){
                    //隐藏模态框
                    $("#chapterModal").modal("hide");
                    //并重新渲染页面
                    $.ajax({
                        url:"/api/course/lesson",
                        type:"get",
                        data:{cs_id: id},
                        success:function(data){
                            if(data.code == 200){
                                //alert(0);
                                //console.log(data);
                                var htmlStr = template("list_tpl",data.result);
                                $(".lessons").html(htmlStr);
                            }
                        }
                    })
                }
            }
        })
    })
    //编辑按钮操作
    $(".course-add").on("click",".btn_edit",function(){
        var ct_id = $(this).parent().attr("data-id");
        $.ajax({
            url:"/api/course/chapter/edit",
            type:"get",
            data:{ct_id:ct_id},
            success:function(data){
                if(data.code == 200){
                    data.result.title = "编辑课时";
                    data.result.url = "/api/course/chapter/modify";
                    data.result.buttonText = "保存";
                    var htmlStr = template("moadle_tpl",data.result);
                    $(".modal-content").html(htmlStr);
                    $("#chapterModal").modal();
                }
            }
        })
    })
})