$(document).ready(function () {
    // появление хедера
    var header = $('.main-header');
        header.toggleClass('header-offset');
    //---------------------
    //нажатие на поиск в десктоп версии
    $('.search').on('click',function () {
        $(this).addClass('unvisible');
        $('.main-logo-wrap').addClass('unvisible');
        $('.main-nav').addClass('unvisible');
        $('.search-active-wrap').removeClass('unvisible');
    });

    $('.search-active__close').on('click',function () {
        $('.search').removeClass('unvisible');
        $('.search-active-wrap').removeClass('visible');
        $('.search-active-wrap').addClass('unvisible');
        $('.main-logo-wrap').removeClass('unvisible');
        $('.main-nav').removeClass('unvisible');
        $('.search-active__input').val('');
    });
    // ------------- нажатие на поиск в десктоп версии

    // press burger menu
    $('.burger-menu__button').on('click',function () {
        $(this).toggleClass('display-none');
        $('.burger-menu__close').toggleClass('display-none');
        $('.burger-menu__nav').slideToggle();
    });
    $('.burger-menu__close').on('click',function () {
        $(this).toggleClass('display-none');
        $('.burger-menu__button').toggleClass('display-none');
        $('.burger-menu__nav').slideToggle();
    });
    // ------------- press burger menu

    // выпадающее меню
    $('.main-nav li').hover(
        function () {
            var thisMenu = $(this);
            thisMenu.children('ul .dropped-menu').css('display', 'block');
            thisMenu.children('ul .dropped-menu').addClass('unvisible');
            setTimeout(function () {
                thisMenu.children('ul .dropped-menu').addClass('visible');
                thisMenu.children('ul .dropped-menu').removeClass('unvisible')
            }, 50);

        },
        function(){
            var thisMenu = $(this);
            thisMenu.children('ul .dropped-menu').addClass('unvisible');
            thisMenu.children('ul .dropped-menu').removeClass('visible');
            setTimeout(function () {
                thisMenu.children('ul .dropped-menu').css('display', 'none');
            }, 100);
        }
    // function () {
    //     $(this).children('ul .dropped-menu').removeClass('display-none')
    // },
    // function(){
    //     $(this).children('ul .dropped-menu').addClass('display-none')
    // }
    );
    // -----------------выпадающее меню


    // slider -----------------------
    var slides = $('.slider__img');
    var slidesCount = 1;
    var sliderLength = slides.length;
    var circleElem = $('.circle-elem');

    console.log(slides.eq(1));
    console.log(sliderLength);

    $('.slider__scroll_right').on('click', function () {
        if (slidesCount < sliderLength) {
            slides.eq(slidesCount - 1).toggleClass('item-visible');
            circleElem.eq(slidesCount - 1).toggleClass('circle-elem-active');
            slidesCount++;
            slides.eq(slidesCount - 1).toggleClass('item-visible');
            circleElem.eq(slidesCount - 1).toggleClass('circle-elem-active');
        }else {
            slidesCount = sliderLength;
            slides.eq(slidesCount - 1).toggleClass('item-visible');
            circleElem.eq(slidesCount - 1).toggleClass('circle-elem-active');
            slidesCount = 1;
            slides.eq(slidesCount - 1).toggleClass('item-visible');
            circleElem.eq(slidesCount - 1).toggleClass('circle-elem-active');
        }
    });
    $('.slider__scroll_left').on('click', function () {
        if (slidesCount > 1) {
            slides.eq(slidesCount - 1).toggleClass('item-visible');
            circleElem.eq(slidesCount - 1).toggleClass('circle-elem-active');
            slidesCount--;
            slides.eq(slidesCount - 1).toggleClass('item-visible');
            circleElem.eq(slidesCount - 1).toggleClass('circle-elem-active');
        }else {
            slidesCount = 1;
            slides.eq(slidesCount - 1).toggleClass('item-visible');
            circleElem.eq(slidesCount - 1).toggleClass('circle-elem-active');
            slidesCount = sliderLength;
            slides.eq(slidesCount - 1).toggleClass('item-visible');
            circleElem.eq(slidesCount - 1).toggleClass('circle-elem-active');
        }
    });
    // ------------------------------

    // ----------------- Обработка анимации -------------------
    var animateCount = 1, animateCount2 = 1;
    $(window).scroll(function() {
        $('.mov').each(function(){
            var windowHeight = $(window).height();

            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            // console.log('--------------------');
            // console.log('windowHeight : ' + windowHeight);
            // console.log('imagePos : ' + imagePos);
            // console.log('topOfWindow : ' + topOfWindow);
            // console.log('--------------------');

            if (imagePos < topOfWindow + ( windowHeight - 30) ) {
                $(this).addClass('fadeInDown');
            }
        });
        if ($('.numbers-header').offset().top < $(window).scrollTop() + ($(window).height() - 30) && animateCount === 1){
            $('.numbers-header').spincrement({
                thousandSeparator: "",
                duration: 5000
            });
            animateCount++;
        }
        if ($('.progress__elem-number').offset().top < $(window).scrollTop() + ($(window).height() - 30) && animateCount2 === 1){
            $('.progress__elem-number').each(function () {
                var val = parseInt(this.innerText);
                var thisElem = this;
                var percent_number_step = $.animateNumber.numberStepFactories.append(' %')
                $(this).animateNumber({
                    number: val,
                    numberStep: percent_number_step
                }, 2000);
            });
            animateCount2++;
        }

    });
    //---------------------------------------------------------

    // ---------------- анимация чисел ------------------------


    // --------------------------------------------------------
});

