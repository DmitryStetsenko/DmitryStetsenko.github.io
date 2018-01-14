;
    var abonents = [
        {
            surname: 'Стеценко',
            name1: 'Дмитрий',
            name2: 'Владимирович',
            phoneNumber: '066-499-64-46',
            eMail: 'work2010_1@mail.ru'
        },
        {
            surname: 'Стеценко',
            name1: 'Андрей',
            name2: 'Владимирович',
            phoneNumber: '050-023-45-60',
            eMail: 'andrey@gmail.com'
        },
        {
            surname: 'Стеценко',
            name1: 'Вита',
            name2: 'Анатольевна',
            phoneNumber: '095-633-35-60',
            eMail: 'vita@yandex.ru'
        }

    ];

    var buttonAdd = document.querySelector('.button-add');
    var previousId;
    var activeItemsId  = 'abonent1';
    var foneButtonId = '#phone', openDataButtonId = '#open-data',
        editButtonId = '#edit', deleteButtonId = '#delete' ;
    var openData = false, buttonVisible = false;
    var openDataBtn;
    var counter = 0;
    var createActiveItems;
    var activeItemIndex;

// загружаем данные на страницу из массива abonents
    for (var i = 0; i < abonents.length; i++) {
        loadAbonents(i);
    }
    var items = document.querySelectorAll('.data-name');

// проход по списку абонентов, проверка на клик
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = activeItem;
    }


// добавляем новый элемент
//     buttonAdd.onclick = function() {
//         addElement(counter);
//         counter++;
//     };

// Функция загрузки абоннтов из массива
    function loadAbonents(counter){
        var fullName = abonents[counter].surname + ' ' + abonents[counter].name1 + ' ' + abonents[counter].name2;
        var parent = document.querySelector('.wrapper');

        var contacts = document.createElement('div');
            contacts.className = 'contacts';
            contacts.id = 'abonent'+(counter * 1 + 1);
            parent.appendChild(contacts);

        var dataName = document.createElement('div');
            dataName.className = 'data-name';
            dataName.innerText = fullName;
            contacts.appendChild(dataName);
    }

//Обработчик событий по клику на контакт
    function activeItem(){
        previousId = '#' + activeItemsId;
        var previousItem = document.querySelector(previousId);
        var dataName = document.querySelector('.data-name');

        if (previousItem.classList.contains('active')){
            previousItem.classList.remove('active');
        }
        this.parentNode.classList.toggle('active');

        if (!this.classList.contains('data-name-active')){
            this.classList.add('data-name-active');
        }

        previousItem.firstChild.classList.remove('data-name-active'); //width: 250px;

        activeItemsId = this.parentNode.id;

        showButton(foneButtonId, openDataButtonId);
        // обррабатываем клик по кнопке (стрелка вниз) если она видна
        if (buttonVisible) {
            openDataBtn = document.getElementById('#open-data');
            openDataBtn.onclick = openDataButton;
        }
        console.log(this);
    }

// Добавляем контакту кнопки позвонить и открытие
    function showButton(idButton1,idButton2){
        if (buttonVisible) {
            var delElem = document.querySelector('.actions'); //удаляем кнопки звонка и открытия с предыдущего поля
                delElem.remove();
        }
        if (openData) { //удаляем поле данных (если оно открыто) openData == true
            delElem = document.querySelector('.data-field');
            delElem.remove();
            openData = false;
        }
        // -------- добавляем элементы кнопок по ----------------
        var activeElem = document.querySelector('#' + activeItemsId);
        var actions = document.createElement('div');
            actions.className = 'actions';

        var button1 = document.createElement('div');
            button1.className = 'button';
            button1.id = idButton1;

        var button2 = document.createElement('div');
            button2.className = 'button';
            button2.id = idButton2;

        var button1Icon = document.createElement('i');
            button1Icon.className = 'fa fa-phone';
            button1Icon.setAttribute('aria-hidden', 'true');

        var button2Icon = document.createElement('i');
            button2Icon.className = 'fa fa-angle-down';
            button2Icon.setAttribute('aria-hidden', 'true');

        activeElem.appendChild(actions);
        actions.appendChild(button1);
        actions.appendChild(button2);
        button1.appendChild(button1Icon);
        button2.appendChild(button2Icon);

        buttonVisible = true;
    }
// обработчик по клику на кнопку (стрелочка вниз) open-data с данными телефон и e-mail
    function openDataButton() {
        idToInt(activeItemsId);
        this.classList.toggle('rotate');

        if (!openData) {
            var dataField = document.createElement('div');
                dataField.className = 'data-field';
                insertAfter(dataField, '#' + activeItemsId);

            createElem(dataField, 'div', 'triangle', 'triangle', '');

            createElem(dataField, 'div', 'icons', 'icons', '');
            createElem(createActiveItems, 'i', 'fa-phone', 'fa fa-phone', '');
            createActiveItems.setAttribute('aria-hidden', 'true');
            createElem(createActiveItems.parentNode, 'i', 'fa-envelope-o', 'fa fa-envelope-o', '');
            createActiveItems.parentNode.setAttribute('aria-hidden', 'true');

            createElem(dataField, 'div', 'data-contacts', 'data-contacts', '');
            createElem(createActiveItems, 'p', 'telephone', 'telephone', abonents[activeItemIndex-1].phoneNumber);
            createElem(createActiveItems.parentNode, 'p', 'email', 'email', abonents[activeItemIndex-1].eMail);

            createElem(dataField, 'div', 'actions', 'actions', '');

            var button1 = document.createElement('div');
            button1.className = 'button';
            button1.id = editButtonId;

            var button2 = document.createElement('div');
            button2.className = 'button';
            button2.id = deleteButtonId;

            var button1Icon = document.createElement('i');
            button1Icon.className = 'fa fa-pencil';
            button1Icon.setAttribute('aria-hidden', 'true');

            var button2Icon = document.createElement('i');
            button2Icon.className = 'fa fa-trash';
            button2Icon.setAttribute('aria-hidden', 'true');

            createActiveItems.appendChild(button1);
            createActiveItems.appendChild(button2);
            button1.appendChild(button1Icon);
            button2.appendChild(button2Icon);

            openData = true;
        }
        else {
            var delElem = document.querySelector('.data-field');
                delElem.remove();
                openData = false;
        }

    }

// Добавляем div id=elem после div id=refElem
    function insertAfter(elem, refElem) {
        var nextElem = document.querySelector(refElem);
        var parent = nextElem.parentNode;
        return nextElem.parentNode.insertBefore(elem, nextElem.nextSibling);
}

// создание елемента на странице (согласно параметров)
    function createElem(parentElem, elemTag, elemId, elemClass, elemText){
        var createItems = document.createElement(elemTag);
            createItems.id = elemId;
            createItems.className = elemClass;
            createItems.innerText = elemText;
            parentElem.appendChild(createItems);
        createActiveItems = createItems;
    }
// преобразовываем ID в число
    function idToInt(id){
        activeItemIndex = parseInt(id.substring(7));
    }