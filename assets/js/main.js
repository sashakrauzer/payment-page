require('./modules/form-ui/form_ui');
require('./modules/hints');

// Парсим гет параметры, записываем их в скрытые инпуты
require('./modules/parse_get_param');

let { loadCards } = require('./modules/customer_cards');

let { 
    inputCardNumber, 
    inputCustomerIdp,
    ulSavedCards,
    inputOrderIdp,
    inputSubtotalP
} = require('./modules/vars');



let validateForm =  require('./modules/form-validate');

let showCard =  require('./modules/show-card-info');

inputCardNumber.addEventListener('input', function(event) {
    let PAN = this.value.split(' ').join('')
    if (PAN.length <= 6) {
        showCard(PAN);
    } else if (event.inputType === 'deleteContentBackward') {
        showCard(PAN);
    }
});


validateForm();



// Проверяем наличие "зарегистрированных" карт по определенному ID
if (inputCustomerIdp.value) {
    loadCards(inputCustomerIdp.value, ulSavedCards);
}

if (inputOrderIdp.value) {
    document.getElementById('order_idp').textContent = inputOrderIdp.value;
}

if (inputSubtotalP.value) {
    document.getElementById('subtotal_p').textContent = inputSubtotalP.value;
}

