let getBankInfo = require('./get_bank_info');
let getPaymentSystem = require('./get_payment_system');

let paymentSystemLogo = document.querySelector('#payment-system-logo');
let bankLogo = document.querySelector('#bank-logo');
let elemFrontCard = document.querySelector('#card-front');

let config = {
    PAN: null,
    paymentSystemLogo, // Элемент для отображения иконки платежной системы
    bankLogo, // Элемент для отображения логотипа банка карты
    elemFrontCard, // Лицевая сторона карты, для смены бэкграунда
    addToPath: 'img/'
}

function showCardInfo(PAN) {
    // Используем две вспомогательные функции getPaymentSystem и getBankInfo 
    // для получения нужных данных и стилизуем форму
    config.PAN = PAN;

    let paymentSystem = {};
    let bankInfo = {};

    paymentSystem = getPaymentSystem(config.PAN);
    if (paymentSystem.type) {
        config.paymentSystemLogo.style.backgroundImage = `url(${config.addToPath}${paymentSystem.logoName})`;
    } else {
        config.paymentSystemLogo.style.backgroundImage = 'none';
    }

    bankInfo = getBankInfo(config.PAN);
    if (bankInfo) {
        config.bankLogo.style.backgroundImage = `url(${config.addToPath}${bankInfo.logoName})`;
        config.elemFrontCard.style.backgroundColor = `${bankInfo.bgColor}`;
    } else {
        config.bankLogo.style.backgroundImage = '';
        config.elemFrontCard.style.backgroundColor = '';
    }

}

module.exports = showCardInfo;