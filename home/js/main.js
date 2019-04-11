'use strict';

$(function () {

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

    // stylesSelect();

    initCustomScrollBar();

    headerSearch(); // JQ

    menuOpened(); // JQ

    showPopAddReview(); // JQ

    showBrandRating(); // JQ

    showStarRating(); // JQ

    showReviewDiagram(); // JQ

    showAllCars();

    showAllSEOText();

    showAllFooterMenuItems();

    sliderSpareParts();

    // sliderBrands();

    closePopUpWindow();

    // rating page functions ----------------------------
    showAdditInfo('.additInfo', '.headerBlockContent__item');
    tableHeaderClick();
    showNonRatingsBrand();
    scrollToSeoBlock();
    // ==================================================

    // spare-parts function -------------------------------------
    scrollToReviewBlock();
    showRatingSpareParts();
    showMoreManufacturer(); // JQ
    replacePageHeaderBlockImgOfResponsive(); // JQ
    manufacturerBlockResponsive(); // JQ
    comparisonBlockResponsive(); // JQ
    initFilter(); // JQ
    reviewShowMoreBtn(); // JQ
    // ==========================================================

    // rating & spareParts page function ------------------------
    responsiveHeaderBlock(); // JQ
    // ==========================================================

    // model-spareParts page function ----------------------------
    otherSparePartsToggle(); // otherSparePartsToggle JQ
    responceReplaceWidgetInterestingTheme(); // responceReplaceWidgetInterestingTheme JQ
    // ===========================================================

    // model page function ---------------------------------------
    responceReplaceWidget(); // responceReplaceWidget JQ
    // ===========================================================

    // car-brand page function -----------------------------------
    toggleSparePartsList(); // toggleSparePartsList JQ
    responceCarBrandPage(); // responceCarBrandPage JQ
    // ===========================================================


    ////////////// function for responsive //////////////

    /////////////////////////////////////////////////////

    // -------------------------------------------------
    // common funtion ----------------
    function stylesSelect() {
        $('select').selecter({
            // callback    : function ( value, index ) {
            //     filterEvent1 = value;
            //     show_event(weekEventsData, filterEvent1, filterEvent2);
            // },
            customClass: 'mySelecter'
        });
    } //
    // ===============================
    function headerSearch() {
        const searchBtn = $('.iconBtn-search');
        const searchInput = $('#headerFormSearch');
        const searchBox = searchInput.parent();
        let isShow = false;

        searchBtn.on('click', function () {
            if (isShow) {
                searchBox.slideUp();
            } else {
                searchBox.slideDown();
            }
            isShow = !isShow;
        });
    } // headerSearch JQ

    function menuOpened() {
        const topToggleMenu = $('.iconBtn-toggleMenu');
        const topMenu = $('.topMenu');

        topToggleMenu.on('click', function () {
            topMenu.slideToggle();
            clickPastWindow('topMenu', function () {
                topMenu.slideUp();
            });
        });
    } // JQ

    function showPopAddReview() {
        const addReviewBtn = $('.mainBtn-addReview');
        addReviewBtn.on('click', () => {
            showPopUpWindow('#popUpWindowAddReview');
        });
    } // showPopAddReview JQ

    function showBrandRating() {
        let sparePartsElements = $('.sparePartsElement');
        sparePartsElements.each(function () {

            let currentRatingElem = $(this).find('.sparePartsElement__item-rating');
            let spanRatingElement = currentRatingElem.find('span');
            let currentRating = parseInt(currentRatingElem.attr('data-count'));
            let persentValue = parseInt(RATING_STROKE_LENGTH - RATING_STROKE_LENGTH * currentRating / 100);
            let svg = currentRatingElem.find('path:last-child');
            for (let i = 0; i <= currentRating; i++) {
                setTimeout(() => {
                    spanRatingElement.text(i);
                }, i * 7);
            }

            svg.css('strokeDashoffset', persentValue);
            switch (true) {
                case ( currentRating < 34 ) : {
                    svg.css('stroke', RATING_COLOR_RED);
                    break;
                }
                case ( currentRating >= 34 && currentRating < 67 ) : {
                    svg.css('stroke', RATING_COLOR_YELLOW);
                    break;
                }

                case ( currentRating >= 67 && currentRating <= 100 ) : {
                    svg.css('stroke', RATING_COLOR_GREEN);
                    break;
                }
            }
        });
    } // showBrandRating JQ

    function showStarRating() {
        let averageRatingNumber = $('.averageRatingNumber');
        averageRatingNumber.each(function () {
            let currentRating = parseFloat($(this).text());
            let svg = $(this).parent().find('path');
            switch (true) {
                case ( currentRating <= 3 ) : {
                    svg.css('fill', RATING_COLOR_RED);
                    break;
                }
                case ( currentRating > 3 && currentRating < 4 ) : {
                    svg.css('fill', RATING_COLOR_YELLOW);
                    break;
                }

                case ( currentRating > 4 ) : {
                    svg.css('fill', RATING_COLOR_GREEN);
                    break;
                }
            }
        });
    } // showStarRating JQ

    function showReviewDiagram() {
        let reviewDiagramBlock = $('.reviewDiagramBlock');
        reviewDiagramBlock.each(function () {
            let greenZone = $(this).find('.reviewDiagramBlock__item-green'),
                yellowZone = $(this).find('.reviewDiagramBlock__item-yellow'),
                redZone = $(this).find('.reviewDiagramBlock__item-red');
            let greenZoneValue = parseInt(greenZone.text()),
                yellowZoneValue = parseInt(yellowZone.text()),
                redZoneValue = parseInt(redZone.text());
            let summValue = greenZoneValue + yellowZoneValue + redZoneValue;
            let greenZoneValuePercent = parseInt(100 * greenZoneValue / summValue),
                yellowZoneValuePercent = parseInt(100 * yellowZoneValue / summValue),
                redZoneValuePercent = parseInt(100 * redZoneValue / summValue);
            greenZone.css('width', greenZoneValuePercent + '%');
            yellowZone.css('width', yellowZoneValuePercent + '%');
            redZone.css('width', redZoneValuePercent + '%');
        });
    } // showReviewDiagram JQ

    function showAllCars() {
        const carsListBlock = $('.cars__listsBlock');
        if (carsListBlock.length) {
            const blockHeight = carsListBlock.height();
            const carItems = carsListBlock.find('.carItems');
            const showAllBtn = $('#carsShowAll');
            let showAllBtnStatus;
            const showAllBtnText = showAllBtn.text();
            let unvisibleItem = carsListBlock.find('.displayNone');
            let openBlockHeight = 0;

            carsListBlock.css('height', blockHeight + 'px');
            carsListBlock.css('overflow', 'hidden');
            carsListBlock.css('transition', 'height .3s');

            showAllBtn.on('click', () => {
                showAllBtnStatus = showAllBtn.attr('data-status');
                if (showAllBtnStatus === 'toshow') {
                    for (let i = 0; i < unvisibleItem.length; i++) {
                        unvisibleItem.eq(i).removeClass('displayNone');
                        unvisibleItem.eq(i).addClass('displayShow');
                    }
                    openBlockHeight = carItems.height();
                    carsListBlock.height(openBlockHeight + 'px');

                    showAllBtn.attr('data-status', 'hide');

                    // change show all btn on hide content
                    showAllBtn.text('Скрыть');

                } else {
                    unvisibleItem = carsListBlock.find('.displayShow');
                    carsListBlock.height(blockHeight + 'px');
                    showAllBtn.attr('data-status', 'toshow');

                    // change show all btn on show more
                    showAllBtn.text(showAllBtnText);

                    // clear style
                    setTimeout(() => {
                        for (let i = 0; i < unvisibleItem.length; i++) {
                            unvisibleItem.eq(i).addClass('displayNone');
                            unvisibleItem.eq(i).removeClass('displayShow');
                        }
                    }, 500)
                }

            });
        }
    } // showAllCars JQ

    function showAllSEOText() {
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

            showAllBtn.addEventListener('click', () => {
                showAllBtnStatus = showAllBtn.getAttribute('data-status');
                if (showAllBtnStatus === 'toshow') {
                    for (let i = 0; i < unvisibleItem.length; i++) {
                        unvisibleItem[i].classList.remove('displayNone');
                        unvisibleItem[i].classList.add('displayShow');
                    }
                    openBlockHeight = seoBlockTxt.clientHeight + 30;
                    seoContentBlock.style.height = openBlockHeight + 'px';

                    showAllBtn.setAttribute('data-status', 'hide');

                    // change show all btn on hide content
                    showAllBtn.innerText = 'Скрыть';

                } else {
                    seoContentBlock.style.height = blockHeight + 'px';
                    showAllBtn.setAttribute('data-status', 'toshow');

                    // change show all btn on show more
                    showAllBtn.innerText = showAllBtnText;

                    // clear style
                    setTimeout(() => {
                        for (let i = 0; i < unvisibleItem.length; i++) {
                            unvisibleItem[i].classList.add('displayNone');
                            unvisibleItem[i].classList.remove('displayShow');
                        }
                        // carsListBlock.removeAttribute('style');
                    }, 1000)
                }
            });
        }
    } // showAllSEOText

    function showAllFooterMenuItems() {
        const toggleMenuBtn = document.querySelectorAll('.shevronIcon-footerMenu');
        let currentHiddenBlock,
            currentFooterMenu,
            currentHiddenElements;
        let hiddenElementsHeight;

        for (let currentBtn of toggleMenuBtn) {
            currentBtn.addEventListener('click', function () {
                currentFooterMenu = this.parentNode.parentNode;
                currentHiddenBlock = currentFooterMenu.querySelector('.footerMenu__hiddenBlock');
                currentHiddenElements = currentHiddenBlock.querySelector('.footerMenu__hiddenElements');

                console.log(currentHiddenBlock);
                if (this.classList.contains('shevronIcon-footerMenuRotate')) {
                    // rotate shevron icon
                    this.classList.remove('shevronIcon-footerMenuRotate');
                    // hiding items
                    currentHiddenBlock.removeAttribute('style');
                    setTimeout(() => {
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

    function initCustomScrollBar() {
        // const scrollContainer = document.querySelector('.activityTape');
        // if (scrollContainer) {
        //     fleXenv.fleXcrollMain(scrollContainer);
        // }
    } // initCustomScrollBar

    // rating page functions ------------------------------------
    function showAdditInfo(additInfoBtnSelector, additInfoParentBlockSelector) {
        const additInfoBtn = document.querySelector(additInfoBtnSelector);
        if (additInfoBtn) {
            const parentBox = document.querySelector(additInfoParentBlockSelector);
            const showAdditInfo = parentBox.querySelector('.showAdditInfo');
            additInfoBtn.onmouseover = function () {
                DOMAnimation.slideDown(showAdditInfo, 200);
            };
            additInfoBtn.onmouseout = function () {
                DOMAnimation.slideUp(showAdditInfo, 200);
            };
        }
    } // showAdditInfo
    function tableHeaderClick() {
        const tableHeaderItem = document.querySelectorAll('.tableHeaderItem');
        const topDirectionClass = 'ratingDirection-top';
        const bottomDirectionClass = 'ratingDirection-bottom';

        Array.from(tableHeaderItem).forEach(function (currentHeaderItem) {
            currentHeaderItem.addEventListener('click', function () {
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
        if (showNotRatedBtn) {
            const notShowRatingsBlock = document.querySelector('.tableRating-loading');
            const showText = 'Показать производителей не участвующих в рейтинге';
            const hideText = 'Скрыть производителей не участвующих в рейтинге';
            let innerText;
            let showStatus = false;

            showNotRatedBtn.addEventListener('click', function () {
                DOMAnimation.slideToggle(notShowRatingsBlock);
                showStatus = !showStatus;
                innerText = showStatus ? hideText : showText;
                this.querySelector('.innerText').innerText = innerText;
            });
        }
    } // showNonRatingsBrand
    function scrollToSeoBlock() {
        const showMoreBtn = document.querySelector('#scrollToSeoBlock');
        if (showMoreBtn) {
            showMoreBtn.onclick = function (e) {
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
            link.onclick = function (e) {
                e.preventDefault();
                scrollTo('#sparePartsPageReviewBlock');
            };
        }
    } // scrollToReviewBlock
    function showRatingSpareParts() {
        let sparePartsElements = document.querySelectorAll('.ratingListElement');
        if (sparePartsElements) {
            sparePartsElements = Array.prototype.slice.call(sparePartsElements);

            sparePartsElements.forEach(function (currentElem) {
                let currentRatingElem = currentElem.querySelector('.ratingListElement__item-rating');
                let spanRatingElement = currentRatingElem.querySelector('span');
                let currentRating = parseInt(currentRatingElem.getAttribute('data-count'));
                let persentValue = parseInt(RATING_STROKE_LENGTH - RATING_STROKE_LENGTH * currentRating / 100);
                let svg = currentRatingElem.querySelector('path:last-child');
                for (let i = 0; i <= currentRating; i++) {
                    setTimeout(() => {
                        spanRatingElement.innerText = i;
                    }, i * 7);
                }

                svg.style.strokeDashoffset = persentValue;
                switch (true) {
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
    function showMoreManufacturer() {
        const showMoreBtn = $('#showMoreManufacturer');
        const showAllBtn = $('#showAllManufacturer');
        let isShow = false;

        if (showMoreBtn) {
            const btnText = showMoreBtn.text();
            showMoreBtn.click(function () {
                const showMoreBox = $(this).parent().find('.showThisBlock');
                isShow = !isShow;
                showMoreBox.slideToggle();
                showAllBtn.hide();
                $(this).text(btnText);
                if (isShow) {
                    $(this).text('Скрыть');
                    showAllBtn.css('margin-top', '15px');
                    showAllBtn.show();
                }
            });
        }
    } // showMoreManufacturer JQ
    function replacePageHeaderBlockImgOfResponsive() {
        const thumbnail = $('#sparePartsPageHeaderImg');
        if (thumbnail.length) {
            const content = $('.pageHeaderBlock__content');
            const blockTitle = $('.h1Title.blockTitle');

            if (window.matchMedia('(max-width: 1000px)').matches) {
                thumbnail.append(blockTitle);
            }
            window.addEventListener('resize', function() {
                if (window.matchMedia('(max-width: 1000px)').matches) {
                    thumbnail.append(blockTitle);
                } else {
                    content.prepend(blockTitle);
                }
            });
        }
    } // replacePageHeaderBlockImgOfResponsive JQ
    function manufacturerBlockResponsive() {
        // replace two lasts block from main block to hidden block
        // delete two last block from hidden block
        const manufacturer = $('#sparePartsPageManufacturerBlock');
        if (manufacturer.length) {
            const mainBlock = manufacturer.find('.manufacturerList__items').eq(0);
            const hiddenBlock = manufacturer.find('.manufacturerList__items').eq(1);
            const showItems = mainBlock.find('.manufacturerList__item');
            let hiddenItems = hiddenBlock.find('.manufacturerList__item');
            let isReplace = false;
            if (!isReplace) {
                if (window.matchMedia('(max-width: 1170px)').matches) {
                    isReplace = true;
                    hiddenBlock.prepend(showItems.eq(showItems.length - 1));
                    hiddenBlock.prepend(showItems.eq(showItems.length - 2));
                    for (let i = 1; i <= 4; i++) {
                        hiddenItems.eq(hiddenItems.length - i).addClass('manufacturerList__item-hidden');
                    }
                }
            } else if (window.matchMedia('(min-width: 1170px)').matches) {
                isReplace = false;
                hiddenItems = hiddenBlock.find('.manufacturerList__item');
                mainBlock.append(hiddenItems.eq(0));
                mainBlock.append(hiddenItems.eq(1));
                for (let i = 1; i <= 4; i++) {
                    hiddenItems.eq(hiddenItems.length - i).removeClass('manufacturerList__item-hidden');
                }
            }

            $(window).resize(function () {
                if (!isReplace) {
                    if (window.matchMedia('(max-width: 1170px)').matches) {
                        isReplace = true;
                        hiddenBlock.prepend(showItems.eq(showItems.length - 1));
                        hiddenBlock.prepend(showItems.eq(showItems.length - 2));
                        for (let i = 1; i <= 4; i++) {
                            hiddenItems.eq(hiddenItems.length - i).addClass('manufacturerList__item-hidden');
                        }
                    }
                } else if (window.matchMedia('(min-width: 1170px)').matches) {
                    isReplace = false;
                    hiddenItems = hiddenBlock.find('.manufacturerList__item');
                    mainBlock.append(hiddenItems.eq(0));
                    mainBlock.append(hiddenItems.eq(1));
                    for (let i = 1; i <= 4; i++) {
                        hiddenItems.eq(hiddenItems.length - i).removeClass('manufacturerList__item-hidden');
                    }
                }
            });
        }
    } // manufacturerBlockResponsive JQ
    function comparisonBlockResponsive() {
        // replace widget filter from review block
        const comparisonBlock = $('#sparePartsPageComparisonBlock');
        if (comparisonBlock.length) {
            const reviewBlock = $('#sparePartsPageReviewBlock');
            const widgetsAreaComparisonBlock = comparisonBlock.find('.widgetsArea');
            const widgetsAreaReviewBlock = reviewBlock.find('.widgetsArea');
            let widgetFilter = widgetsAreaReviewBlock.find('.widget-filter');

            let isReplace = false;
            if (!isReplace) {
                if (window.matchMedia('(max-width: 1170px)').matches) {
                    isReplace = true;
                    widgetsAreaComparisonBlock.append(widgetFilter);
                }
            } else if (window.matchMedia('(min-width: 1170px)').matches) {
                isReplace = false;
                widgetFilter = widgetsAreaComparisonBlock.find('.widget-filter');
                widgetsAreaReviewBlock.prepend(widgetFilter);
            }
            $(window).resize(function () {
                if (!isReplace) {
                    if (window.matchMedia('(max-width: 1170px)').matches) {
                        isReplace = true;
                        widgetsAreaComparisonBlock.append(widgetFilter);
                    }
                } else if (window.matchMedia('(min-width: 1170px)').matches) {
                    isReplace = false;
                    widgetFilter = widgetsAreaComparisonBlock.find('.widget-filter');
                    widgetsAreaReviewBlock.prepend(widgetFilter);
                }
            });
        }
    } // manufacturerBlockResponsive JQ
    function reviewShowMoreBtn() {
        const reviewBlock = $('.review');
        if (reviewBlock.length) {
            const userDescriptionBlock = reviewBlock.find('.infoBlock-userDescription');
            const showMoreBtn = userDescriptionBlock.find('.showMoreBtn-descrBlock');
            let currentDescrBlockHeight;
            let descriptionIsShow = false;

            showMoreBtn.click(function(){
                const currentReviewBlock = $(this).parent();
                const descriptionHeight = currentReviewBlock.find('.userDescription').height();

                if (descriptionIsShow) {
                    currentReviewBlock.css('height', currentDescrBlockHeight);
                    $(this).text('Подробнее');
                    setTimeout(function(){
                        currentReviewBlock.css('max-height','');
                        currentReviewBlock.css('height','');
                    }, 300);
                } else {
                    currentDescrBlockHeight = currentReviewBlock.height();
                    currentReviewBlock.height(currentDescrBlockHeight);
                    currentReviewBlock.height(descriptionHeight + 20);
                    currentReviewBlock.css('max-height','initial');
                    $(this).text('скрыть');
                }
                console.log(currentDescrBlockHeight);
                descriptionIsShow = !descriptionIsShow;
            });
        }
    } // reviewShowMoreBtn JQ
    function initFilter() {
        const widgetFilterSpareParts = new UserFilter('userFilterSpareParts', 'Все');
        widgetFilterSpareParts.init();
        const widgetFilterManufacturer = new UserFilter('userFilterManufacturer', 'Все');
        widgetFilterManufacturer.init();
        const widgetFilterCarBrandName = new UserFilter('userFilterCarBrandName', 'Выберите марку авто', 'userFilterCarModel');
        widgetFilterCarBrandName.init();
        const widgetFilterCarModel = new UserFilter('userFilterCarModel', 'Выберите модель авто', 'userFilterCarGeneration');
        widgetFilterCarModel.init();
        const widgetFilterCarGeneration = new UserFilter('userFilterCarGeneration', 'Выберите поколение авто');
        widgetFilterCarGeneration.init();
    } // initFilter JQ
    // ==========================================================

    // rating & spareParts page function ------------------------
    function responsiveHeaderBlock() {
        const pageHeaderBlock = $('.pageHeaderBlock-sparePartsBrands');
        if (pageHeaderBlock.length) {
            const thumbnail = $('#sparePartsPageHeaderImg');
            const content = $('.pageHeaderBlock__content');
            const blockTitle = $('.h1Title.blockTitle');

            if (window.matchMedia('(max-width: 1100px)').matches) {
                thumbnail.append(blockTitle);
            }

            window.addEventListener('resize', function(){
                if (window.matchMedia('(max-width: 1100px)').matches) {
                    thumbnail.append(blockTitle);
                } else {
                    content.prepend(blockTitle);
                }
            });
        }
    } // replacePageHeaderBlockImgOfResponsive JQ
    // ==========================================================

    // model-spareParts page function ----------------------------
    function otherSparePartsToggle() {
        let showMoreBtn = $('#otherSparePartsToggle');
        if ( showMoreBtn.length ) {
            const listWrap = showMoreBtn.parent().find('.listWrap');
            const listBlock = showMoreBtn.parent().find('.otherSpareParts__items');
            const listWrapHeight = listWrap.innerHeight();
            const listBlockHeight = listBlock.innerHeight();
            let isOpen = false;
            showMoreBtn.click(function () {
                if ( !isOpen ) {
                    isOpen = !isOpen;
                    listWrap.innerHeight(listBlockHeight);
                    $(this).text('Скрыть');
                } else {
                    isOpen = !isOpen;
                    listWrap.innerHeight(listWrapHeight);
                    $(this).text('Показать еще');
                }
            });
        }
    } // otherSparePartsToggle JQ
    function responceReplaceWidgetInterestingTheme() {
        const reviewBlock = $('#modelPartsPageReviewBlock');
        if (reviewBlock.length) {
            const otherSparePartsBlock = $('#otherSparePartsBlock');
            const reviewBlockWidgetsArea = reviewBlock.find('.widgetsArea');
            const widgetInterestingTopics = reviewBlockWidgetsArea.find('.widget-interestingTopics');
            const otherSparePartsBlockWidgetsArea = otherSparePartsBlock.find('.widgetsArea');

            if ( window.matchMedia('(max-width: 1000px)').matches ) {
                otherSparePartsBlockWidgetsArea.append(widgetInterestingTopics);
            }
            window.addEventListener('resize', function(){
                if (window.matchMedia('(max-width: 1000px)').matches) {
                    otherSparePartsBlockWidgetsArea.append(widgetInterestingTopics);
                } else {
                    reviewBlockWidgetsArea.append(widgetInterestingTopics);
                }
            });
        }
    } // responceReplaceWidgetInterestingTheme JQ
    // ===========================================================

    // model page function ---------------------------------------
    function responceReplaceWidget() {
        const reviewBlock = $('#modelPageReviewBlock');
        if (reviewBlock.length) {
            const otherSparePartsBlock = $('#otherSparePartsBlock');
            const reviewBlockWidgetsArea = reviewBlock.find('.widgetsArea');
            const widgetInterestingTopics = reviewBlockWidgetsArea.find('.widget-filter');
            const otherSparePartsBlockWidgetsArea = otherSparePartsBlock.find('.widgetsArea');

            if ( window.matchMedia('(max-width: 1170px)').matches ) {
                otherSparePartsBlockWidgetsArea.append(widgetInterestingTopics);
            }
            window.addEventListener('resize', function(){
                if (window.matchMedia('(max-width: 1170px)').matches) {
                    otherSparePartsBlockWidgetsArea.append(widgetInterestingTopics);
                } else {
                    reviewBlockWidgetsArea.append(widgetInterestingTopics);
                }
            });
        }
    } // responceReplaceWidget JQ
    // ===========================================================

    // car-brand page function -----------------------------------
    function toggleSparePartsList() {
        const popularModels = $('#popularModels');
        const sparePartsContainerHeight = 104;
        if ( popularModels.length ) {
            const showAllBtn = popularModels.find('.showMoreBtn');
            showAllBtn.click(function(){
                const currentBtn = $(this);
                let isShow = $(this).attr('data-show');
                isShow = ( isShow === 'true' );
                console.log(isShow);
                let currentList = $(this).parent();
                let currentListItems = currentList.find('.innerContent__item');
                const sparePartsContainer = currentList.find('.innerContent');
                const sparePartsList = sparePartsContainer.find('.innerContent__list');
                let sparePartsListHeight;

                if ( !isShow) {
                    isShow = !isShow;
                    currentBtn.attr('data-show', isShow);
                    if ( currentListItems.length > 3 ) {
                        for ( let i = 2; i < currentListItems.length; i++) {
                            currentListItems.eq(i).removeClass('innerContent__item-hide');
                        }
                        setTimeout(function() {
                            sparePartsListHeight = sparePartsList.innerHeight();
                            sparePartsContainer.css('max-height',sparePartsListHeight);
                        }, 100);
                    }
                } else {
                    isShow = !isShow;
                    currentBtn.attr('data-show', isShow);
                    sparePartsContainer.css('max-height',sparePartsContainerHeight);
                    if ( currentListItems.length > 3 ) {
                        setTimeout(function() {
                            for ( let i = 3; i < currentListItems.length; i++) {
                                currentListItems.eq(i).addClass('innerContent__item-hide');
                            }
                        }, 300);
                    }
                }
            });
        }
    } // toggleSparePartsList JQ
    function responceCarBrandPage() {
        const carBrandPageReviewBlock = $('#carBrandPageReviewBlock');
        const filterWidget = $('.widget-filter');
        const activityTapeWidget = $('.widget-activityTape');
        let responceTempBlock;
        if ( carBrandPageReviewBlock.length ) {
            if ( window.matchMedia('(max-width: 1170px)').matches ) {
                responceTempBlock = $('#responceTempBlock');
                if (!responceTempBlock.length){
                    carBrandPageReviewBlock.before('<aside class="widgetsArea" id="responceTempBlock"></aside>');
                }
                responceTempBlock = $('#responceTempBlock');
                responceTempBlock.append(filterWidget);
                responceTempBlock.append(activityTapeWidget);
            }
            window.addEventListener('resize', function(){
                if (window.matchMedia('(max-width: 1170px)').matches) {
                    responceTempBlock = $('#responceTempBlock');
                    if (!responceTempBlock.length){
                        carBrandPageReviewBlock.before('<aside class="widgetsArea" id="responceTempBlock"></aside>');
                    }
                    responceTempBlock = $('#responceTempBlock');
                    responceTempBlock.append(filterWidget);
                    responceTempBlock.append(activityTapeWidget);
                } else {
                    carBrandPageReviewBlock.find('.widgetsArea').prepend(activityTapeWidget);
                    carBrandPageReviewBlock.find('.widgetsArea').prepend(filterWidget);
                    if ( responceTempBlock ) {
                        responceTempBlock.remove();
                    }
                }
            });
        }
    } // responceCarBrandPage JQ
    // ===========================================================

// secondary functions -------------------------------------------

    // class UserFilter
    // To get the value of the selected field
    // You need to refer to the field - selectedValue
    // example: let myFilter = new UserFilter('carBrand');
    // myFilter.selectedValue;
    function UserFilter(filterId, defaultValue = '', dependenceElemId = '') {
        let that = this;
        this.filterId = filterId;
        this.selectedValue = defaultValue;
        this.dependeceElemId = dependenceElemId;
        this.filter = $('#' + this.filterId);
        this.filterHeader = this.filter.find('.userFilter__header');
        this.filterIsOpen = false;
        this.filterInput = this.filter.find('.inputFilter input');

        this.init = function () {
            this.filterHeader.find('.innerText').text(this.selectedValue);
            this.filterHeader.click(() => {
                if (!this.filterIsOpen) {
                    this.open();
                } else {
                    this.close();
                }
            });
            this.filtration();
            this.selected();
        };

        this.open = function () {
            this.filter.find('.userFilter__content').slideDown();
            this.filterIsOpen = true;
        };
        this.close = function () {
            this.filter.find('.userFilter__content').slideUp();
            this.filterIsOpen = false;
        };
        this.filtration = function () {
            let filterOptions = this.filter.find('.filterOptions');
            let itemList = this.filter.find('.filterOptions__item');
            this.filterInput.on('input', function () {
                itemList.hide();
                let inputValue = $(this).val().toUpperCase();
                if (!inputValue) {
                    itemList.show();
                } else {
                    itemList.each(function (index) {
                        let currentItemName = $(this).text().toUpperCase();
                        if (currentItemName.indexOf(inputValue) !== -1) {
                            $(this).show();
                        }
                    });
                }
            });
        };
        this.selected = function () {
            let filterOptionItem = this.filter.find('.filterOptions__item');
            filterOptionItem.click(function () {
                filterOptionItem.removeClass('filterOptions__item-selected');
                filterOptionItem.removeAttr('selected');
                let itemValue = $(this).text();
                $(this).addClass('filterOptions__item-selected');
                $(this).attr('selected', 'selected');
                $(this).parent().parent().parent().find('.userFilter__header .innerText').text(itemValue);
                $(this).parent().parent().parent().addClass('userFilter-selected');
                $(this).parent().parent().parent().attr('selected', 'selected');
                that.selectedValue = itemValue;
                if (that.dependeceElemId) {
                    $('#' + that.dependeceElemId).parent().show();
                }
                that.close();
            });
        }
    } // UserFilter JQ

    class DOMAnimation {
        /**
         * hide element
         * @param {HTMLElement} element
         * @param {Number} duration
         */
        static slideUp(element, duration = 500) {
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
            window.setTimeout(function () {
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
        static slideDown(element, duration = 500) {
            element.style.removeProperty('display');
            let display = window.getComputedStyle(element).display;
            if (display === 'none') display = 'block';
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
            window.setTimeout(function () {
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
        static slideToggle(element, duration = 500) {
            let display = getComputedStyle(element).display;
            if (display === 'none') {
                this.slideDown(element, duration);
            } else {
                this.slideUp(element, duration);
            }
        }
    }

    function scrollTo(idElement, speed = 50) {
        const scrollElement = document.querySelector(idElement);
        let posElem = scrollElement.getBoundingClientRect().top + pageYOffset;
        let currentPos = pageYOffset;
        let scr = setInterval(function () {
            if (currentPos > posElem) {
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

    function clickPastWindow(id, callback) {
        const targetWindow = document.querySelector('#' + id);
        document.addEventListener('mouseup', function (e) {
            if (!targetWindow.contains(e.target)) {
                if (callback) {
                    callback();
                }
            }
        });
    } // clickPastWindow

    function showPopUpWindow(id) {
        const popUpWindowBlock = $(id);
        popUpWindowBlock.show(300);
    } // showPopUpWindow JQ

    function closePopUpWindow() {
        const closeBtn = $('.closeBtn-modalWindow');

        closeBtn.on('click', function () {
            const popUpWindowBlock = $(this).parent().parent();
            popUpWindowBlock.hide(300);
        });
    } // closePopUpWindow JQ


// sliders -------------------------------------------------------
    function sliderSpareParts() {
    }
});
