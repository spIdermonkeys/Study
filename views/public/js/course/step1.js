/**
 * Created by jj on 2017/4/11.
 */
define(["jquery","template","ckeditor","util","form"],function($,template,CKEDITOR,util){
    //获取上一个页面传来的id
    var id = util.getQuery().id;
    //根据当前获取的id去后台请求对应的课程信息
    $.ajax({
        url:"/api/course/basic",
        type:"get",
        data:{cs_id: id},
        success:function(data){
            if(data.code == 200){
                var htmlStr = template("step1_tpl",data.result);
                $(".course-add").html(htmlStr);

                //富文本插件
                CKEDITOR.replace("cs_brief");
                //根据一级分类获取二级分类并渲染到页面
                getChildCategory();
            }
        }
    });
    function getChildCategory(){
        var pid = $("#top").val();
        $.ajax({
            url:"/api/category/child",
            type:"get",
            data:{cg_id:pid},
            success:function(cgdata){
                if(cgdata.code == 200){
                    //模板字符串
                    var tpl_category = '{{each result as v i}}<option value="{{v.cg_id}}">{{v.cg_name}}</option>{{/each}}';
                    //根据模板字符串生成一个渲染函数
                    var render = template.compile(tpl_category);
                    var htmlStr = render(cgdata);
                    $("[name=cs_cg_id]").html(htmlStr);
                }
            }
        })
    }
    //注册onchange事件 当一级分类改变的时候，二级分类改变
    $(".course-add").on("change","#top",function(){
        getChildCategory();
    });

    $(".course-add").on("click","#btn_save",function(){
        $("[name=cs_brief]").val(CKEDITOR.instances.cs_brief.getData());
        $("form").ajaxSubmit({
            url:"/api/course/update/basic",
            type:"post",
            success:function(data){
                if(data.code == 200){
                    location.href="/course/step2?id=" + data.result.cs_id;
                }
            }
        });
        return false;
    })
})
