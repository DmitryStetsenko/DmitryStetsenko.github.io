$(document).ready(function () {
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
});

