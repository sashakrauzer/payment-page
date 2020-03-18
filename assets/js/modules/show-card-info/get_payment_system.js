// https://en.wikipedia.org/wiki/Payment_card_PANber

let { inputPaymentSystem } = require('../vars');

const paymentSystems = {
    masterCard: {
        prefixes: [5,51,52,53,54,55],
        logoName: 'logo_masterc.svg'
    },
    maestro: {
        prefixes: [50,56,57,58,59,60,61,62,63,64,65,66,67,68,69],
        logoName: 'logo_maestro.svg'
    },
    visa: {
        prefixes: [4],
        logoName: 'logo_visa.svg'
    },
    mir: {
        prefixes: [2200,2201,2202,2203,2204],
        logoName: 'logo_mir.svg'
    }
}

function getPaymentSystem(PAN) {
    inputPaymentSystem.value = '';
    PAN = PAN.toString().slice(0, 4);
    let info = {
        type: null,
        logoName: null
    };

    if (!PAN) return info;
    // Сравниваем PAN карты, начиная с первой цифры, и постепенно прибавляем по одной цифре.
    // Т.е. если передано 5678, берем 5 и сравниваем со всем списком. Далее, берем 56 и также сравниваем.
    for (let i = 0; i < PAN.toString().length; i++) {
        for(let paymentSystem in paymentSystems) {
            if (paymentSystems.hasOwnProperty(paymentSystem)) {
                let systems = paymentSystems[paymentSystem];
                for (let j = 0, n = Number(PAN.toString().substring(0,i + 1)); j < systems.prefixes.length; j++) {
                    if (systems.prefixes[j] === n) {
                        info.type = paymentSystem;
                        info.logoName = systems.logoName;

                        // Сохраним платежную систему в скрытый инпут
                        inputPaymentSystem.value = paymentSystem;
                    }
                }
            }
        }
    }
    return info;
}

module.exports = getPaymentSystem;