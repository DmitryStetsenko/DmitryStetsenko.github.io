$(document).ready(function () {
    // стилизуем select ----------------
    $('select').selecter();

    // подключение owl-caurusel --------
    $('.owl-carousel').owlCarousel({
        items: 1,
        autoplay : true,
        stopOnHover : true
    });
    // =================================

    // обработка ссылок сайдбара -------
        // Преподаватели ----------
    var teachers = $('.teachers');
    teachers.click(function (e) {
        // e.preventDefault();
        $(this).children('a').addClass('activeLink');
        $(this).children('.teachers__teacher').addClass('teachers__teacher_active');
    });
        // =========================

    // ===================================

});