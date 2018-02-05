
$(document).ready(function () {
         slowScroll('#social');
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
     var slideControl = $('.scroll');


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
         if (numbersOfClick === 0) {
             slideControl.css('display','none');
         } else slideControl.css('display','block');
     });

     if (numbersOfClick === 0) {
         slideControl.css('display','none');
     } else slideControl.css('display','block');
     //---------------------------------------------------------

     scrollRight.click(function () {
         var firstItems = $('.slider-items').eq(0);
         if (!(numbersOfClick === 0)) {
             marginLeft -= 267;
             sliderItems.eq(0).css('margin-left', marginLeft + 'px');
             numbersOfClick = numbersOfClick - 1;
             numbersOfrevers ++;
         } else {
             firstItems.appendTo('.slider-visible');
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
     function slowScroll(id) {
        $('html, body').animate({scrollTop: $(id).offset().top}, 500);
        return false;
     }

      //----------------------------------------------------


// вызовем событие resize
     $('a:contains("bout")').click(function () {slowScroll('#about');});
     $('a:contains("alendar")').click(function () {slowScroll('#calendar');});
     $('a:contains("ews")').click(function () {slowScroll('#news');});
     $('a:contains("ideo")').click(function () {slowScroll('#video');});
     $('a:contains("olunteer")').click(function () {slowScroll('#volunteer');});
     $('a:contains("ponser")').click(function () {slowScroll('#partners');});
     $('a:contains("ontact")').click(function () {slowScroll('#footer');});
     $(window).resize();
 });
