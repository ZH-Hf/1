require(["config"], function() {
    require(["jquery", "cookie", "load"], function($) {
        var products = JSON.parse($.cookie("products"));
        var html, totalPrice;
        //动态加载购物车
        for (var i = 0; i < products.length; i++) {
            totalPrice = (products[i].price * products[i].amount).toFixed(1);
            html = `<tr class="cartList">
                   <td class="firstTd">
                       <input type="checkbox" class="sub_ck">
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
                       <a href="javascript:void(0);" class="mius">-</a>
                       <a href="javascript:void(0);" class="amount">${products[i].amount}</a>
                       <a href="javascript:void(0);" class="add">+</a>
                   </td>
                   <td>
                       暂无折扣
                   </td>
                   <td>
                      ${totalPrice}
                   </td>
                   <td class="lastTd">
                       <a href="javascript:void(0);"><img src="../img/cart/close.png"></a>
                   </td>
               </tr>`

            $(html).appendTo(".table table tbody");
        }
        //点击加减数量
        var _amount, _price;

        function calTotal() {

        }
        $(".mius").click(function() {
            _amount = $(this).next().html();
            _amount--;
            if (_amount <= 1)
                _amount = 1;
            $(this).next().html(_amount);
            _price = $(this).parent().prev().html();
            totalPrice = (_price * _amount).toFixed(1);
            $(this).parent().next().next().html(totalPrice);
        });

        $(".add").click(function() {
            _amount = $(this).prev().html();
            _amount++;
            $(this).prev().html(_amount);
            _price = $(this).parent().prev().html();
            totalPrice = (_price * _amount).toFixed(1);
            $(this).parent().next().next().html(totalPrice);
        })
    })
})