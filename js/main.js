$(document).ready(function() {
    // ------------- Burger menu --------------------
    $('.burger-menu, .burger-menu-items').click(function () {
        var coord =  $('.burger-menu').offset();
        var activeMenu = $('.burger-menu-items');
        console.log(coord);
        activeMenu.toggleClass('menu-active');
    });

    $(document).click(function (event) {
        if ($(event.target).closest('.burger-menu').length) return;
        $('.burger-menu-items').removeClass('menu-active');
        event.stopPropagation();
    })
    // -----------------------------------------------------

    // --------------- Slider ----------------------------
    var sliderItems = $('.slider-items');
    for ( var i = 0; i<sliderItems.length; i++) {
        sliderItems.eq(i).hide();
    }
       // установим обработчик события resize
    var maxWidth;
    $(window).resize(function(){
        // alert('Размеры окна браузера изменены.');
        var sliderItems = $('.slider-items');
        ItemsHide(sliderItems);

        var partners;
        maxWidth = window.matchMedia('all and (max-width: 1366px)');
        if (maxWidth.matches) {
            partners = 3;
            ItemsHide(sliderItems);
            for ( var i = 0; i < partners; i++) {
                sliderItems.eq(i).show();
            }
        } else {
            ItemsHide(sliderItems);
            partners = 4;
            for ( var i = 0; i < partners; i++) {
                sliderItems.eq(i).show();
            }
        }

        maxWidth = window.matchMedia('all and (max-width: 1150px)');
        if (maxWidth.matches) {
            ItemsHide(sliderItems);
            partners = 2;
            for ( var i = 0; i < partners; i++) {
                sliderItems.eq(i).show();
            }
        }

        maxWidth = window.matchMedia('all and (max-width: 860px)');
        if (maxWidth.matches) {
            ItemsHide(sliderItems);
            sliderItems.eq(0).show();
        }
        console.log (maxWidth.media);
    });

    function ItemsHide(Items) {
        for ( var i = 0; i<Items.length; i++) {
            Items.eq(i).hide();
        }
    }

    $('#scroll-right').click(function () {
        alert ('право')
    });

    $('#scroll-left').click(function () {
        var partnerItems = $('.slider-items');
        var numOfVis=0;
        // for (var i = 0; partnerItems.length; i++){
        //     if(!(partnerItems.eq(i).data('display') === 'none')){
        //         numOfVis ++;
        //     }
        // }
         console.log (numOfVis);
         console.log ( partnerItems.attr('display'));
        for (var i = 0; i < numOfVis; i++) {

        }
    });
// вызовем событие resize
    $(window).resize();
});
