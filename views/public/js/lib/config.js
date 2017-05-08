/**
 * Created by jj on 2017/4/6.
 */
requirejs.config({
    baseUrl:"/views/public",
    paths:{
        jquery: "assets/jquery/jquery.min",
        cookie: "assets/jquery-cookie/jquery.cookie",
        form: "assets/jquery-form/jquery.form",
        template: "assets/artTemplate/template",
        bootstrap: "assets/bootstrap/js/bootstrap.min",
        nprogress: "assets/nprogress/nprogress",
        datepicker:"assets/bootstrap-datepicker/js/bootstrap-datepicker",
        datepicker_cn:"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
        validate:"assets/jquery-validate/jquery-validate.min",
        ckeditor:"assets/ckeditor/ckeditor",
        region:"assets/jquery-region/jquery.region",
        uploadify:"assets/uploadify/jquery.uploadify",
        util: "js/lib/util",
        jcrop:"assets/jcrop/js/Jcrop",
        echarts:"assets/echarts/echarts.min"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
        datepicker_cn:{
            deps:["jquery","datepicker"]
        },
        validate:{
            deps:["jquery"]
        },
        ckeditor:{
            exports:"CKEDITOR"
        },
        uploadify:{
            deps:["jquery"]
        },
        jcrop:{
            deps:["jquery"]
        },
        echarts:{
            exports:"echarts"
        }
    }
})