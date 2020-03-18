let elems = {};

// Форма
elems.formMain = document.getElementById('card_details');
elems.inputCardNumber = document.querySelector('[name="card_number"]');
elems.inputCardExpiredMonth = document.querySelector('[name="card_expired_month"]');
elems.inputCardExpiredYear = document.querySelector('[name="card_expired_year"]');
elems.inputCardCvc = document.querySelector('[name="card_cvc"]');
elems.inputSaveCard = document.querySelector('[name="save_card"]');
elems.inputEmail = document.querySelector('[name="email"]');
elems.inputCardIdp = document.querySelector('[name="card_idp"]');
elems.inputSubtotalP = document.querySelector('[name="subtotal_p"]');
elems.inputCustomerIdp = document.querySelector('[name="customer_idp"]');
elems.inputPaymentSystem = document.querySelector('[name="payment_system"]');
elems.inputOrderIdp = document.querySelector('[name="order_idp"]');

// Элемент для заполнения зарегестрированными картами
elems.ulSavedCards = document.querySelector('.textfield__saved-cards');

module.exports = elems;