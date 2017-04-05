var userInfo = JSON.parse($.cookie("userInfo"));

var htmlStr = template("userInfoTpl", userInfo);

$("#profile").html(htmlStr);