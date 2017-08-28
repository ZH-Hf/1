require(["config"], function() {
    require(["jquery", "cookie", "load"], function() {
        $.getJSON({
            url: "/mock/user.json",
            success: function(data) {
                //验证手机号码是否合法
                $(".register_box ul li:nth-of-type(1) input").blur(function() {
                    console.log($(this).val());
                    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($(this).val()))) {
                        $(".hint").css("visibility", "visible");
                        $(".hint p").html("号码错误");
                    } else {
                        $(".hint").css("visibility", "hidden");
                        $(".hint p").html("");
                    }
                })
                //验证码
                var yzmS = ["A", "B", "C", "D", "E", "F", "G", "H", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
                $(".register_box ul li:nth-of-type(3) button").click(function() {
                    var yzm = "";
                    for (var i = 0; i < 4; i++) {
                        yzm += yzmS[parseInt(Math.random() * yzmS.length)];
                    }
                    console.log(yzm);
                    $(this).html(yzm);
                })
                $(".register_box ul li:nth-of-type(2) input").blur(function() {
                    if ($(this).val().toUpperCase() !== $(".register_box ul li:nth-of-type(3) button").html().toUpperCase()) {
                        $(".hint").css("visibility", "visible");
                        $(".hint p").html("验证码错误");
                    } else {
                        $(".hint").css("visibility", "hidden");
                        $(".hint p").html("");
                    }
                })

            }
        });
    })
})