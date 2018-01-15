;
    var abonents = [
        {
            surname: 'Стеценко',
            name1: 'Дмитрий',
            name2: 'Владимирович',
            phoneNumber: '0664996446',
            eMail: 'work2010_1@mail.ru'
        },
        {
            surname: 'Стеценко',
            name1: 'Андрей',
            name2: 'Владимирович',
            phoneNumber: '0500234560',
            eMail: 'andrey@gmail.com'
        },
        {
            surname: 'Стеценко',
            name1: 'Вита',
            name2: 'Анатольевна',
            phoneNumber: '0956333560',
            eMail: 'vita@yandex.ru'
        }

    ];

    var buttonAdd = document.querySelector('.button-add');
    var buttonClear = document.getElementById('clear-search');
    var previousId;
    var activeItemsId  = 'abonent1';
    var foneButtonId = '#phone', openDataButtonId = '#open-data',
        editButtonId = '#edit', deleteButtonId = '#delete' ;
    var openData = false, buttonVisible = false;
    var openDataBtn;
    var createActiveItems;
    var activeItemIndex;
    var delBtn, editBtn;

// загружаем данные на страницу из массива abonents
    for (var i = 0; i < abonents.length; i++) {
        loadAbonents(i);
    }
    var items = document.querySelectorAll('.data-name');

// проход по списку абонентов, проверка на клик
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = activeItem;
    }
// обработка клика на кнопке clear
    buttonClear.onclick = clearInput;

// обработка клика по кнопке add
    buttonAdd.onclick = addElement;

// создание модального окна
    function createModalWindow (param) {
    // прверка какое окно строить new или edit
        var surname, name1, name2, phone, email;
        var heder;

        if(param === 'new') {
            heder = 'To add a new subscriber';
            surname = ''; name1 = ''; name2 = ''; phone = ''; email = '';
        }
        else {
            heder = 'Edit the data of the subscriber';
            surname = abonents[activeItemIndex-1].surname;
            name1 = abonents[activeItemIndex-1].name1;
            name2 = abonents[activeItemIndex-1].name2;
            phone = abonents[activeItemIndex-1].phoneNumber;
            email = abonents[activeItemIndex-1].eMail;
        }

        createElem(document.body, 'div', 'modal', 'modal', '');
        createElem(createActiveItems, 'div', 'data-window', 'data-window','');

        var dataWindow = createActiveItems;
        createElem(dataWindow, 'div', 'confirm-text', 'confirm-text',  heder);
        createElem(dataWindow, 'span', 'close', 'close', '');
        createActiveItems.innerHTML = '&times;';

    // создание инпутов
        createElem(dataWindow, 'div', 'wrapper-surname', 'search', '');
        var wrapperDivInput = createActiveItems;
        createElem(createActiveItems, 'p', 'description', 'description', 'input surname');
        createElem(wrapperDivInput, 'input', 'input-name1', 'input-area', '');
            createActiveItems.type = 'text';
            createActiveItems.value = surname;
            createActiveItems.setAttribute('maxlength', '19');
        createElem(wrapperDivInput, 'div', 'clear-surname','clear-search','clear');

        createElem(dataWindow, 'div', 'wrapper-name1', 'search', '');
        wrapperDivInput = createActiveItems;
        createElem(createActiveItems, 'p', 'description', 'description', 'input name1');
        createElem(wrapperDivInput, 'input', 'input-name1', 'input-area', '');
            createActiveItems.type = 'text';
            createActiveItems.value = name1;
            createActiveItems.setAttribute('maxlength', '19');
        createElem(wrapperDivInput, 'div', 'clear-name1','clear-search','clear');

        createElem(dataWindow, 'div', 'wrapper-name2', 'search', '');
        wrapperDivInput = createActiveItems;
        createElem(createActiveItems, 'p', 'description', 'description', 'input name2');
        createElem(wrapperDivInput, 'input', 'input-name2', 'input-area', '');
            createActiveItems.type = 'text';
            createActiveItems.value = name2;
            createActiveItems.setAttribute('maxlength', '19');
        createElem(wrapperDivInput, 'div', 'clear-name2','clear-search','clear');

        createElem(dataWindow, 'div', 'wrapper-phone', 'search', '');
        wrapperDivInput = createActiveItems;
        createElem(createActiveItems, 'p', 'description', 'description', 'input phone number ( digit only )');
        createElem(wrapperDivInput, 'input', 'input-phone', 'input-area', '');
            createActiveItems.type = 'text';
            createActiveItems.value = phone;
            createActiveItems.setAttribute('maxlength', '19');
            createActiveItems.onkeypress = inputDigit;
        createElem(wrapperDivInput, 'div', 'clear-phone','clear-search','clear');

        createElem(dataWindow, 'div', 'wrapper-email', 'search', '');
        wrapperDivInput = createActiveItems;
        createElem(createActiveItems, 'p', 'description','description', 'input e-mail ( ####@###.### )');
        createElem(wrapperDivInput, 'input', 'input-phone', 'input-area', '');
            createActiveItems.type = 'text';
            createActiveItems.value = email;
            createActiveItems.setAttribute('maxlength', '19');
        createElem(wrapperDivInput, 'div', 'clear-email','clear-search','clear');

    // создание кнопок
        createElem(dataWindow, 'div', 'confirm-button', 'confirm-button', '');
        var confirmButton = createActiveItems;
        createElem(confirmButton, 'div', 'button-yes', 'confirm-btn', 'Ok');
        createElem(confirmButton, 'div', 'button-res', 'confirm-btn', 'Reset');
        createElem(confirmButton, 'div', 'button-no', 'confirm-btn', 'Cancel');

        var buttonNo = document.getElementById('button-no');
        buttonNo.onclick = close;

        var closeBtn = document.getElementById('close');
        closeBtn.onclick = close;

        var buttonYes = document.getElementById('button-yes');

        buttonYes.onclick = function() {
            close();
            createAbonent();
        };

        var buttonRes = document.getElementById('button-res');
        buttonRes.onclick = resetData;
    }

