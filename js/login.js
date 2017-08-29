require(["config"], function() {
    require(["jquery", "cookie", "load"], function($) {

        $("#toLogin").click(function() {
            var name = $("#username").val(),
                pwd = $("#password").val();

            function check() {
                $.ajax({
                    type: "post",
                    url: "/php/demo1.php",
                    async: true,
                    data: {
                        "type": "login",
                        "username": name,
                        "password": pwd
                    },
                    success: function(data) {
                        var flog = JSON.parse(data);
                        if (flog == true) {
                            alert("登录成功");
                            location = "../index.html";
                            $.cookie("username", name,{Domain:"../",path:"/",expires:3});
                            // 将用户名保存到cookie中
                            // $.cookie.json = true;
                        } else {
                            alert("登录失败，请检查用户名和密码是否正确")
                        }
                    }
                });
            };
            check();
            console.log(name);
            console.log(pwd);
        })
    })
})