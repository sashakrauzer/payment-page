let beautifyPAN = require('./form-validate/beautify_card_number');
let showCardInfo = require('./show-card-info');

let {
    inputCardExpiredMonth, 
    inputCardExpiredYear, 
    inputCardIdp,
    inputSaveCard,
    inputCardCvc
} = require('./vars');

// function getCards(customer_idp) {
//     return localStorage[customer_idp];
// }

// Регистрируем новую карту
function regCard(customer_idp, card_number, card_type) {
    let card_IDP;

    // Функция для создания маски из номера карты
    function getMaskFromPAN(PAN) {
        let length = PAN.length;
        let firstPart = PAN.slice(0, 6);
        let endPart = PAN.slice(-4);
        card_IDP = (+firstPart + +endPart).toString().slice(0, 4);
        let mask = firstPart + '*'.repeat(length - firstPart.length - endPart.length) + endPart;
        return mask;
    }

    let customerCards = localStorage[customer_idp];
    // Проверяем наличие уже зарегистрированных карта на данного покупателя
    if (customerCards) {
        let mask = getMaskFromPAN(card_number.split(' ').join(''));
        localStorage[customer_idp] += '; ' + mask + ' ' + card_type + ' ' + card_IDP;
    } else {
        let mask = getMaskFromPAN(card_number.split(' ').join(''));
        localStorage[customer_idp] = mask + ' ' + card_type + ' ' + card_IDP;
    }
}

function removeCard(card_IDP, customer_idp) {
    let cardList = localStorage[customer_idp].split('; ');
    cardList = cardList.filter((card) => {
        let arrFromString = card.split(' ');
        if (arrFromString[2] === card_IDP) {
            return false;
        } 
        return true;
    });
    localStorage[customer_idp] = cardList.join('; ');
}

function loadCards(customer_idp, elem) {
    if (localStorage[customer_idp]) {
        let cardList = localStorage[customer_idp].split('; ');
        cardList = cardList.filter((value, index, self) => { 
            return self.indexOf(value) === index;
        })

        cardList.forEach((card) => {
            let arrFromString = card.split(' ');
            let li = document.createElement('li');
            let mask = document.createElement('div');
            let cardType = document.createElement('div');
            let unregCard = document.createElement('div');
            li.id = arrFromString[2];

            li.addEventListener('mousedown', function() {
                let input = this.parentElement.parentElement.querySelector('input');

                inputCardIdp.value = arrFromString[2];
                inputCardExpiredMonth.value = '';
                inputCardExpiredMonth.focus();
                inputCardExpiredYear.value = '';
                inputCardExpiredYear.focus();
                inputCardExpiredMonth.disabled = true;
                inputCardExpiredYear.disabled = true;
                inputCardExpiredMonth.classList.forEach((className) => {
                    inputCardExpiredMonth.classList.remove(className);
                })
                inputCardExpiredYear.classList.forEach((className) => {
                    inputCardExpiredYear.classList.remove(className);
                })
                inputSaveCard.disabled = true;

                let mask = this.querySelector('.mask');
                input.value = mask.textContent;
                input.classList.add('input-mask');
                setTimeout(() => {
                    input.focus();
                    inputCardCvc.focus();
                }, 0);
                showCardInfo(arrFromString[0].slice(0,6));
            });

            unregCard.addEventListener('mousedown', function(event) {
                let li = this.parentElement;
                let ul = document.querySelector('.textfield__saved-cards');
                li.remove();
                // Если это была последняя карта, удаляем весь список
                if (!ul.innerHTML) {
                    ul.remove();
                }
                removeCard(li.id, customer_idp);
                event.stopPropagation();
            });

            mask.classList.add('mask');
            mask.textContent = beautifyPAN(arrFromString[0]);
            cardType.classList.add('type');
            cardType.classList.add(arrFromString[1]);
            unregCard.classList.add('unreg');
            li.appendChild(mask);
            li.appendChild(cardType);
            li.appendChild(unregCard);
            elem.appendChild(li);
        });
    }
}

module.exports = {
    regCard,
    loadCards
}