'use strict';
$(function () {
    // plug parallax ------------------------------
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene);
    // ============================================

    // sliders var --------------------------------
        // main page out clients slider
    const ourClientsSlider = '.ourClientsSlider';
    const ourClientSliderWrap = '.sliderWrap-ourClients';
        // instagram page image slider
    const imgBlockSlider = '.imgBlockSlider';
    const instaPageSliderWrap = '.sliderWrap-instaPageImgBlock';
    // ============================================

    /////// plug slider ///////////////////////////
        // main page slider our clients ----------
    let ourClientsSliderParam = {
        sliderItem: $(ourClientsSlider).find('.ourClientsSlider__item'),
        sliderWrap: $(ourClientSliderWrap),
        sliderMargin: 20,
    };
    let ourClientsSliderSlideToShow = determSliderSize(ourClientsSliderParam);
    $(ourClientsSlider).slick({
        infinite: true,
        dots: false,
        slidesToShow: ourClientsSliderSlideToShow,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: 0,
        prevArrow: '.mySliderArrow-prev',
        nextArrow: '.mySliderArrow-next'
    });
        // page instagram slider ------------------------------
    let instaPgeSliderParam = {
        sliderItem: $(imgBlockSlider).find('.imgBlockSlider__item'),
        sliderWrap: $(instaPageSliderWrap),
        sliderMargin: 20,
    };
    let instaPgeSliderSlideToShow = determSliderSize(instaPgeSliderParam);
    $(imgBlockSlider).slick({
        infinite: true,
        dots: false,
        slidesToShow: instaPgeSliderSlideToShow,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: 0,
        prevArrow: '.mySliderArrow-prev',
        nextArrow: '.mySliderArrow-next'
    });
        // ====================================================
    ///////////////////////////////////////////////////////////

    //////////// FUNCTIONS ////////////////////////////////////
    // determining the size of the slider ---------------------
    function determSliderSize (param) {
        let sliderItemWidth = param.sliderItem.eq(0).width();
        let quantityOfSliderItem = param.sliderItem.length;
        let sliderWrapMaxWidth = param.sliderWrap.width();
        let sliderWrapWidth;
        let slideToShow = parseInt(sliderWrapMaxWidth / ( sliderItemWidth + param.sliderMargin ));
        if ( slideToShow > quantityOfSliderItem) {
            slideToShow = quantityOfSliderItem;
        }
        sliderWrapWidth = ( sliderItemWidth + 20 ) * slideToShow;
        param.sliderWrap.css('width', sliderWrapWidth);
        return slideToShow;
    }
    // ========================================================
    ///////////////////////////////////////////////////////////
});
