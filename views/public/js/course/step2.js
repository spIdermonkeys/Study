/**
 * Created by jj on 2017/4/12.
 */
define(["jquery", "util", "template","uploadify","jcrop"], function($, util, template){
    var id = util.getQuery().id;
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    $.ajax({
        url: "/api/course/picture",
        type: "get",
        data: {cs_id: id},
        success: function(data){
            if(data.code == 200){
                var htmlStr = template("step2_tpl", data.result);
                $(".course-add").html(htmlStr);

                //文件上传插件
                $("#btn_upload").uploadify({
                    swf:"/views/public/assets/uploadify/uploadify.swf",
                    uploader:"/api/uploader/cover",
                    fileObjName:"cs_cover_original",
                    formData:{cs_id: id},
                    buttonText:"选择图片",
                    itemTemplate:"<span></span>",
                    width:70,
                    height:30,
                    buttonClass:"btn btn-success btn-sm",
                    onUploadSuccess:function(file,data){
                        data = JSON.parse(data);
                        if(data.code == 200){
                            $(".preview img").attr("src",data.result.path);
                            $("#btn_cut").prop("disabled",false).text("保存图片");
                        }
                    }
                });
                $("#btn_upload-button").css("lineHeight", "1.5");
            }
        }
    });
    //点击保存按钮，当按钮状态为裁剪是 按钮内容和状态改为保存
    $(".course-add").on("click","#btn_cut",function(){
       if($(this).attr("data-status") == "cut"){
           $(this).text("保存");
           $(this).attr("data-status","save");

           //图片裁剪插件
           $(".preview img").Jcrop({
               //宽高比
               aspectRatio:2,
               boxWidth:400,
               setSelect:[0,100,400,200]

           },function(){
               var jcrop_api = this;
               //缩略图
               thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120, ele: $(".thumb")});
               this.ui.preview = thumbnail;
           })
       }else {
           $.ajax({
               url:"/api/course/update/picture",
               type:"post",
               data:{cs_id:id,x:x,y:y,w:w,h:h},
               success:function(data){
                   if(data.code == 200){
                       location.href = "/course/step3?id=" + data.result.cs_id;
                   }
               }
           })
       }
    });
    $(".course-add").on("cropmove", ".preview", function(a, b, c){
        x = c.x;
        y = c.y;
        w = c.w;
        h = c.h;
    })
})