//Добавление нового элемента
    function addElement(){
        createModalWindow('new');
    }

//Редактирование элемента
    function editElement(){
        createModalWindow('edit');
    }
//создание нового абонента
    function createAbonent(){
        alert('create abonent');
    }

// очистка полей ввода
    function resetData(){
        var inputCollection = this.parentNode.parentNode.querySelectorAll('.input-area');
        for (var i = 0; i < inputCollection.length; i++) {
            inputCollection[i].value = '';
        }
    }

// Функция загрузки абонентов из массива
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
            editBtn = button1;

            var button2 = document.createElement('div');
            button2.className = 'button';
            button2.id = deleteButtonId;
            delBtn = button2;

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

            //обрабатываем нажатие на edit
            editBtn.onclick = editElement;

            // обрабатываем нажатие на дел
            delBtn.onclick = pressDelButton;

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

// обработка нажатия на кнопку удалить контакт.
    function pressDelButton(){
        createElem(document.body, 'div', 'modal', 'modal', '');
        createElem(createActiveItems, 'div', 'confirm', 'confirm', '');

        var confirmWindow = createActiveItems;
        createElem(confirmWindow, 'div', 'confirm-text', 'confirm-text', 'Are you sure, what you want to remove this element?');
        createElem(confirmWindow, 'span', 'close', 'close', '');
        createActiveItems.innerHTML = '&times;';

        createElem(confirmWindow, 'div', 'confirm-button', 'confirm-button', '');
        var confirmButton = createActiveItems;
        createElem(confirmButton, 'div', 'button-yes', 'confirm-btn', 'Yes');
        createElem(confirmButton, 'div', 'button-no', 'confirm-btn', 'No');

        var buttonNo = document.getElementById('button-no');
        buttonNo.onclick = close;

        var closeBtn = document.getElementById('close');
        closeBtn.onclick = close;

        var buttonYes = document.getElementById('button-yes');
        buttonYes.onclick = function() {
            close();
            removeAbonets();
        }
    }
// очищает поле ввода
    function clearInput(){
        var inputArea = this.parentNode.querySelector('.input-area');
        console.log(inputArea);
        inputArea.value = '';
    }
// закрывает модальное окно
    function close() {
        var modal = document.getElementById('modal');
        modal.remove();
    }

    function removeAbonets() {
        var activeElem = document.getElementById(activeItemsId);
        var dataField = document.getElementsByClassName('data-field')[0];
        activeElem.remove();
        dataField.remove();
        abonents.splice(activeItemIndex-1, 1);

        openData = false;
        buttonVisible = false;

        activeItemsId = 'abonent1';
        items = document.querySelectorAll('.data-name');
        for (var i = 0; i < items.length; i++) {
            items[i].onclick = activeItem;
            items[i].parentNode.setAttribute('id', 'abonent' + (i + 1));
        }

    }

// Функция разрешающая вводить только цифры
    function inputDigit(e) {

        e = e || event;
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        var chr = getChar(e);
        if (chr == null) return;

        if (chr < '0' || chr > '9') {
            return false;
         }
    }
    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode) // IE
        }

        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which) // остальные
        }

        return null; // специальная клавиша
}