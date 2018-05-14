$(document).ready(function () {
    var burgerMenu = $('.burgerMenu');
    
    // нажатие на бургер меню ----------
    burgerMenu.click(function () {
        // $('.burgerMenu__menu').toggleClass('burgerMenu__menu_visible');
        $('.burgerMenu__menu').slideToggle();
    });
    //==================================
    
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

    // вывод календаря на главной странице
    var events = [
        {
            "date": "2018-05-15 13:24:05",
            "type": "meeting",
            "title": "Test Last Year",
            "description": "Lorem Ipsum dolor set",
            "url": "http://www.event3.com/"
        },
        {
            "date": "2018-06-25 13:24:05",
            "type": "meeting",
            "title": "Test Last Year",
            "description": "Lorem Ipsum dolor set",
            "url": "http://www.event3.com/"
        },
        {
            "date": "2018-05-18 13:24:05",
            "type": "meeting",
            "title": "Test Last Year",
            "description": "Lorem Ipsum dolor set",
            "url": "http://www.event3.com/"
        }
    ];
    $('#eventCalendar').eventCalendar({
        jsonData: events,
        jsonDateFormat: 'human',
        locales: {
            locale: "ru",
            txt_noEvents: "Нет запланированных событий",
            txt_SpecificEvents_prev: "",
            txt_SpecificEvents_after: "события:",
            txt_next: "следующее",
            txt_prev: "предыдущее",
            txt_NextEvents: "следующие события:",
            txt_GoToEventUrl: "смотреть",
            moment: {
                "months" : [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
                "monthsShort" : [ "Янв", "Фев", "Мрт", "Апр", "Май", "Июн",
                    "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
                "weekdays" : [ "Воскресенье","Понедельник","Вторник","Среда",
                    "Четверг","Пятница","Субота" ],
                "weekdaysShort" : [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
                "weekdaysMin" : [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ]
            }
        }
    });
    // ===================================

});