require(["config"], function() {
    require(["jquery", "cookie", "load"], function() {
        var boolUser, boolPwd1, boolPwd2, boolYzm;
        //验证用户名是否合法
        $("#username").blur(function() {
            uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
            boolUser = uPattern.test($(this).val());
            if (!boolUser) {
                $(".hint").css("visibility", "visible");
                $(".hint p").html("用户名错误，4到16位(字母，数字，下划线，减号)");
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
            // console.log(yzm);
            $(this).html(yzm);
        })
        $("#verification_code").blur(function() {
            if ($(this).val().toUpperCase() !== $(".register_box ul li:nth-of-type(3) button").html().toUpperCase()) {
                $(".hint").css("visibility", "visible");
                $(".hint p").html("验证码错误");
                boolYzm = false;
            } else {
                $(".hint").css("visibility", "hidden");
                $(".hint p").html("");
                boolYzm = true;
            }
        })

        //验证密码上是否合法
        $("#password1").blur(function() {
            //密码强度正则，必须包含大小写字母和数字的组合,不能使用特殊字符,长度在6-10之间
            var pPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
            boolPwd1 = pPattern.test($(this).val());
            if (!boolPwd1) {
                $(".hint").css("visibility", "visible");
                $(".hint p").html("密码不合法,必须包含大小写字母和数字的组合,不能使用特殊字符,长度在6-10之间");
            } else {
                $(".hint").css("visibility", "hidden");
                $(".hint p").html("");
            }
        })

        //重复密码
        $("#password2").blur(function() {
            if ($(this).val() !== $("#password1").val()) {
                boolPwd2 = false;
                $(".hint").css("visibility", "visible");
                $(".hint p").html("密码不一致");
            } else {
                $(".hint").css("visibility", "hidden");
                $(".hint p").html("");
                boolPwd2 = true;
            }
        });
        //注册，将用户名和密码保存到cookie中
        $("#toReg").click(function() {
            if (boolUser && boolYzm && boolPwd1 && boolPwd2) {
               $.cookie("username",$("#username").val());
               $.cookie("password",$("#password1").val());
            } else {
                alert("请检查输入");
            }
        })
    })
})