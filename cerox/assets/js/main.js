'use strict';

$(document).ready(function () {

    if (window.matchMedia('(min-width: 700px)').matches) {
        loadVideo();
    }

    initSlider();

    openPopUpOrder();

    openPopUpCallBack();

    initSelect();


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
        const modalWindow = document.querySelector('.modalWindow-order');
        const closeBtn = modalWindow.querySelector('.closeBtn-popUp');
        const overlay = modalWindow.querySelector('.modalWindow__overlay');
        const popUpForm = modalWindow.querySelector('.popUpForm');

        orderBtn.addEventListener('click', function () {
            modalWindow.style.display = 'flex';
            setTimeout(function () {
                overlay.style.opacity = '.7';
            }, 10);
            setTimeout(function () {
                popUpForm.style.opacity = '1';
            }, 200);
        });
        closeBtn.addEventListener('click', function () {
            overlay.style.opacity = '0';
            popUpForm.style.opacity = '0';
            setTimeout(function () {
                modalWindow.style.display = 'none';
            }, 350);
        });

    } // openPopUpOrder

    function openPopUpCallBack() {
        const callBackBtn = document.querySelector('.callBtn-call');
        const modalWindow = document.querySelector('.modalWindow-callBack');
        const closeBtn = modalWindow.querySelector('.closeBtn-popUp');
        const overlay = modalWindow.querySelector('.modalWindow__overlay');
        const popUpForm = modalWindow.querySelector('.popUpForm');

        callBackBtn.addEventListener('click', function () {
            modalWindow.style.display = 'flex';
            setTimeout(function () {
                overlay.style.opacity = '.7';
            }, 10);
            setTimeout(function () {
                popUpForm.style.opacity = '1';
            }, 200);
        });
        closeBtn.addEventListener('click', function () {
            overlay.style.opacity = '0';
            popUpForm.style.opacity = '0';
            setTimeout(function () {
                modalWindow.style.display = 'none';
            }, 350);
        });

    } // openPopUpOrder

    function initSelect() {
        const selects = document.querySelectorAll('.select');
        let count = 0;
        Array.from(selects).forEach(function (select) {
            select.style.zIndex = selects.length - count;
            select.addEventListener('click', function () {
                const currentSelect = this;
                const currSelect = $(this);
                const header = currentSelect.querySelector('.selectHeader');
                const headerValue = header.querySelector('.selectHeader__value');
                const optionsWrap = currSelect.find('.select__options');
                const optionsBox = currentSelect.querySelector('.selectOptions');
                const option = optionsBox.querySelectorAll('.selectOptions__item');
                const optionSelectedClass = 'selectOptions__item-selected';

                optionsWrap.slideDown(50);
                currentSelect.classList.add('select-open');

                Array.from(option).forEach(function (currentOption) {
                    const currentOptionValue = currentOption.querySelector('.optionValue');
                    currentOptionValue.addEventListener('click', function (e) {
                        e.stopPropagation();
                        const parentOptionValue = this.parentNode;
                        const index = parentOptionValue.dataset.index;
                        const optionValue = parentOptionValue.querySelector('.optionValue');
                        const inputValue = currentOption.querySelector('input');
                        let inputValueText;
                        let headerValueText;


                        // clear selected option
                        Array.from(option).forEach(function (elem) {
                            elem.classList.remove(optionSelectedClass);
                        });

                        header.classList.add('selectHeader-selected');
                        parentOptionValue.classList.add(optionSelectedClass);
                        if (inputValue && inputValue.value) {
                            inputValueText = inputValue.value;
                            headerValueText = optionValue.innerText + ' - ' + inputValueText;
                        } else {
                            headerValueText = optionValue.innerText;
                        }

                        headerValue.innerHTML = headerValueText;
                        currentSelect.dataset.option = index;

                        // close select
                        currentSelect.classList.remove('select-open');
                        optionsWrap.slideUp(50);
                    });
                });
            });
            count ++;
        });
    } // initSelect

    function loadVideo() {
        const videoBg = document.querySelector('.videoBg video');
        console.log(videoBg);
        videoBg.addEventListener('canplaythrough', function () {
            videoBg.play();
        });
    } // loadVideo


    // secondary function
    function closePopUp(modalWindow) {

    } // closePopUp

    function determSliderSize(param) {
        const wrapper = $('body');
        let sliderItemWidth = param.sliderItem.eq(0).width();
        console.log('sliderItemWidth - ' + sliderItemWidth);
        let quantityOfSliderItem = param.sliderItem.length;
        console.log('quantityOfSliderItem - ' + quantityOfSliderItem);
        let sliderWrapMaxWidth = wrapper.width();
        console.log('sliderWrapMaxWidth' + sliderWrapMaxWidth);
        let sliderWrapWidth;
        let slideToShow = parseInt(sliderWrapMaxWidth / ( sliderItemWidth + param.sliderMargin ));
        if (slideToShow > quantityOfSliderItem) {
            slideToShow = quantityOfSliderItem;
        }
        sliderWrapWidth = ( sliderItemWidth + param.sliderMargin ) * slideToShow;
        param.sliderWrap.css('width', sliderWrapWidth);
        return slideToShow;
    }

});