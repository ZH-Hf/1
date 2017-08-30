define(["jquery", "cookie"], function($) {
    $(".header").load("/html/include/header.html");
    $(".footer").load("/html/include/footer.html");
    $.get({
        url: "/html/include/header.html",
        success: function(data) {
            // console.log($.cookie("username"));
            if ($.cookie("username")) {
                var html =
                    ` <ul class="top_right">
                    <li style="border:0"><a href="#" style="border:0">${$.cookie("username")}，你好</a></li>
                    <li style="border:0"><a href="#" style="border:0" id="logout">退出</a></li>
                    <li><a href="#" style="border-left:0">我的订单</a></li>
                    <li><a href="#">我的收藏</a></li>
                  </ul>
                `;
                $(".top_right").html(html);
            }
            $("#logout").click(function() {
                $.cookie("username", "", { path: "/", expires: -1 });

                var html =
                    ` <ul class="top_right">
                    <li><a href="/html/login.html">登录</a></li>
                    <li><a href="/html/register.html">注册</a></li>
                    <li><a href="#" style="border-left:0">我的订单</a></li>
                    <li><a href="#">我的收藏</a></li>
                  </ul>
                `;
                $(".top_right").html(html);

            })
            $(".logo img").click(function() {
                location = "/index.html"
            });
            $(".shopping_bag").click(function(){
                location = "/html/cart.html"
            })
        }
    });
});