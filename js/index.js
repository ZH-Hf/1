require(["config"], function() {
    require(["jquery", "load", "loadCarousel", "loadIndexData", "cookie"], function($) {
        $(".banner>ul>li").hover(function(e) {
            e = e || event;
            e.stopPropagation();
            $(this).children(".sub_menu").stop().fadeIn();
            // console.log("show");
            $(this).css("background", "#fff");
            $(".toPrev,.toNext").stop().fadeOut();

        }, function(e) {
            e = e || event;
            // e.stopPropagation();
            $(this).children(".sub_menu").stop().fadeOut();
            // console.log("hide");
            $(this).css("background", "#F5F5F5");
            $(".toPrev,.toNext").stop().fadeIn();
        });
        $(".multi_menu").css({
            cursor:"pointer"
        }).click(function(){
            location = "html/list.html"
        })
        // 获取窗口高度
        var winHeight = $(window).height();
        // 获取1L之前的布局结构高度
        var layoutHeight = $(".products_template_2").offset().top;
        // 标记是鼠标滚轮的滚动还是点击菜单导航的滚动
        var autoScroll = true;
        var floorIndex = 0;
        var floorHeight = $(".products_template_2").eq(0).height();
        // 滚动
        $(window).scroll(function() {
            var _scrollTop = $(window).scrollTop();
            floorIndex = parseInt((_scrollTop - layoutHeight + winHeight / 2) / floorHeight);
            console.log(floorIndex);
            if (autoScroll) {
                // 获取当前滚动的高度


                // 判断滚动的高度
                if (_scrollTop > layoutHeight - winHeight / 2) {

                    $(".side_menu").stop().fadeIn();
                } else {

                    $(".side_menu").stop().fadeOut();
                }

                // 滚动过程中导航菜单样式切换
                $(".products_template_2").each(function(index, element) {
                    // 当前遍历到楼层在文档中距离顶部高度
                    var _top = $(element).offset().top;
                    // 判断
                    if (_scrollTop > _top - winHeight / 2) {
                        $(".side_menu li").eq(index)
                            .children("span").show()
                            .end()
                            .siblings()
                            .children("span").hide();
                    }
                });
            }
        });

        // 点击菜单跳转
        // $(".side_menu").delegate("li", "click", function(){});
        $(".side_menu").on("click", "li", function() {
            // 标记点击滚动
            autoScroll = false;
            // 找出当前点击li的索引
            var idx = $(this).index();
            // 计算idx对应楼层在文档中的定位
            var _top = $(".products_template_2").eq(idx).offset().top;
            // 运动动画
            var _that = this;
            $("html, body").stop().animate({ scrollTop: _top }, function() {
                autoScroll = true;
                $(_that).children("span").show().addClass("activeMenu").end().siblings().children("span").hide().removeClass("activeMenu");
            });
            // 点击的 li 切换显示样式内容

        });

        // 菜单上移入移出
        $(".side_menu li").hover(function() {
            $(this).children("span").show().addClass("activeMenu");
        }, function() {
            if ($(".side_menu li").index(this) !== floorIndex)
                $(this).children("span").hide().removeClass("activeMenu");
        });

    });
});