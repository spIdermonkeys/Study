define(["jquery", "template","util","form","datepicker","datepicker_cn","validate"], function($,template,util){

    //根据url的id来判断用户是添加操作还是编辑操作
    var tc_id = util.getQuery().id;
    //如果有id就是编辑讲师
    if(tc_id){
        $.ajax({
            url:"/api/teacher/edit",
            type:"get",
            data:{tc_id:tc_id},
            success:function(data){
                if(data.code == 200){
                    data.result.title = "编辑讲师";
                    data.result.btnText = "保 存";
                    //改为编辑讲师的接口
                    data.result.url = "/api/teacher/update";
                    var htmlStr = template("edit_tpl",data.result);
                    $("#edit_panel").html(htmlStr);
                    //日期插件
                    $("#input-date").datepicker({
                        format: 'yyyy-mm-dd',
                        language:"zh-CN"
                    })
                    register();
                }
            }
        })
    }else{
        var data = {
            title:"添加讲师",
            btnText:"添 加",
            url:"/api/teacher/add",
            tc_gender:0
        };
        var htmlStr = template("edit_tpl",data);
        $("#edit_panel").html(htmlStr);
        //日期插件
        $("#input-date").datepicker({
            format: 'yyyy-mm-dd',
            language:"zh-CN"
        })
        register();
    }
    //表单验证封装
    function register(){
        $("form").validate({
            //失去焦点时进行验证
            onBlur : true,
            //阻止表单默认提交
            seedForm:false,
            //当表单通过验证时调用函数，使边框颜色变绿
            eachValidField:function(){
                $(this).parent().addClass("has-success").removeClass("has-error");
            },
            eachInvalidField:function(){
                $(this).parent().addClass("has-error").removeClass("has-success");
            },
            //表单所有元素通过验证的时候调用方法
            valid:function(){
                //所有验证都成功了 提交数据
                $("form").ajaxSubmit({
                    success: function(data){
                        if(data.code == 200){
                            location.href="/teacher/list"
                        }
                    }
                });
            },
            //为每一个需要提示信息的字段设置提示内容
            description:{
                name:{
                    //这个属性用来指定字段为空的时候的验证信息
                    required:"请输入讲师名称",
                },
                pass:{
                    required:"请输入讲师名称",
                    pattern:"请输入6到15位密码"
                },
                join_date:{
                    required:"请输入入职时间"
                }
            }
        })
    }
})