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

    initCustomScrollBar ();

    menuOpened ();

    showAllTopMenuItems ();

    showBrandRating ();

    showStarRating ();

    showReviewDiagram ();

    showAllCars ();

    showAllMagazineArticles ();

    showAllSEOText ();

    showAllFooterMenuItems ();

    // mobile -----------------------------------------

    sparePartsToggle ();

    brandsToggle ();

    // -------------------------------------------------

    function menuOpened () {
        const topToggleMenu = document.querySelector('.iconBtn-toggleMenu');
        const topMenu = document.querySelector('.topMenu');
        let menuOpenStatus = false;

        topToggleMenu.addEventListener('click', function(){
            console.log('click');
            if ( !menuOpenStatus ) {
                topMenu.setAttribute('style', 'display:flex;');
                setTimeout(function(){
                    topMenu.classList.add('topMenu-open');
                    topToggleMenu.classList.add('iconBtn-showMarker');
                    menuOpenStatus = true;
                },10);
            } else {
                menuOpenStatus = closeTopMenu(menuOpenStatus);
            }
            // clickPastWindow('topMenu', function(){
            //     menuOpenStatus = closeTopMenu(menuOpenStatus);
            // });
        });
    }

    function showAllTopMenuItems () {
        const toggleMenuBtn = document.querySelectorAll('.shevronIcon-headerMenu');
        let currentHiddenBlock,
            currentFooterMenu,
            currentHiddenElements;
        let hiddenElementsHeight;

        for ( let currentBtn of toggleMenuBtn ) {
            currentBtn.addEventListener('click', function() {
                currentFooterMenu = this.parentNode.parentNode;
                currentHiddenBlock = currentFooterMenu.querySelector('.headerMenu__hiddenBlock');
                currentHiddenElements = currentHiddenBlock.querySelector('.headerMenu__hiddenElements');

                console.log(currentHiddenBlock);
                if ( this.classList.contains('shevronIcon-headerMenuRotate')) {
                    // rotate shevron icon
                    this.classList.remove('shevronIcon-headerMenuRotate');
                    // hiding items
                    currentHiddenBlock.removeAttribute('style');
                    setTimeout(()=>{
                        currentHiddenElements.classList.add('displayNone');
                    }, 400);
                } else {
                    // rotate shevron icon
                    this.classList.add('shevronIcon-headerMenuRotate');
                    // show items
                    currentHiddenElements.classList.remove('displayNone');
                    hiddenElementsHeight = currentHiddenElements.clientHeight;
                    currentHiddenBlock.style.height = hiddenElementsHeight + 'px';
                }
            });
        } // for of
    } // showAllTopMenuItems

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
        fleXenv.fleXcrollMain(scrollContainer);
    } // initCustomScrollBar

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

    // secondary functions -------------------------------------------
    function scrollTo (idElement, speed) {
        const scrollElement = document.querySelector(idElement);
        let posElem = scrollElement.getBoundingClientRect().top + pageYOffset;
        let currentPos = pageYOffset;
        console.log('posElem - ' + posElem);
        console.log('currentPos' + currentPos);
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

    function closeTopMenu (menuOpenStatus) {
        const topMenu = document.querySelector('.topMenu');
        const topToggleMenu = document.querySelector('.iconBtn-toggleMenu');
        if (menuOpenStatus) {
            topMenu.classList.remove('topMenu-open');
            topToggleMenu.classList.remove('iconBtn-showMarker');
            setTimeout(function(){
                topMenu.setAttribute('style', 'display:none;');
            },500);
        } else return true;
        return false;
    } // closeTopMenu

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

};
