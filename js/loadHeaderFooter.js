define(["jquery", "cookie"], function($) {
    $(".header").load("/html/include/header.html");
    $(".footer").load("/html/include/footer.html");
    $.get({
        url: "/html/include/header.html",
        success: function(data) {
            if ($.cookie("loginUser")) {
                var html = 
                ` <ul class="top_right">
        			<li style="border:0"><a href="#" style="border:0">${$.cookie("loginUser")}，你好</a></li>
        			<li style="border:0"><a href="#" style="border:0">退出</a></li>
        			<li><a href="#" style="border-left:0">我的订单</a></li>
        			<li><a href="#">我的收藏</a></li>
      			  </ul>
				`;
                $(".top_right").html(html);
            }
        }
    });
});