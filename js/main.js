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
            $(this).children('ul .dropped-menu').slideToggle();
        },
        function(){
            $(this).children('ul .dropped-menu').slideToggle();
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
});

