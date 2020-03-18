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

    let result = {
        paymentSystem: null,
        bankInfo: null,
    }

    result.paymentSystem = getPaymentSystem(config.PAN);
    if (result.paymentSystem.type) {
        config.paymentSystemLogo.style.backgroundImage = `url(${config.addToPath}${result.paymentSystem.logoName})`;
    } else {
        config.paymentSystemLogo.style.backgroundImage = 'none';
    }

    result.bankInfo = getBankInfo(config.PAN);
    if (result.bankInfo) {
        config.bankLogo.style.backgroundImage = `url(${config.addToPath}${result.bankInfo.logoName})`;
        config.elemFrontCard.style.backgroundColor = `${result.bankInfo.bgColor}`;
    } else {
        config.bankLogo.style.backgroundImage = '';
        config.elemFrontCard.style.backgroundColor = '';
    }
    // if (config.PAN && config.PAN.toString().length === 6) {
    //     console.log('Bank Info', getBankInfo(config.PAN), config.PAN);
        
        
    // }

    

    console.log('SHOWCARD', result);
}

module.exports = showCardInfo;