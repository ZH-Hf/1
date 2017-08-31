require(["config"], function() {
    require(["jquery", "cookie", "load"], function($) {
        var _totalPrice = $.cookie("totalPrice");

        $(".GoToPay span b").html(_totalPrice);
        var products = JSON.parse($.cookie("productsToPay"));
        var html, totalPrice;
        $(".GoToPay button").click(function(){
            alert("没钱！")
        })
        //动态加载购物车
        for (var i = 0; i < products.length; i++) {
            totalPrice = (products[i].price * products[i].amount).toFixed(1);
            html = `<tr class="cartList">
                   <td class="firstTd">
                      
                   </td>
                   <td>
                       <img src="${products[i].img}">
                   </td>
                   <td>
                       ${products[i].name}
                   </td>
                   <td>
                       ${products[i].price}
                   </td>
                   <td>
                      ${products[i].amount}
                   </td>
                   <td>
                       暂无折扣
                   </td>
                   <td class="totalPrice">
                      ${totalPrice}
                   </td>
                  
               </tr>`

            $(html).appendTo(".table table tbody");
        }
        $.getJSON({
            url: "/mock/address.json",
            success: function(data) {
                console.log(data);
                var address = {};
                var provinces = data.regions;
                // console.log(provinces);
                $.each(provinces, function(index, province) {
                    // address[province.name] = [];
                    address[province.name] = {};
                    var cities = province.regions;
                    $.each(cities, function(index, city) {
                        // console.log(city);
                        address[province.name][city.name] = city.regions;
                    });
                });
                initProvince();
                // console.log(address);


                // 省份初始化
                function initProvince() {
                    $("#province").empty().append('<option value="-1">请选择省份</option>');
                    for (var provinceName in address) {
                        $("<option value='" + provinceName + "'>" + provinceName + "</option>").appendTo("#province");
                    }
                }

                // 城市加载
                function initCity() {
                    // 获取当前已选的省份
                    var provinceName = $("#province").val();
                    // 获取该省份下的所有城市
                    var cities = address[provinceName];
                    // 显示城市
                    $("#city").empty().append("<option value='-1'>请选择城市</option>");
                    for (var cityName in cities) {
                        $("<option>" + cityName + "</option>").appendTo("#city");
                    }
                }

                // 加载区县
                function initDistrict() {
                    // 获取已选省份与城市
                    var provinceName = $("#province").val(),
                        cityName = $("#city").val();
                    // 获取选定城市下的所有区县信息
                    var districts = address[provinceName][cityName];
                    // 显示区县
                    $("#district").empty().append("<option value='-1'>请选择区县</option>");
                    for (var i in districts) {
                        $("<option>" + districts[i].name + "</option>").appendTo("#district");
                    }
                }

                $("#province").on("change", initCity);
                $("#city").on("change", initDistrict);
            }
        });
    })
})