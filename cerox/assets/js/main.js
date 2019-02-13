'use strict';

$(document).ready(function(){
    initSlider();

    openPopUpOrder();


    function initSlider() {
        const mainSlider = $('.mySlider');
        const slideMargin = 0;
        let instaPgeSliderParam = {
            sliderItem: mainSlider.find('.mySlider__slide'),
            sliderWrap: $('.sliderBox'),
            sliderMargin: 2 * slideMargin,
        };
        let instaPgeSliderSlideToShow = determSliderSize(instaPgeSliderParam);
        console.log(instaPgeSliderSlideToShow);
        mainSlider.slick({
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            arrows: false,
            infinite: true,
            dots: true,
            slidesToShow: instaPgeSliderSlideToShow,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: 0,
        });
    } // initSlider

    function openPopUpOrder() {
        const orderBtn = document.querySelector('.orderBtn');
        const closeBtn = document.querySelector('.closeBtn-popUp');
        const modalWindow = document.querySelector('.modalWindow-order');
        const overlay = modalWindow.querySelector('.modalWindow__overlay');
        const popUpForm = modalWindow.querySelector('.popUpForm');

        orderBtn.addEventListener('click', function() {
            modalWindow.style.display = 'flex';
            setTimeout(function () {
                overlay.style.opacity = '.7';
            },10);
            setTimeout(function () {
                popUpForm.style.opacity = '1';
            },200);
        });
        closeBtn.addEventListener('click', function() {
            overlay.style.opacity = '0';
            popUpForm.style.opacity = '0';
            setTimeout(function () {
                modalWindow.style.display = 'none';
            },350);
        });

    } // openPopUpOrder

    // secondary function
    function closePopUp (modalWindow) {

    } // closePopUp

    function determSliderSize (param) {
        const wrapper = $('body');
        let sliderItemWidth = param.sliderItem.eq(0).width();
        console.log('sliderItemWidth - ' + sliderItemWidth);
        let quantityOfSliderItem = param.sliderItem.length;
        console.log('quantityOfSliderItem - ' + quantityOfSliderItem);
        let sliderWrapMaxWidth = wrapper.width();
        console.log('sliderWrapMaxWidth' + sliderWrapMaxWidth);
        let sliderWrapWidth;
        let slideToShow = parseInt(sliderWrapMaxWidth / ( sliderItemWidth + param.sliderMargin ));
        if ( slideToShow > quantityOfSliderItem) {
            slideToShow = quantityOfSliderItem;
        }
        sliderWrapWidth = ( sliderItemWidth + param.sliderMargin ) * slideToShow;
        param.sliderWrap.css('width', sliderWrapWidth);
        return slideToShow;
    }

});