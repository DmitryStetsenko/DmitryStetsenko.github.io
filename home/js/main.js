'use strict';

window.onload = function () {
    const RATING_STROKE_LENGTH = 114,
          RATING_COLOR_GREEN = '#7eae3e',
          RATING_COLOR_YELLOW = '#efb428',
          RATING_COLOR_RED = '#e73e4e';

    // const SCREEN_MAX_WIDTH = document.querySelector('.wrapper').clientWidth;
    const SCREEN_MAX_WIDTH = 1170;
    const GUTTER_X2 = 30;
    const COL_WIDTH = SCREEN_MAX_WIDTH / 12 - GUTTER_X2;
    const COL_3_WIDTH = ( COL_WIDTH * 3 ) + ( GUTTER_X2 * 2 );
    const COL_4_WIDTH = ( COL_WIDTH * 4 ) + ( GUTTER_X2 * 3 );

    // common function

    initCustomScrollBar ();

    headerSearch ();

    menuOpened ();

    showPopAddReview ();

    showBrandRating ();

    showStarRating ();

    showReviewDiagram ();

    showAllCars ();

    showAllSEOText ();

    showAllFooterMenuItems ();

    // sliderSpareParts ();

    sliderBrands ();

    closePopUpWindow ();

    // rating page functions ----------------------------
    showAdditInfo ('.additInfo', '.headerBlockContent__item');
    tableHeaderClick ();
    showNonRatingsBrand ();
    scrollToSeoBlock ();
    // ==================================================

    // spare-parts function -------------------------------------
    scrollToReviewBlock ();
    showRatingSpareParts ();
    showMoreManufacturer ();
    // ==========================================================


    ////////////// function for responsive //////////////

    /////////////////////////////////////////////////////

    // -------------------------------------------------
    function headerSearch () {
        const searchBtn = document.querySelector('.iconBtn-search');
        const searchInput = document.querySelector('#headerFormSearch');
        const searchBox = searchInput.parentNode;

        searchBtn.addEventListener('click', function(){
            const inputSatus = searchBtn.getAttribute('data-status');
            const searchBlockParam = {
                display: 'none',
                opacity: '0',
                height: '0',
                status: 'close'
            };

            if ( inputSatus === 'close' ) {
                searchBlockParam.display = 'block';
                searchBlockParam.opacity = '1';
                searchBlockParam.height = '63px';
                searchBlockParam.status = 'open';

                searchBox.style.display = searchBlockParam.display;
                searchBtn.setAttribute('data-status', searchBlockParam.status);
                searchBtn.classList.add('iconBtn-showMarker');
                setTimeout(()=>{
                    searchBox.style.opacity = searchBlockParam.opacity;
                },500);

            } else {
                searchBlockParam.display = 'none';
                searchBlockParam.opacity = '0';
                searchBlockParam.height = '0';
                searchBlockParam.status = 'close';

                searchBox.style.opacity = searchBlockParam.opacity;
                searchBtn.setAttribute('data-status', searchBlockParam.status);
                searchBtn.classList.remove('iconBtn-showMarker');
                setTimeout(()=>{
                    searchBox.removeAttribute('style');
                },500);
            }


        });
    } // headerSearch

    function menuOpened () {
        const topToggleMenu = document.querySelector('.iconBtn-toggleMenu');
        const topMenu = document.querySelector('.topMenu');

        topToggleMenu.addEventListener('click', function(){
           DOMAnimation.slideToggle(topMenu);
            clickPastWindow('topMenu', function(){
                DOMAnimation.slideUp(topMenu);
            });
        });
    }

    function showPopAddReview () {
        const addReviewBtn = document.querySelector('.mainBtn-addReview');
        addReviewBtn.addEventListener('click',()=>{
            showPopUpWindow('#popUpWindowAddReview');
        });
    } // showPopAddReview

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
        if (carsListBlock) {
            const blockHeight = carsListBlock.clientHeight;
            const carItems = carsListBlock.querySelector('.carItems');
            const showAllBtn = document.querySelector('#carsShowAll');
            let showAllBtnStatus;
            const showAllBtnText = showAllBtn.innerText;
            let unvisibleItem = carsListBlock.querySelectorAll('.displayNone');
            let openBlockHeight = 0;

            carsListBlock.style.height = blockHeight + 'px';
            carsListBlock.style.overflow = 'hidden';
            carsListBlock.style.transition = 'height .3s';

            showAllBtn.addEventListener('click', ()=>{
                showAllBtnStatus = showAllBtn.getAttribute('data-status');
                if ( showAllBtnStatus === 'toshow' ) {
                    for ( let i = 0; i < unvisibleItem.length; i++) {
                        unvisibleItem[i].classList.remove('displayNone');
                        unvisibleItem[i].classList.add('displayShow');
                    }
                    openBlockHeight = carItems.clientHeight;
                    carsListBlock.style.height = openBlockHeight + 'px';

                    showAllBtn.setAttribute('data-status','hide');

                    // change show all btn on hide content
                    showAllBtn.innerText = 'Скрыть';

                } else {
                    unvisibleItem = carsListBlock.querySelectorAll('.displayShow');
                    carsListBlock.style.height = blockHeight + 'px';
                    showAllBtn.setAttribute('data-status','toshow');

                    // change show all btn on show more
                    showAllBtn.innerText = showAllBtnText;

                    // clear style
                    setTimeout(()=> {
                        for ( let i = 0; i < unvisibleItem.length; i++) {
                            unvisibleItem[i].classList.add('displayNone');
                            unvisibleItem[i].classList.remove('displayShow');
                        }
                        // carsListBlock.removeAttribute('style');
                    }, 1000)
                }

            });
        }
    } // showAllCars

    function showAllSEOText () {
        const seoContentBlock = document.querySelector('.seoTexts');
        if (seoContentBlock) {
            const seoBlockTxt = seoContentBlock.querySelector('.seoTexts__content');
            const blockHeight = seoContentBlock.clientHeight + 30;
            const showAllBtn = document.querySelector('#seoBlockShowMore');
            const showAllBtnText = showAllBtn.innerText;
            let showAllBtnStatus;
            const unvisibleItem = seoBlockTxt.querySelectorAll('.displayNone');
            let openBlockHeight = 0;

            seoContentBlock.style.height = blockHeight + 'px';
            seoContentBlock.style.overflow = 'hidden';
            seoContentBlock.style.transition = 'height .3s';

            showAllBtn.addEventListener('click', ()=>{
                showAllBtnStatus = showAllBtn.getAttribute('data-status');
                if ( showAllBtnStatus === 'toshow' ) {
                    for ( let i = 0; i < unvisibleItem.length; i++) {
                        unvisibleItem[i].classList.remove('displayNone');
                        unvisibleItem[i].classList.add('displayShow');
                    }
                    openBlockHeight = seoBlockTxt.clientHeight + 30;
                    seoContentBlock.style.height = openBlockHeight + 'px';

                    showAllBtn.setAttribute('data-status','hide');

                    // change show all btn on hide content
                    showAllBtn.innerText = 'Скрыть';

                } else {
                    seoContentBlock.style.height = blockHeight + 'px';
                    showAllBtn.setAttribute('data-status','toshow');

                    // change show all btn on show more
                    showAllBtn.innerText = showAllBtnText;

                    // clear style
                    setTimeout(()=> {
                        for ( let i = 0; i < unvisibleItem.length; i++) {
                            unvisibleItem[i].classList.add('displayNone');
                            unvisibleItem[i].classList.remove('displayShow');
                        }
                        // carsListBlock.removeAttribute('style');
                    }, 1000)
                }
            });
        }
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

    function initCustomScrollBar () {
        const scrollContainer = document.querySelector('.activityTape');
        if (scrollContainer) {
            fleXenv.fleXcrollMain(scrollContainer);
        }
    } // initCustomScrollBar

    // rating page functions ------------------------------------
    function showAdditInfo (additInfoBtnSelector, additInfoParentBlockSelector) {
        const additInfoBtn = document.querySelector(additInfoBtnSelector);
        if ( additInfoBtn ) {
            const parentBox = document.querySelector(additInfoParentBlockSelector);
            const showAdditInfo = parentBox.querySelector('.showAdditInfo');
            additInfoBtn.onmouseover = function() {
                DOMAnimation.slideDown(showAdditInfo, 200);
            };
            additInfoBtn.onmouseout = function() {
                DOMAnimation.slideUp(showAdditInfo, 200);
            };
        }
    } // showAdditInfo
    function tableHeaderClick () {
        const tableHeaderItem = document.querySelectorAll('.tableHeaderItem');
        const topDirectionClass = 'ratingDirection-top';
        const bottomDirectionClass = 'ratingDirection-bottom';

        Array.from(tableHeaderItem).forEach(function(currentHeaderItem){
            currentHeaderItem.addEventListener('click', function(){
                const ratingDirection = this.querySelector('.ratingDirection');
                if (ratingDirection.classList.contains(topDirectionClass)) {
                    ratingDirection.classList.remove(topDirectionClass);
                    ratingDirection.classList.add(bottomDirectionClass);
                } else {
                    ratingDirection.classList.add(topDirectionClass);
                    ratingDirection.classList.remove(bottomDirectionClass);
                }
            });
        });
    } // tableHeaderClick
    function showNonRatingsBrand() {
        const showNotRatedBtn = document.querySelector('.mainBtn-showNotRated');
        if ( showNotRatedBtn ) {
            const notShowRatingsBlock = document.querySelector('.tableRating-loading');
            const showText = 'Показать производителей не участвующих в рейтинге';
            const hideText = 'Скрыть производителей не участвующих в рейтинге';
            let innerText;
            let showStatus = false;

            showNotRatedBtn.addEventListener('click', function(){
                DOMAnimation.slideToggle(notShowRatingsBlock);
                showStatus = !showStatus;
                innerText = showStatus ? hideText : showText;
                this.querySelector('.innerText').innerText = innerText;
            });
        }
    } // showNonRatingsBrand
    function scrollToSeoBlock(){
        const showMoreBtn = document.querySelector('.showMoreBtn-descrBlock');
        if ( showMoreBtn ) {
            showMoreBtn.onclick = function(e) {
                e.preventDefault();
                scrollTo('#seo');
            }
        }
    } // scrollToSeoBlock
    // ==========================================================

    // spare-parts function -------------------------------------
    function scrollToReviewBlock() {
        const link = document.querySelector('#scrollToReviewBlock');
        if (link) {
            link.onclick = function(e) {
                e.preventDefault();
                scrollTo ('#reviewBlock');
            };
        }
    } // scrollToReviewBlock
    function showRatingSpareParts () {
        let sparePartsElements = document.querySelectorAll('.ratingListElement');
        if ( sparePartsElements ) {
            sparePartsElements = Array.prototype.slice.call(sparePartsElements);

            sparePartsElements.forEach(function(currentElem) {
                let currentRatingElem = currentElem.querySelector('.ratingListElement__item-rating');
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
        }
    } // showRatingSpareParts
    function showMoreManufacturer () {
        const showMoreBtn = document.querySelector('#showMoreManufacturer');
        let isShow = false;
        const btnText = showMoreBtn.innerText;

        if ( showMoreBtn ) {
            showMoreBtn.onclick = function(){
                const showMoreBox = this.parentNode.querySelector('.showThisBlock');
                isShow = !isShow;
                DOMAnimation.slideToggle(showMoreBox);
                this.innerText = btnText;
                if (isShow) {
                    this.innerText = 'Скрыть';
                }
            };
        }
    } // showMoreManufacturer
    // ==========================================================

// secondary functions -------------------------------------------
    class DOMAnimation {
        /**
         * hide element
         * @param {HTMLElement} element
         * @param {Number} duration
         */
        static slideUp (element, duration = 500) {
            element.style.height = element.offsetHeight + 'px';
            element.style.transitionProperty = 'height, margin, padding';
            element.style.transitionDuration = duration + 'ms';
            element.offsetHeight;
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.paddingTop = 0;
            element.style.paddingBottom = 0;
            element.style.marginTop = 0;
            element.style.marginBottom = 0;
            window.setTimeout(function(){
                element.style.display = 'none';
                element.style.removeProperty('height');
                element.style.removeProperty('padding-top');
                element.style.removeProperty('padding-bottom');
                element.style.removeProperty('margin-top');
                element.style.removeProperty('margin-bottom');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-property');
                element.style.removeProperty('transition-duration');
            }, duration);
        }
        /**
         * show element
         * @param {HTMLElement} element
         * @param {Number} duration
         */
        static slideDown (element, duration = 500) {
            element.style.removeProperty('display');
            let display = window.getComputedStyle(element).display;
            if ( display === 'none' ) display = 'block';
            element.style.display = display;
            let height = element.offsetHeight;
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.paddingTop = 0;
            element.style.paddingBottom = 0;
            element.style.marginTop = 0;
            element.style.marginBottom = 0;
            element.offsetHeight;
            element.style.transitionProperty = 'height, margin, padding';
            element.style.transitionDuration = duration + 'ms';
            element.style.height = height + 'px';
            element.style.removeProperty('padding-top');
            element.style.removeProperty('padding-bottom');
            element.style.removeProperty('margin-top');
            element.style.removeProperty('margin-bottom');
            window.setTimeout(function(){
                element.style.removeProperty('height');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-property');
                element.style.removeProperty('transition-duration');
            }, duration);
        }
        /**
         * toggle element
         * @param {HTMLElement} element
         * @param {Number} duration
         */
        static slideToggle (element, duration = 500) {
            let display = getComputedStyle(element).display;
            if (display === 'none') {
                this.slideDown(element, duration);
            } else {
                this.slideUp(element, duration);
            }
        }
    }

    function scrollTo (idElement, speed = 50) {
        const scrollElement = document.querySelector(idElement);
        let posElem = scrollElement.getBoundingClientRect().top + pageYOffset;
        let currentPos = pageYOffset;
        let scr = setInterval(function () {
            if ( currentPos > posElem ) {
                currentPos -= speed;
                if (currentPos < posElem) {
                    clearInterval(scr);
                }
            } else {
                currentPos += speed;
                if (currentPos > posElem - speed) {
                    clearInterval(scr);
                }
            }
            window.scrollTo(0, currentPos);
        }, 1);
    } // scrollTo

    function clickPastWindow(id,callback) {
        const targetWindow = document.querySelector('#' + id);
        document.addEventListener('mouseup',function (e){
            if ( !targetWindow.contains(e.target) ) {
               if (callback) {
                   callback();
               }
            }
        });
    } // clickPastWindow

    function showPopUpWindow(id) {
        const popUpWindowBlock = document.querySelector(id);
        const popUpWindow = popUpWindowBlock.querySelector('.popUpWindow');
        const overlay = popUpWindowBlock.querySelector('.overlay');

        popUpWindow.style.opacity = '0';
        overlay.style.opacity = '0';

        popUpWindowBlock.classList.remove('displayNone');

        setTimeout(()=>{
            popUpWindow.style.opacity = '1';
            overlay.style.opacity = '.6';
        }, 100);
    } // showPopUpWindow

    function closePopUpWindow() {
        const closeBtn = document.querySelectorAll('.closeBtn-modalWindow');

        for (let currentCloseBtn of closeBtn ) {
            currentCloseBtn.addEventListener('click', function(){
                const popUpWindowBlock = this.parentNode.parentNode;
                const popUpWindow = popUpWindowBlock.querySelector('.popUpWindow');
                const overlay = popUpWindowBlock.querySelector('.overlay');

                popUpWindow.style.opacity = '0';
                overlay.style.opacity = '0';

                setTimeout(()=>{
                    popUpWindowBlock.classList.add('displayNone');
                    popUpWindow.removeAttribute('style');
                    overlay.removeAttribute('style');
                }, 500);
            });
        }
    } // closePopUpWindow



// sliders -------------------------------------------------------
    let index = 1;
    let indexOffset = 3;
    let slidesIsShow = 4;
    let isSlider = document.querySelector('.sliderBox-spareParts');
    if ( isSlider ) {
        let Slider = function () {
            this.box = document.querySelector('.sliderBox-spareParts');
            this.slidesBox = this.box.querySelector('.mySlider');
            this.slides = this.slidesBox.querySelectorAll('.slide');
            this.btns = this.box.querySelectorAll('.sliderNavBlock__btn');
            this.size = ((this.slidesBox.clientWidth + 25) / slidesIsShow).toFixed();

            this.slidesBox.style.width = this.size * this.slides.length + 'px';

            this.position();
            this.carousel();
        };

        Slider.prototype.position = function() {
            let size = this.size;
            this.slidesBox.style.transform = `translateX(-${size * ( index + indexOffset - 1 )}px)`;
            console.log(index + indexOffset);
            index += indexOffset - 1;
        };
        Slider.prototype.carousel = function() {
            let i;
            let max = this.btns.length;
            let that = this;

            for ( i = 0; i < max; i += 1 ) {
                that.btns[i].addEventListener('click', Slider[that.btns[i].id].bind(null, that));
            }
        };

        Slider.prev = function( box ){
            let size = box.size;
            index <= 0 ? false : index--;
            box.slidesBox.style.transition = 'transform .3s ease-in-out';
            box.slidesBox.style.transform = `translateX(-${size * ( index + indexOffset - 1)}px)`;
        };

        Slider.next = function( box ){
            let max = box.slides.length;
            let size = box.size;
            (index + indexOffset) >= (max - 1) ? false : index++;
            box.slidesBox.style.transition = 'transform .3s ease-in-out';
            box.slidesBox.style.transform = `translateX(-${size * index}px)`;

            box.jump();
        };
        Slider.prototype.jump = function() {
            let that = this;
            let size = this.size;
            this.slidesBox.addEventListener('transitionend', function(){
                if ( that.slides[index + indexOffset].classList.contains('lastClone') ) {
                    console.log(that.slides[index + indexOffset]);
                    console.log(`index - ${index}`);
                    console.log('last-slide:');
                    index = 0;
                    that.slidesBox.style.transition = 'none';
                    that.slidesBox.style.transform = `translateX(-${size * index}px)`;
                } else {
                    console.log(that.slides[index + indexOffset]);
                    console.log(`index - ${index}`);
                    // that.slidesBox.style.transition = 'none';
                    // that.slidesBox.style.transform = `translateX(-${size * (index + ( indexOffset - 1 ))}px)`;
                }
            })
        };

        new Slider();


    }
    function sliderSpareParts () {
        const sliderBlock = document.querySelector('.sliderBox-spareParts');
        let slidePosition;
        let slideIsShow;
        let quantitySlides;
        let slidesOffset;
        let index = 1;
        let realIndex;
        let box;
        if (sliderBlock){
            const slider = sliderBlock.querySelector('.mySlider');
            const sliderNavBlock = sliderBlock.querySelector('.sliderNavBlock');
            const sliderNextBtn = sliderBlock.querySelector('.sliderNavBlock__btn-next');
            const sliderPrevBtn = sliderBlock.querySelector('.sliderNavBlock__btn-prev');
            let slides = slider.querySelectorAll('.slides');

            slides = Array.prototype.slice.call(slides);
            quantitySlides = slides.length;
            slidePosition = 0;
            slideIsShow = 4;
            index = 1;
            slidesOffset = COL_3_WIDTH + GUTTER_X2;

            // initial slider
            console.log('slides is - ' + slides.length);
            console.log('slide is show - ' + slideIsShow);
            console.log('slide start - ' + index);

            box = quantitySlides * COL_3_WIDTH + quantitySlides * GUTTER_X2;
            slider.style.width = box + 'px';

            // offset slider on slideIsShow slide

            slider.style.transform = `translateX(-${slidesOffset * ( index + 1 )}px)`;

            // check for navigation buttons show
            if ( slideIsShow === quantitySlides ) {
                sliderNavBlock.classList.add('displayNone');
            }

            slides.forEach(function(currentSlide){
                currentSlide.style.width = COL_3_WIDTH + 'px';
                currentSlide.style.marginRight = GUTTER_X2 + 'px';
            });

            sliderNextBtn.addEventListener('click', function(){
                let sliderBlockNode = this.parentNode.parentNode;
                nextSlide(sliderBlockNode);
            });
            sliderPrevBtn.addEventListener('click', function(){
                let sliderBlockNode = this.parentNode.parentNode;
                prevSlide(sliderBlockNode);
            });
        }
        function nextSlide(sliderBlockNode) {
            const slider = sliderBlockNode.querySelector('.mySlider');
            let slides = slider.querySelectorAll('.slides');
            let max = slides.length;
            let size = slidesOffset;

            // index + 1 + slideIsShow  >= max ? false : index++;

            if ( index + slideIsShow - 2 >= max - 3  ) {
                console.log('last-slide');
                // slider.style.transition = 'none';
            } else {
                index++;
            }

            slider.style.transition = 'transform .3s ease-in-out';
            slider.style.transform = `translateX(-${slidesOffset * ( index + 1 )}px)`;
            jump(sliderBlockNode);

        }
        function prevSlide(sliderBlockNode) {
            const slider = sliderBlockNode.querySelector('.mySlider');
            let slides = slider.querySelectorAll('.slides');
            let size = slidesOffset;

            slider.style.transition = 'transform .3s ease-in-out';
            index + slideIsShow <= 0 ? false : index--;
            console.log(index+slideIsShow);
            slider.style.transform = `translateX(-${slidesOffset * index}px)`;
            // jump(sliderBlockNode);
        }

        function jump(sliderBlockNode) {
            const slider = sliderBlockNode.querySelector('.mySlider');
            let slides = slider.querySelectorAll('.slides');

            sliderBlock.addEventListener('transitionend', function(){
                if ( slides[( index + 2 ) + ( slideIsShow - 1 )].classList.contains('lastClone') ) {
                    console.log('transition end');

                    index = -2;
                    slider.style.transform = `translateX(-${slidesOffset * index}px)`;
                    // slider.style.transition = 'transform .3s ease-in-out';
                }
                // slides[index - 1].classList.contains('firstClone') ? index = slideIsShow : index;
                // slides[index - slideIsShow].classList.contains('lastClone') ? slideIsShow = 1 : index;

                // slider.style.transition = 'none';
                // slider.style.transform = `translateX(-${slidesOffset * index}px)`;
            });
        }
    } // sliderSpareParts

    function sliderBrands () {
        const brandsSliderBlock = document.querySelector('.sliderBox-brands');
        let slidePosition;
        let slideIsShow;
        let quantitySlides;
        let slidesOffset;
        if ( brandsSliderBlock ) {
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
        }
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
