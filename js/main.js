'use strict';

window.onload = function () {
    const RATING_STROKE_LENGTH = 114,
          RATING_COLOR_GREEN = '#7eae3e',
          RATING_COLOR_YELLOW = '#efb428',
          RATING_COLOR_RED = '#e73e4e';

    showBrandRating();

    showStarRating();

    showReviewDiagram();

    showAllCars();

    showAllComparison();

    showAllSEOText();

    showAllFotterMenuItems ();

    // -------------------------------------------------
    function showBrandRating () {
        let sparePartsElements = document.querySelectorAll('.sparePartsElement');
        sparePartsElements = Array.prototype.slice.call(sparePartsElements);

        sparePartsElements.forEach(function(currentElem) {
            let currentRatingElem = currentElem.querySelector('.sparePartsElement__item-rating');
            let spanRatingElement = currentRatingElem.querySelector('span');
            let currentRating = parseInt( currentRatingElem.getAttribute('data-count') );
            let persentValue = parseInt( RATING_STROKE_LENGTH - RATING_STROKE_LENGTH * currentRating / 100 );
            let svg = currentRatingElem.querySelector('path:last-child');
            for ( let i = 0; i <= currentRating; i++ ) {
               setTimeout(()=>{
                   spanRatingElement.innerText = i;
               }, i * 7);
            }

            svg.style.strokeDashoffset = persentValue;
            switch ( true ) {
                case ( currentRating < 34 ) : {
                    svg.style.stroke = RATING_COLOR_RED;
                    break;
                }
                case ( currentRating >= 34 && currentRating < 67 ) : {
                    svg.style.stroke = RATING_COLOR_YELLOW;
                    break;
                }

                case ( currentRating >= 67 && currentRating <= 100 ) : {
                    svg.style.stroke = RATING_COLOR_GREEN;
                    break;
                }
            }
        });
    } // showBrandRating

    function showStarRating () {
        let averageRatingNumber = document.querySelectorAll('.averageRatingNumber');
        averageRatingNumber = Array.prototype.slice.call(averageRatingNumber);
        averageRatingNumber.forEach(function(currentElem) {
            let currentRating = parseFloat( currentElem.innerText );
            let svg = currentElem.parentNode.querySelector('path');
            switch ( true ) {
                case ( currentRating <= 3 ) : {
                    svg.style.fill = RATING_COLOR_RED;
                    break;
                }
                case ( currentRating > 3 && currentRating < 4 ) : {
                    svg.style.fill = RATING_COLOR_YELLOW;
                    break;
                }

                case ( currentRating > 4 ) : {
                    svg.style.fill = RATING_COLOR_GREEN;
                    break;
                }
            }
        });
    } // showStarRating

    function showReviewDiagram () {
        let reviewDiagramBlock = document.querySelectorAll('.reviewDiagramBlock');
        reviewDiagramBlock = Array.prototype.slice.call(reviewDiagramBlock);
        reviewDiagramBlock.forEach(function(currentElem) {
            let greenZone = currentElem.querySelector('.reviewDiagramBlock__item-green'),
                yellowZone = currentElem.querySelector('.reviewDiagramBlock__item-yellow'),
                redZone = currentElem.querySelector('.reviewDiagramBlock__item-red');
            let greenZoneValue = parseInt(greenZone.innerText),
                yellowZoneValue = parseInt(yellowZone.innerText),
                redZoneValue = parseInt(redZone.innerText);
            let summValue = greenZoneValue + yellowZoneValue + redZoneValue;
            let greenZoneValuePercent = parseInt( 100 * greenZoneValue / summValue),
                yellowZoneValuePercent = parseInt( 100 * yellowZoneValue / summValue ),
                redZoneValuePercent = parseInt( 100 * redZoneValue / summValue );
            greenZone.style.width = greenZoneValuePercent + '%';
            yellowZone.style.width = yellowZoneValuePercent + '%';
            redZone.style.width = redZoneValuePercent + '%';
        });
    } // showReviewDiagram

    function showAllCars () {
        const carsListBlock = document.querySelector('.cars__listsBlock');
        const blockHeight = carsListBlock.clientHeight;
        const carItems = carsListBlock.querySelector('.carItems');
        const showAllBtn = document.querySelector('#carsShowAll');
        const unvisibleItem = carsListBlock.querySelectorAll('.displayNone');
        let openBlockHeight = 0;

        carsListBlock.style.height = blockHeight + 'px';
        carsListBlock.style.overflow = 'hidden';
        carsListBlock.style.transition = 'height .3s';

        showAllBtn.addEventListener('click', ()=>{
            for ( let i = 0; i < unvisibleItem.length; i++) {
                unvisibleItem[i].classList.remove('displayNone');
            }
            openBlockHeight = carItems.clientHeight;
            carsListBlock.style.height = openBlockHeight + 'px';

            // disabled show all btn
            showAllBtn.style.opacity = '0';
            showAllBtn.setAttribute('disabled', 'true');
            showAllBtn.style.cursor = 'default';

            // clear style
            setTimeout(()=> {
                carsListBlock.removeAttribute('style');
            }, 1000)
        });
    } // showAllCars

    function showAllComparison () {
        const comparisonBlock = document.querySelector('.comparisonBlock__content');
        const blockHeight = comparisonBlock.clientHeight;
        const comparisonBlockItems = comparisonBlock.querySelector('.comparisonBlockItems');
        const showAllBtn = document.querySelector('#comparisonBlockShowAll');
        const unvisibleItem = comparisonBlockItems.querySelectorAll('.displayNone');
        let openBlockHeight = 0;

        comparisonBlock.style.height = blockHeight + 'px';
        comparisonBlock.style.overflow = 'hidden';
        comparisonBlock.style.transition = 'height .3s';

        showAllBtn.addEventListener('click', ()=>{
            for ( let i = 0; i < unvisibleItem.length; i++) {
                unvisibleItem[i].classList.remove('displayNone');
            }
            openBlockHeight = comparisonBlockItems.clientHeight;
            comparisonBlock.style.height = openBlockHeight + 'px';

            // disabled show all btn

            showAllBtn.setAttribute('disabled', 'true');
            showAllBtn.classList.add('mainBtn-showAllDisabled');

            // clear style
            setTimeout(()=> {
                comparisonBlock.removeAttribute('style');
            }, 1000)
        });
    } // showAllComparison
    
    function showAllSEOText () {
        const seoContent = document.querySelector('.seo__content');
        const blockHeight = seoContent.clientHeight;
        const seoTexts = seoContent.querySelector('.seoTexts');
        const showAllBtn = document.querySelector('#seoBlockShowMore');
        const unvisibleItem = seoContent.querySelectorAll('.displayNone');
        let openBlockHeight = 0;

        seoContent.style.height = blockHeight + 'px';
        seoContent.style.overflow = 'hidden';
        seoContent.style.transition = 'height .3s';

        showAllBtn.addEventListener('click', ()=>{
            for ( let i = 0; i < unvisibleItem.length; i++) {
                unvisibleItem[i].classList.remove('displayNone');
            }
            openBlockHeight = seoTexts.clientHeight;
            seoContent.style.height = openBlockHeight + 'px';

            // disabled show all btn
            showAllBtn.style.opacity = '0';
            showAllBtn.setAttribute('disabled', 'true');
            showAllBtn.style.cursor = 'default';

            // clear style
            setTimeout(()=> {
                seoContent.removeAttribute('style');
            }, 1000)
        });
    } // showAllSEOText

    function showAllFotterMenuItems () {
        const toggleMenuBtn = document.querySelectorAll('.shevronIcon-footerMenu');
        for ( let currentBtn of toggleMenuBtn ) {
            currentBtn.addEventListener('click', function() {
                if ( this.classList.contains('shevronIcon-footerMenuRotate')) {
                    this.classList.remove('shevronIcon-footerMenuRotate');
                } else {
                    this.classList.add('shevronIcon-footerMenuRotate');

                }
            });
        } // for of
    }



    function scrollTo (idElement) {
        const scrollElement = document.querySelector(idElement);
        let top = 0;

        let scr = setInterval(function () {
            top += 5;
            window.scrollTo(0, top);

            if (top > 1000) {
                clearInterval(scr);
            }
        }, 15);
    }

    // spare parts slider --------------------------------------

    const SCREEN_MAX_WIDTH = document.querySelector('.wrapper').clientWidth;
    const GUTTER_X2 = 30;
    const COL_WIDTH = SCREEN_MAX_WIDTH / 12 - GUTTER_X2;
    const COL_3_WIDTH = ( COL_WIDTH * 3 ) + ( GUTTER_X2 * 2 );
    const COL_4_WIDTH = ( COL_WIDTH * 4 ) + ( GUTTER_X2 * 3 );

    const sparePartsSlider = document.querySelector('#sparePartsSlider');
    const sparePartsSliderNextBtn = document.querySelector('.sliderNavBlock__btn-next');
    const sparePartsSliderPrevBtn = document.querySelector('.sliderNavBlock__btn-prev');
    let sparePartsSlides = document.querySelectorAll('.sparePartsSlider__sliderItem');
    sparePartsSlides = Array.prototype.slice.call(sparePartsSlides);
    const quantitySlides = sparePartsSlides.length;
    let slidePosition = 0;
    let slideIsShow = 4;
    const slidesOffset = COL_3_WIDTH + GUTTER_X2;

    // initial slider
    sparePartsSlider.style.width = quantitySlides * COL_3_WIDTH + quantitySlides * GUTTER_X2;
    sparePartsSlides.forEach(function(currentSlide){
        currentSlide.style.width = COL_3_WIDTH + 'px';
        currentSlide.style.marginRight = GUTTER_X2 + 'px';
    });


    // const sliderWidth =

    sparePartsSliderNextBtn.addEventListener('click', nextSlide);
    sparePartsSliderPrevBtn.addEventListener('click', prevSlide);

    function nextSlide() {
        console.log('next slide');
        slidePosition ++;
        slideIsShow ++;
        console.log('slidePosition-' + slidePosition);
        console.log('slideIsShow-' + slideIsShow);
        if ( !(slideIsShow > quantitySlides) ) {
            sparePartsSlider.style.transform = `translateX(-${slidesOffset * slidePosition}px)`;
        } else {
            slidePosition --;
            slideIsShow --;
            sparePartsSlider.style.transform = `translateX(-${slidesOffset * slidePosition + 50}px)`;
            setTimeout(function(){
                sparePartsSlider.style.transform = `translateX(-${slidesOffset * slidePosition}px)`;
            }, 500);
        }
    }
    function prevSlide() {
        console.log('prev slide');
        slidePosition --;
        slideIsShow --;
        console.log('slidePosition-' + slidePosition);
        console.log('slideIsShow-' + slideIsShow);
        if ( !(slidePosition < 0) ) {
            sparePartsSlider.style.transform = `translateX(-${slidesOffset * slidePosition}px)`;
        } else {
            slidePosition = 0;
            slideIsShow ++;
            sparePartsSlider.style.transform = `translateX(50px)`;
            setTimeout(function(){
                sparePartsSlider.style.transform = `translateX(0)`;
            }, 500);
        }
    }

    // ===========================================================
};
