/**
 * Created by jj on 2017/4/11.
 */
define(function(){
   return{
       //获取url中所有的参数
       getQuery:function(){
        var queryString = {};
        location.search.slice(1).split("&").forEach(function(v){
            var kvp = v.split("=");
            queryString[kvp[0]] = kvp[1];
        })
        return queryString;
    }
   }
});