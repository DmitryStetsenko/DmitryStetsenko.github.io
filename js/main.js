$(document).ready(function() {
    $('.burger-menu, .burger-menu-items').click(function () {
        var coord =  $('.burger-menu').offset();
        var activeMenu = $('.burger-menu-items');
        console.log(coord);
        // var coordTop = coord.top;
        // var coordLeft = coord.left;
        // activeMenu.offset({top: coordTop, left: coordLeft});
        activeMenu.toggleClass('menu-active');
    });
    $(document).click(function (event) {
        if ($(event.target).closest('.burger-menu').length) return;
        $('.burger-menu-items').removeClass('menu-active');
        event.stopPropagation();
    })
});
