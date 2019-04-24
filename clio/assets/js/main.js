'use strict';
$(function() {
    const thickness05 = 205;
    const thickness07 = 265;

    slowScroll();
    costCalculator();



    function costCalculator() {
        const diameterElem = $('#diameter').find('.parametersBlock__item');
        const thicknessElem = $('#thickness').find('.parametersBlock__item');
        let params;

        params = calcInit();

        diameterElem.click(function(){
            params.diameter = clickCalcItem(diameterElem, $(this));
            showResult(params.diameter, params.thickness);
        });
        thicknessElem.click(function(){
            params.thickness = clickCalcItem(thicknessElem, $(this));
            showResult(params.diameter, params.thickness);
        });
    }

    // secondary function for calc -----------------------------
    function showResult(diameter, thickness) {
        const resultBlock = $('#totalValue');
        let coefficient;
        let value;

        coefficient = ( thickness === 0.5 ) ? thickness05 : thickness07;
        value = diameter / 10 * 3.14 / 100 * coefficient;

        resultBlock.text(value.toFixed(2));
    }
    function calcInit() {
        const diameter = parseFloat( $('#diameter').find('.parametersBlock__item').eq(0)
                                       .find('.innerValue').text() );
        const thickness = parseFloat ( $('#thickness').find('.parametersBlock__item').eq(0)
                                         .find('.innerValue').text() );
        const params = {
            diameter: diameter,
            thickness: thickness
        };

        showResult(diameter, thickness);

        return params;
    }
    function clickCalcItem(elems, currentElem) {
        elems.removeClass('parametersBlock__item-active');
        currentElem.addClass('parametersBlock__item-active');
        return parseFloat(currentElem.find('.innerValue').text());
    }
    // =========================================================
    function slowScroll() {
        const menuItem = $('.mainMenu__item a[href^="#"]');
        const costCalcBtn = $('#costCalcBtn');
        let myOffSet = 100;

        menuItem.click(function(){
            let id = $(this).attr('href');
            if ( id === '#contactUs' ) {
                myOffSet = -50;
            }
            $('html, body').animate({scrollTop: $(id).offset().top - myOffSet}, 1000);
            return false;
        });

        costCalcBtn.click(function(){
            let id = $(this).attr('href');
            if ( id === '#contactUs' ) {
                myOffSet = -50;
            }
            $('html, body').animate({scrollTop: $(id).offset().top - myOffSet}, 1000);
            return false;
        });

    }
});