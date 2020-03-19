require('./modules/form-ui/form_ui');
require('./modules/hints');

// Парсим гет параметры, записываем их в скрытые инпуты
require('./modules/parse_get_param');

require('./modules/form-validate');

let { loadCards } = require('./modules/customer_cards');

let { 
    inputCardNumber, 
    inputCustomerIdp,
    ulSavedCards,
    inputOrderIdp,
    inputSubtotalP,
    inputSaveCard
} = require('./modules/vars');

let showCard =  require('./modules/show-card-info');
inputCardNumber.addEventListener('input', function(event) {
    let PAN = this.value.split(' ').join('')
    if (PAN.length <= 6) {
        showCard(PAN);
    } else if (event.inputType === 'deleteContentBackward') {
        showCard(PAN);
    }
});

// Проверяем наличие "зарегистрированных" карт по определенному ID
if (inputCustomerIdp.value) {
    loadCards(inputCustomerIdp.value, ulSavedCards);
} else {
    inputSaveCard.disabled = true;
}
if (inputOrderIdp.value) {
    document.getElementById('order_idp').textContent = inputOrderIdp.value;
}
if (inputSubtotalP.value) {
    document.getElementById('subtotal_p').textContent = inputSubtotalP.value;
}

// Затираем логирование на продакшене
switch(process.env.NODE_ENV) {
    case 'production':
        console.log = function() {};
        break;
    case 'development':
        console.log('DEV');
        break;
}