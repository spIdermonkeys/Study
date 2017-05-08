/**
 * Created by jj on 2017/4/10.
 */
define(["jquery","ckeditor","template","region","uploadify","datepicker","datepicker_cn","form"],function($,CKEDITOR,template){
    //提交数据 渲染模板
    $.ajax({
        url:"/api/teacher/profile",
        success:function(data){
            if(data.code == 200){
                var htmlStr = template("settings_tpl",data.result);
                $(".teacher-profile").html(htmlStr);
                //省市区三级联动
                $("#region").region({
                    url:"/views/public/assets/jquery-region/region.json"
                });

                //文件上传插件
                $("#upfile").uploadify({
                    swf:"/views/public/assets/uploadify/uploadify.swf",
                    uploader:"/api/uploader/avatar",
                    buttonText:"",
                    height:120,
                    width:120,
                    fileObjName:"tc_avatar",
                    onUploadSuccess:function(file,data){
                        data = JSON.parse(data);
                        if(data.code == 200){
                            //图片在上传成功之后，后台会返回后台保存该图片的地址
                            var path = data.result.path;
                            //获取图片地址之后，将图片显示在头像位置
                            $(".preview>img").attr("src", path);
                        }
                    }
                })
                //日期插件
                $(".data_datepicker").datepicker({
                    format: 'yyyy-mm-dd',
                    language:"zh-CN"
                })
                //富文本编辑器插件
                CKEDITOR.replace("tc_introduce",{
                    toolbarGroups : [
                        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                        '/',
                        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] }
                    ]
                });
                //form表单提交
                $("form").submit(function(){
                    //ekeditor存在问题，所以需要手动的将ckEditor中的内容更新到textarea中
                    $("[name=tc_introduce]").val(CKEDITOR.instances.tc_introduce.getData());
                    $(this).ajaxSubmit({
                        url:"/api/teacher/modify",
                        type:"post",
                        success:function(data){
                            if(data.code == 200){
                                alert("提交成功");
                            }
                        }
                    })
                    return false;
                });
            }
        }
    })
})