'use strict';
$(function () {
    // plug parallax ------------------------------
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene);
        // paralax elem
    const parallax = '.parallax';
    // ============================================

    // main page var ------------------------------
    const headerContactBtn = '#headerContactBtn',
          pageMain = '.page',
          mainActionBlock = '.mainActionBlock',
          viewPresentation = '.viewPresentation';
    // ============================================

    // marketing page var -------------------------
    const categoryItem = '.category__item',
          actionForCategory = '.actionForCategory',
          choosingFinPlan = '.choosingFinPlan',
          closeBtActionForCategory = '.closeBtn-actionForCategory';
    // ============================================

    // contacts forms -----------------------------
    const mainContactForm = '.mainContactForm',
          btnCloseMinContactForm = '.btnClose-mainContactForm',
          mainBtnFormSubmit = '.btn-formSubmit';
        // report window -------------------
    const mainSubmitReport = '.submitReport',
          closeBtnSubmitReportWindow = '.closeBtn-submitReportWindow';
    // ============================================

    // sliders var --------------------------------
        // main page out clients slider
    const ourClientsBlock = '.ourClientsBlock',
          ourClientsSlider = '.ourClientsSlider',
          ourClientSliderWrap = '.sliderWrap-ourClients';
        // instagram page image slider
    const imgBlockSlider = '.imgBlockSlider',
          imgBlockSliderItem = '.imgBlockSlider__item',
          instaPageSliderWrap = '.sliderWrap-instaPageImgBlock';
        // instagram page full screen slider
    const viewFullScreenSliderBlock = '.viewFullScreenSliderBlock',
          fullScreenSlider = '.fullScreenSlider',
          closeBtnFullScreenSlider = '.closeBtn-fullScreenSlider';
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
        // full screen slider on istagram page
    $(fullScreenSlider).slick({
        infinite: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: 0,
        prevArrow: '.mySliderBigArrow-prev',
        nextArrow: '.mySliderBigArrow-next'
    });
        // click on slider item and open full screen slider
    $(imgBlockSliderItem).click(function(){
        myShow(viewFullScreenSliderBlock, 'flex', '.3s');
    });
        // close full screen slider on istagram page
    $(closeBtnFullScreenSlider).click(function(){
        myHide(viewFullScreenSliderBlock, '.3s');
    });
        // ====================================================
    ///////////////////////////////////////////////////////////

    // hover on button view presentation ----------------------
    $(viewPresentation).hover(
        function(){
           $(parallax).addClass('parallax-overlay');
        },
        function(){
            $(parallax).removeClass('parallax-overlay');
        }
    );
    // ========================================================

    // show contact info after click contact on header --------
    $(headerContactBtn).click(function(){
        $(this).addClass('activeColor');
        $(pageMain).addClass('goOutsideLeft');
        if ($(ourClientsBlock).length) {
            $(ourClientsBlock).addClass('goOutsideLeft');
        }
        $(mainContactForm).removeClass('goOutsideRight');
    });
        // close contact form
    $(btnCloseMinContactForm).click(function(){
        $(headerContactBtn).removeClass('activeColor');
        $(pageMain).removeClass('goOutsideLeft');
        if ($(ourClientsBlock).length) {
            $(ourClientsBlock).removeClass('goOutsideLeft');
        }
        $(mainContactForm).addClass('goOutsideRight');
    });
        // click on submit button
    $(mainBtnFormSubmit).click(function(e){
        e.preventDefault();
        myShow(mainSubmitReport, 'flex', '.3s');
    });
        // close modal report window
    $(closeBtnSubmitReportWindow).click(function () {
        myHide(mainSubmitReport, '.3s');
    });
    // ========================================================

    // marketing page events ----------------------------------
        // show fin plan categories -----------------
    $(categoryItem).click(function(){
        myShow(choosingFinPlan, 'flex', '.3s', function() {
            setTimeout(function () {
                $(actionForCategory).addClass('actionForCategory-goOutsideTop');
            }, 300);
        });
    });
        // close fin plan categories ----------------
    $(closeBtActionForCategory).click(function(){
        myHide(choosingFinPlan, '.3s', function(){
            $(actionForCategory).removeClass('actionForCategory-goOutsideTop');
        });
    });
    // ========================================================

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
    // show window --------------------------------------------
    function myShow(selector, displayMode, duration, callBack){
        let element = $(selector);
        element.css({
            'opacity': '0',
            'display': displayMode,
            'transition': duration
            });
        setTimeout(function(){
            element.css('opacity', '1');
        },100);

        if (callBack) {
            callBack();
        }
    }
    // ========================================================
    // hide window --------------------------------------------
    function myHide(selector, duration, callBack){
        let element = $(selector);
        element.css({
            'opacity': '1',
            'transition': duration
        });
        setTimeout(function(){
            element.css('opacity', '0');
        },100);
        setTimeout(function(){
            element.removeAttr('style');
        },500);

        if (callBack) {
            callBack();
        }
    }
    // ========================================================
    ///////////////////////////////////////////////////////////
});
