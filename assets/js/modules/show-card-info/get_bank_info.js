let alfa = require('../../banks/ru-alfa.json');
let open = require('../../banks/ru-open.json');
let sberbank = require('../../banks/ru-sberbank.json');
let tinkoff = require('../../banks/ru-tinkoff.json');

let banks = {
    alfa,
    open,
    sberbank,
    tinkoff
}

function getBankInfo(PAN) {
    PAN = PAN.toString().slice(0, 6);
    for(let bank in banks) {
        if (banks.hasOwnProperty(bank)) {
            let bankInfo = banks[bank];
            for(let i = 0; i < bankInfo.prefixes.length; i++) {
                if (+bankInfo.prefixes[i] === +PAN) {
                    return {
                        bankName: bankInfo.name,
                        bgColor: bankInfo.backgroundColor,
                        logoName: bankInfo.logoName
                    }
                }
            }
        }
    }
}

module.exports = getBankInfo;