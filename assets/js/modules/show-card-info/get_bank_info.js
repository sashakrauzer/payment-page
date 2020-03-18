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
    // Получаем первые шесть цифр
    PAN = PAN.toString().slice(0, 6);
    // И ищем совпадения с префиксами банков
    for(let bank in banks) {
        if (banks.hasOwnProperty(bank)) {
            let bankInfo = banks[bank];
            for(let i = 0; i < bankInfo.prefixes.length; i++) {
                if (+bankInfo.prefixes[i] === +PAN) {
                    // Если совпадение нашли, возвращаем новый объект 
                    // с банковскими данными, которые понадобятся
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