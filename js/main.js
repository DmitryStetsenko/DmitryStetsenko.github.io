 $(document).ready(function () {
        // ------------- Burger menu --------------------
        $('.burger-menu, .burger-menu-items').click(function () {
            var coord = $('.burger-menu').offset();
            var activeMenu = $('.burger-menu-items');
            console.log(coord);
            activeMenu.toggleClass('menu-active');
        });

        $(document).click(function (event) {
            if ($(event.target).closest('.burger-menu').length) return;
            $('.burger-menu-items').removeClass('menu-active');
            event.stopPropagation();
        });
        // -----------------------------------------------------

        // --------------- Slider ----------------------------
        var scrollRight = $('#scroll-right');
        var scrollLeft = $('#scroll-left');
        var sliderItems = $('.slider-items');
        var sliderLength = sliderItems.length;
        var trigger = sliderLength;
        var marginRight = 0;
        var marginLeft = 0;
        var numbersOfClick,numbersOfrevers;


     // ---------------------Media query ----------------------
     var mql = window.matchMedia('all and (max-width: 1366px)');
     if (mql.matches) {
         $('.slider-visible').attr('number', '4');

     }else {
         $('.slider-visible').attr('number', '4');
     }
     mql = window.matchMedia('all and (max-width: 1365px)');
     if (mql.matches) {
         $('.slider-visible').attr('number', '3');

     }
     mql = window.matchMedia('all and (max-width: 1024px)');
     if (mql.matches) {
         $('.slider-visible').attr('number', '2');

     }
     mql = window.matchMedia('all and (max-width: 700px)');
     if (mql.matches) {
         $('.slider-visible').attr('number', '1');

     }

     $(window).resize(function(){
          var mql = window.matchMedia('all and (max-width: 1366px)');
         if (mql.matches) {
            $('.slider-visible').attr('number', '4');
         } else {
             $('.slider-visible').attr('number', '4');
         }
         mql = window.matchMedia('all and (max-width: 1365px)');
         if (mql.matches) {
             $('.slider-visible').attr('number', '3');
         }
         mql = window.matchMedia('all and (max-width: 1024px)');
         if (mql.matches) {
             $('.slider-visible').attr('number', '2');
         }
         mql = window.matchMedia('all and (max-width: 700px)');
         if (mql.matches) {
             $('.slider-visible').attr('number', '1');

         }
         var numberItems = parseInt($('.slider-visible').attr('number'));
         numbersOfClick = sliderLength - numberItems;
         numbersOfrevers = 0;
         marginLeft = 0;
         sliderItems.eq(0).css('margin-left', marginLeft + 'px');
     });
     //---------------------------------------------------------

        scrollRight.click(function () {
            if (!(numbersOfClick === 0)) {
                marginLeft -= 267;
                sliderItems.eq(0).css('margin-left', marginLeft + 'px');
                numbersOfClick = numbersOfClick - 1;
                numbersOfrevers ++;
            }
        });

        scrollLeft.click(function () {
            if (!(numbersOfrevers === 0)) {
                marginLeft += 267;
                sliderItems.eq(0).css('margin-left', marginLeft + 'px');
                numbersOfrevers = numbersOfrevers -1;
                numbersOfClick = numbersOfClick + 1;
            }

        });
        //----------------------------------------------------


// вызовем событие resize

     $(window).resize();
 });
