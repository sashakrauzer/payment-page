let getBankInfo = require('./get_bank_info');
let getPaymentSystem = require('./get_payment_system');

let paymentSystemLogo = document.querySelector('#payment-system-logo');
let bankLogo = document.querySelector('#bank-logo');
let elemFrontCard = document.querySelector('#card-front');

let config = {
    PAN: null,
    paymentSystemLogo,
    bankLogo,
    elemFrontCard,
    addToPath: '../img/'
}

function showCardInfo(PAN) {
    
    config.PAN = PAN;

    let paymentSystem = {};
    let bankInfo = {};

    // let result = {
    //     paymentSystem: null,
    //     bankInfo: null,
    // }

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
    // if (config.PAN && config.PAN.toString().length === 6) {
    //     console.log('Bank Info', getBankInfo(config.PAN), config.PAN);
        
        
    // }

    

    // console.log('SHOWCARD');
}

module.exports = showCardInfo;