function add() {
    contact.innerHTML += '<li class="gray"></li>>';
}

var contact = document.getElementById('list');
var lists = contact.getElementsByTagName('li');

add();
