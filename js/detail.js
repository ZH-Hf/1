require(["config"], function() {
    require(["jquery", "cookie", "load"], function() {
        require(["zoom"], function() {
            $("#zoom").elevateZoom({
                zoomWindowWidth: 400,
                zoomWindowHeight: 400,
                borderSize: 1
            });
            $("#gal1 a").click(function() {
                $("#zoom").prop("src", $(this).data("image"));
                $("#zoom").data("zoom-image", $(this).data("image"));
                $("#zoom").elevateZoom({
                    zoomWindowWidth: 400,
                    zoomWindowHeight: 400,
                    borderSize: 1
                });
                $(this).addClass("activeThumb").siblings().removeClass("activeThumb");
            })
        });

    })
})