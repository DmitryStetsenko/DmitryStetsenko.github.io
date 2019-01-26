'use strict';

window.onload = function () {
    const RATING_STROKE_LENGTH = 114,
        RATING_COLOR_GREEN = '#7eae3e',
        RATING_COLOR_YELLOW = '#efb428',
        RATING_COLOR_RED = '#e73e4e';

    const SCREEN_MAX_WIDTH = document.querySelector('.wrapper').clientWidth;
    const GUTTER_X2 = 30;
    const COL_WIDTH = SCREEN_MAX_WIDTH / 12 - GUTTER_X2;
    const COL_3_WIDTH = ( COL_WIDTH * 3 ) + ( GUTTER_X2 * 2 );
    const COL_4_WIDTH = ( COL_WIDTH * 4 ) + ( GUTTER_X2 * 3 );

    showBrandRating ();

    showStarRating ();

    showReviewDiagram ();

    showAllCars ();

    showAllMagazineArticles ();

    showAllComparison ();

    showAllSEOText ();

    // showAllFooterMenuItems ();

    // footerMenuScrollTo ();

    // mobile -----------------------------------------

    sparePartsToggle ();

    brandsToggle ();


    // sliderSpareParts ();

    // sliderBrands ();


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
            showAllBtn.style.display = 'none';

            // clear style
            setTimeout(()=> {
                carsListBlock.removeAttribute('style');
            }, 1000)
        });
    } // showAllCars

    function showAllMagazineArticles () {
        const magazinArticlesBlock = document.querySelector('.magazine__articles');
        const blockHeight = magazinArticlesBlock.clientHeight;
        const magazinArticlesBlockItems = magazinArticlesBlock.querySelector('.articleTabs');
        const showAllBtn = document.querySelector('#magazineShowAll');
        const unvisibleItem = magazinArticlesBlockItems.querySelectorAll('.displayNone');
        let openBlockHeight = 0;

        magazinArticlesBlock.style.height = blockHeight + 'px';
        magazinArticlesBlock.style.overflow = 'hidden';
        magazinArticlesBlock.style.transition = 'height .3s';

        showAllBtn.addEventListener('click', ()=>{
            for ( let i = 0; i < unvisibleItem.length; i++) {
                unvisibleItem[i].classList.remove('displayNone');
            }
            openBlockHeight = magazinArticlesBlockItems.clientHeight;
            magazinArticlesBlock.style.height = openBlockHeight + 'px';

            // disabled show all btn

            // disabled show all btn
            showAllBtn.style.display = 'none';

            // clear style
            setTimeout(()=> {
                magazinArticlesBlock.removeAttribute('style');
            }, 1000)
        });
    } // showAllMagazineArticles

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
            showAllBtn.style.display = 'none';

            // clear style
            setTimeout(()=> {
                seoContent.removeAttribute('style');
            }, 1000)
        });
    } // showAllSEOText

    function showAllFooterMenuItems () {
        const toggleMenuBtn = document.querySelectorAll('.shevronIcon-footerMenu');
        let currentHiddenBlock,
            currentFooterMenu,
            currentHiddenElements;
        let hiddenElementsHeight;

        for ( let currentBtn of toggleMenuBtn ) {
            currentBtn.addEventListener('click', function() {
                currentFooterMenu = this.parentNode.parentNode;
                currentHiddenBlock = currentFooterMenu.querySelector('.footerMenu__hiddenBlock');
                currentHiddenElements = currentHiddenBlock.querySelector('.footerMenu__hiddenElements');

                console.log(currentHiddenBlock);
                if ( this.classList.contains('shevronIcon-footerMenuRotate')) {
                    // rotate shevron icon
                    this.classList.remove('shevronIcon-footerMenuRotate');
                    // hiding items
                    currentHiddenBlock.removeAttribute('style');
                    setTimeout(()=>{
                        currentHiddenElements.classList.add('displayNone');
                    }, 400);
                } else {
                    // rotate shevron icon
                    this.classList.add('shevronIcon-footerMenuRotate');
                    // show items
                    currentHiddenElements.classList.remove('displayNone');
                    hiddenElementsHeight = currentHiddenElements.clientHeight;
                    currentHiddenBlock.style.height = hiddenElementsHeight + 'px';
                }
            });
        } // for of
    } // showAllFooterMenuItems

    function footerMenuScrollTo () {
        const footerMenuTitle = document.querySelectorAll('.footerMenu__item-title .h4Title a');
        let currentLinkHref;
        for ( let currentTitle of footerMenuTitle) {
            currentTitle.addEventListener('click', function(e){
                e.preventDefault();
                currentLinkHref = this.getAttribute('href');
                scrollTo(currentLinkHref, 25);
            });
        }
    } // footerMenuScrollTo

    function scrollTo (idElement, speed) {
        const scrollElement = document.querySelector(idElement);
        let posElem = scrollElement.getBoundingClientRect().top + pageYOffset;
        let currentPos = pageYOffset;

        let scr = setInterval(function () {
            currentPos -= speed;
            window.scrollTo(0, currentPos);

            if (currentPos < posElem) {
                clearInterval(scr);
            }
        }, 1);
    }

    // mobile --------------------------------------------------

    function sparePartsToggle () {
        let sparePartsTitle = document.querySelectorAll('.sparePartsContentTitle');

        for ( let currentTitle of sparePartsTitle ) {
            currentTitle.addEventListener('click', function(e) {
                e.preventDefault();

                const sparePartsContent = this.parentNode;
                const sparePartsItem = this.parentNode.parentNode;

                if (sparePartsItem.classList.contains('sparePartsSlider__sliderItem-closed')) {
                    sparePartsItem.classList.remove('sparePartsSlider__sliderItem-closed');
                    sparePartsContent.classList.remove('sparePartsContent-closed');
                    currentTitle.classList.remove('sparePartsContentTitle-closed');
                } else {
                    sparePartsItem.classList.add('sparePartsSlider__sliderItem-closed');
                    sparePartsContent.classList.add('sparePartsContent-closed');
                    currentTitle.classList.add('sparePartsContentTitle-closed');
                }
            });
        }
    } // sparePartsToggle

    function brandsToggle () {
        const TITLE_HEIGHT = 50;
        const BLOCK_HEIGHT = 322;
        let brandsListTitle = document.querySelectorAll('.brandsList__title');

        for ( let currentTitle of brandsListTitle ) {
            currentTitle.addEventListener('click', function(e) {
                e.preventDefault();

                const brandsListItem = this.parentNode;

                if (brandsListItem.classList.contains('brandsList-closed')) {
                    brandsListItem.classList.remove('brandsList-closed');
                    currentTitle.classList.remove('brandsList__title-closed');
                } else {
                    brandsListItem.classList.add('brandsList-closed');
                    currentTitle.classList.add('brandsList__title-closed');
                }
            });
        }
    } // brandsToggle

