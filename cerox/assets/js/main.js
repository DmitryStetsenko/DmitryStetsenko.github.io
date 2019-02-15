'use strict';

$(document).ready(function () {

    const order = {
        name: '',
        phone: '',
        material: '',
        color: '',
        attachment: ''
    };
    const callBack = {
        name: '',
        phone: ''
    };

    if (window.matchMedia('(min-width: 700px)').matches) {
        loadVideo();
    }

    initSlider();

    openPopUpOrder();

    openPopUpCallBack();

    initSelect();

    fillOrder();

    clickOnSubmitBtn();

    closePopUp();


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
                        const dataTarget = currentSelect.dataset.target;
                        console.log(dataTarget);
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

                        if (dataTarget === 'material') {
                            order.material = headerValueText;
                        } else {
                            order.color = headerValueText;
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

    function clickOnSubmitBtn () {
        const submitBtn = document.querySelectorAll('.formBtn-submit');
        let typeBtn;
        Array.from(submitBtn).forEach(function(currentBtn){
            currentBtn.addEventListener('click', function(){
                typeBtn = this.dataset.type;
                submitForm(typeBtn);
            });
        });
    } // clickOnSubmitBtn


    // secondary function
    function fillOrder(){
        const userName = document.querySelector('#orderUserName');
        const userPhone = document.querySelector('#orderUserPhone');
        const attachment = document.querySelector('#uploadFileInput');
        const callBackUserName = document.querySelector('#callBackUserName');
        const callBackUserPhone = document.querySelector('#callBackUserPhone');
        userName.onchange = function(){
            order.name = this.value;
        };
        userPhone.onchange = function(){
            order.phone = this.value;
        };
        attachment.onchange = function(){
            order.attachment = this.file[0].name;
        };
        callBackUserName.onchange = function(){
            callBack.name = this.value;
        };
        callBackUserPhone.onchange = function(){
            callBack.phone = this.value;
        };

    } // fillOrder

    function submitForm(formName){
        let htmlElemForm;
        let formResultWindow;
        if (validForm(formName)) {
            if (formName === 'order') {
                htmlElemForm = document.querySelector('.popUpForm-order');
            } else {
                htmlElemForm = document.querySelector('.popUpForm-callBack');
            }

            // show submitFormResult window
            formResultWindow = htmlElemForm.parentNode.querySelector('.popUpForm-submitResult');
            console.log(formResultWindow);
            htmlElemForm.style.transform = 'translateY(100px)';
            htmlElemForm.style.opacity = '0';
            formResultWindow.style.display = 'flex';
            setTimeout(function(){
                formResultWindow.style.transform = 'translateY(100px)';
                formResultWindow.style.opacity = '1';
            }, 100);
        } else {
            console.log('form not submit')
        }
    } // submitForm

    function validForm(formName) {
        let valid = true;
        const duration = 500;
        if (formName === 'order') {
           for (let field in order) {
               if (!order[field]) {
                   if (field === 'name') {
                       valid = false;
                       let htmlElemName = document.querySelector('#orderUserName').parentNode;
                       htmlElemName.style.transition = `border-color ${duration}ms`;
                       htmlElemName.style.borderColor = 'red';
                       setTimeout(function(){
                           htmlElemName.style.removeProperty('border-color');
                       }, duration);
                       setTimeout(function(){
                           htmlElemName.style.removeProperty('transition');
                       }, duration * 2);
                   }
                   if (field === 'phone') {
                       valid = false;
                       let htmlElemPhone = document.querySelector('#orderUserPhone').parentNode;
                       htmlElemPhone.style.transition = `border-color ${duration}ms`;
                       htmlElemPhone.style.borderColor = 'red';
                       setTimeout(function(){
                           htmlElemPhone.style.removeProperty('border-color');
                       }, duration);
                       setTimeout(function(){
                           htmlElemPhone.style.removeProperty('transition');
                       }, duration * 2);
                   }
                   if (field === 'material') {
                       valid = false;
                       let htmlElemMaterial = document.querySelector('#selectMaterial');
                       htmlElemMaterial.style.transition = `border-color ${duration}ms`;
                       htmlElemMaterial.style.borderColor = 'red';
                       setTimeout(function(){
                           htmlElemMaterial.style.removeProperty('border-color');
                       }, duration);
                       setTimeout(function(){
                           htmlElemMaterial.style.removeProperty('transition');
                       }, duration * 2);
                   }
                   if (field === 'color') {
                       valid = false;
                       let htmlElemColor = document.querySelector('#selectColor');
                       htmlElemColor.style.transition = `border-color ${duration}ms`;
                       htmlElemColor.style.borderColor = 'red';
                       setTimeout(function(){
                           htmlElemColor.style.removeProperty('border-color');
                       }, duration);
                       setTimeout(function(){
                           htmlElemColor.style.removeProperty('transition');
                       }, duration * 2);
                   }
               }
           }
        } else {
            for (let field in callBack) {
                if (!callBack[field]) {
                    if (field === 'name') {
                        valid = false;
                        let htmlElemName = document.querySelector('#callBackUserName').parentNode;
                        htmlElemName.style.transition = `border-color ${duration}ms`;
                        htmlElemName.style.borderColor = 'red';
                        setTimeout(function(){
                            htmlElemName.style.removeProperty('border-color');
                        }, duration);
                        setTimeout(function(){
                            htmlElemName.style.removeProperty('transition');
                        }, duration * 2);
                    }
                    if (field === 'phone') {
                        valid = false;
                        let htmlElemPhone = document.querySelector('#callBackUserPhone').parentNode;
                        htmlElemPhone.style.transition = `border-color ${duration}ms`;
                        htmlElemPhone.style.borderColor = 'red';
                        setTimeout(function(){
                            htmlElemPhone.style.removeProperty('border-color');
                        }, duration);
                        setTimeout(function(){
                            htmlElemPhone.style.removeProperty('transition');
                        }, duration * 2);
                    }
                }
            }
        }
        return valid;
    }

    function closePopUp() {
        const closeBtn = document.querySelectorAll('.closeBtn-popUp');
        Array.from(closeBtn).forEach(function(currentBtn){
            currentBtn.addEventListener('click', function () {
                const modalWindow = this.parentNode.parentNode.parentNode;
                const overlay = modalWindow.querySelector('.modalWindow__overlay');
                const popUpForm = this.parentNode.parentNode;

                overlay.style.opacity = '0';
                popUpForm.style.opacity = '0';
                setTimeout(function () {
                    modalWindow.style.display = 'none';
                    Array.from(modalWindow.querySelectorAll('.popUpForm')).forEach(function(elem){
                        elem.removeAttribute('style');
                        console.log(elem);
                    });
                }, 350);
            });

        });
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