// sliders -------------------------------------------------------
    function sliderSpareParts () {
        const sparePartsSliderBlock = document.querySelector('.spareParts__sliderBlock');
        const sparePartsSlider = sparePartsSliderBlock.querySelector('.mySlider');
        const sliderNavBlock = sparePartsSliderBlock.querySelector('.sliderNavBlock');
        const sparePartsSliderNextBtn = sparePartsSliderBlock.querySelector('.sliderNavBlock__btn-next');
        const sparePartsSliderPrevBtn = sparePartsSliderBlock.querySelector('.sliderNavBlock__btn-prev');
        let sparePartsSlides = sparePartsSlider.querySelectorAll('.sparePartsSlider__sliderItem');

        sparePartsSlides = Array.prototype.slice.call(sparePartsSlides);
        const quantitySlides = sparePartsSlides.length;
        let slidePosition = 0;
        let slideIsShow = 4;
        const slidesOffset = COL_3_WIDTH + GUTTER_X2;

        // initial slider

        // check for navigation buttons show
        if ( slideIsShow === quantitySlides ) {
            sliderNavBlock.classList.add('displayNone');
        }
        sparePartsSlider.style.width = quantitySlides * COL_3_WIDTH + quantitySlides * GUTTER_X2;
        sparePartsSlides.forEach(function(currentSlide){
            currentSlide.style.width = COL_3_WIDTH + 'px';
            currentSlide.style.marginRight = GUTTER_X2 + 'px';
        });

        sparePartsSliderNextBtn.addEventListener('click', function(){
            let sliderBlockNode = this.parentNode.parentNode;
            nextSlide(sliderBlockNode);
        });
        sparePartsSliderPrevBtn.addEventListener('click', function(){
            let sliderBlockNode = this.parentNode.parentNode;
            prevSlide(sliderBlockNode);
        });

        function nextSlide(sliderBlockNode) {
            const sparePartsSlider = sliderBlockNode.querySelector('.mySlider');
            console.log(sliderBlockNode);
            console.log('next slide');
            slidePosition ++;
            slideIsShow ++;
            console.log('slidePosition-' + slidePosition);
            console.log('slideIsShow-' + slideIsShow);
            if ( !(slideIsShow > quantitySlides) ) {
                sparePartsSlider.style.transform = `translateX(-${slidesOffset * slidePosition}px)`;
            } else {
                // slidePosition --;
                // slideIsShow --;
                sparePartsSlider.style.transform = `translateX(-${slidesOffset * slidePosition + 50}px)`;
                setTimeout(function(){
                    sparePartsSlider.style.transform = `translateX(-${slidesOffset * slidePosition}px)`;
                }, 500);
                console.log('end of slides');
                // console.log(sparePartsSlider.firstElementChild);
                // sparePartsSlider.appendChild(sparePartsSlider.firstElementChild);
            }
        }
        function prevSlide(sliderBlockNode) {
            const sparePartsSlider = sliderBlockNode.querySelector('.mySlider');
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
    } // sliderSpareParts

    function sliderBrands () {
        const brandsSliderBlock = document.querySelector('.brands__ratingBlock');
        const brandsSlider = brandsSliderBlock.querySelector('.mySlider');
        const sliderNavBlock = brandsSliderBlock.querySelector('.sliderNavBlock');
        const brandsSliderNextBtn = brandsSliderBlock.querySelector('.sliderNavBlock__btn-next');
        const brandsSliderPrevBtn = brandsSliderBlock.querySelector('.sliderNavBlock__btn-prev');
        let brandsSlides = brandsSlider.querySelectorAll('.brandsList');

        brandsSlides = Array.prototype.slice.call(brandsSlides);
        const quantitySlides = brandsSlides.length;
        let slidePosition = 0;
        let slideIsShow = 3;
        const slidesOffset = COL_4_WIDTH + GUTTER_X2;

        // initial slider

        // check for navigation buttons show
        if ( slideIsShow === quantitySlides ) {
            sliderNavBlock.classList.add('displayNone');
        }
        brandsSlider.style.width = quantitySlides * COL_4_WIDTH + quantitySlides * GUTTER_X2;
        brandsSlides.forEach(function(currentSlide){
            currentSlide.style.width = COL_4_WIDTH + 'px';
            currentSlide.style.minWidth = COL_4_WIDTH + 'px';
            currentSlide.style.marginRight = GUTTER_X2 + 'px';
        });

        brandsSliderNextBtn.addEventListener('click', function(){
            let sliderBlockNode = this.parentNode.parentNode;
            nextSlide(sliderBlockNode);
        });
        brandsSliderPrevBtn.addEventListener('click', function(){
            let sliderBlockNode = this.parentNode.parentNode;
            prevSlide(sliderBlockNode);
        });

        function nextSlide(sliderBlockNode) {
            const brandsSlider = sliderBlockNode.querySelector('.mySlider');
            console.log(sliderBlockNode);
            console.log('next slide');
            slidePosition ++;
            slideIsShow ++;
            console.log('slidePosition-' + slidePosition);
            console.log('slideIsShow-' + slideIsShow);
            if ( !(slideIsShow > quantitySlides) ) {
                brandsSlider.style.transform = `translateX(-${slidesOffset * slidePosition}px)`;
            } else {
                slidePosition --;
                slideIsShow --;
                brandsSlider.style.transform = `translateX(-${slidesOffset * slidePosition + 50}px)`;
                setTimeout(function(){
                    brandsSlider.style.transform = `translateX(-${slidesOffset * slidePosition}px)`;
                }, 500);
            }
        }
        function prevSlide(sliderBlockNode) {
            const brandsSlider = sliderBlockNode.querySelector('.mySlider');
            console.log('prev slide');
            slidePosition --;
            slideIsShow --;
            console.log('slidePosition-' + slidePosition);
            console.log('slideIsShow-' + slideIsShow);
            if ( !(slidePosition < 0) ) {
                brandsSlider.style.transform = `translateX(-${slidesOffset * slidePosition}px)`;
            } else {
                slidePosition = 0;
                slideIsShow ++;
                brandsSlider.style.transform = `translateX(50px)`;
                setTimeout(function(){
                    brandsSlider.style.transform = `translateX(0)`;
                }, 500);
            }
        }
    } // sliderSpareParts

};
