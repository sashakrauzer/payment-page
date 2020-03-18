let moon = require('./moon_algorithm.js');
let card = require('../customer_cards');
let showCardInfo = require('../show-card-info');

let beautifyPAN = require('./beautify_card_number');

let { 
    formMain,
    inputCardNumber,
    inputCardExpiredMonth,
    inputCardExpiredYear,
    inputCardCvc,
    inputSaveCard,
    inputEmail,
    inputCardIdp,
    inputSubtotalP,
    inputCustomerIdp,
    inputPaymentSystem
} = require('../vars');

let patterns = {
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
}

let validateClassNames = {
    formValidClass: 'form-valid',
    formInvalidClass: 'form-invalid',
    inputInvalidClass: 'input-error-invalid',
    inputRequiredClass: 'input-error-required',
    inputErrorClass: 'input-error'
}

function dateCheck(month, year) {
    let date = new Date();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear().toString().slice(2);
    if (currentYear > +year.value) {
        year.classList.add(validateClassNames.inputInvalidClass);
        return false;
    } 
    if (currentYear.toString() === year.value) {
        if (currentMonth > +month.value) {
            month.classList.add(validateClassNames.inputInvalidClass);
            return false;
        }
    }
    return true;
}

// Функция для проверки полей
function inputCheck(elem) {
    if (elem.disabled) {
        return true;
    }
    if (elem.dataset.hasOwnProperty('required') && !elem.value) {
        elem.classList.add(validateClassNames.inputRequiredClass);
        return false;
    } 
    if (elem.dataset.hasOwnProperty('validator')) {
        let pattern;
        switch(elem.dataset.validator) {
            case 'regexp':
                pattern = new RegExp(patterns[elem.dataset.validatorPattern]);
                if (!elem.value.length || pattern.test(elem.value)) {
                    return true;
                } else {
                    elem.classList.add(validateClassNames.inputInvalidClass);
                    return false;
                }
            case 'function':
                if (elem.dataset.validatorFunc === 'moon') {
                    let newValue = elem.value.split(' ').join('');
                    if (newValue.length < 12 || newValue.length > 19) {
                        elem.classList.add(validateClassNames.inputInvalidClass);
                        return false;
                    } else if(moon(newValue)) {
                        // good
                        return true;
                    } else {
                        elem.classList.add(validateClassNames.inputInvalidClass);
                        return false;
                    }
                }
                break;
            case 'date':
                if (elem.dataset.validatorType === 'month') {
                    if (elem.value.length < 2 || elem.value.length > 2) {
                        elem.classList.add(validateClassNames.inputInvalidClass);
                        return false;
                    } else if (+elem.value > 12) {
                        elem.classList.add(validateClassNames.inputInvalidClass);
                        return false;
                    }
                    return true;
                } else if (elem.dataset.validatorType === 'year') {
                    if (elem.value.length < 2 || elem.value.length > 2) {
                        elem.classList.add(validateClassNames.inputInvalidClass);
                        return false;
                    } else if (+elem.value > 99) {
                        elem.classList.add(validateClassNames.inputInvalidClass);
                        return false;
                    }
                    return true;
                }
                break;
            case 'cvc':
                if (elem.value.length < 3 || elem.value.length > 4) {
                    elem.classList.add(validateClassNames.inputInvalidClass);
                    return false;
                }
                return true;
        }
    }

    return true;
}

let inputs = document.querySelectorAll('input');
inputs = Array.from(inputs);

formMain.addEventListener('blur', function(event) {
    let elem = event.target;
    let parent = elem.parentElement;
    if (elem.tagName === 'INPUT') {    
        if (elem.value) {
            if (!parent.classList.contains('textfield_not-empty')) {
                parent.classList.add('textfield_not-empty');
            }
        }      
        inputCheck(elem, validateClassNames.inputErrorClass);
    }
}, true);

formMain.addEventListener('focus', function(event) {
    let elem = event.target;

    if (elem.tagName === 'INPUT') {
        elem.classList.remove(validateClassNames.inputRequiredClass);
        elem.classList.remove(validateClassNames.inputInvalidClass);
    }
}, true);

formMain.addEventListener('input', function(event) {
    let elem = event.target;
    let type = event.inputType;
    let key = event.data;
    console.log('input', event, elem.value);

    if (type === 'insertText') {
        if (elem.dataset.type === 'number') {
            if (/[0-9]/.test(key)) {
                console.log('INSERT NUMBER');
                if (elem.dataset.hasOwnProperty('cardBeautify')) {
                    elem.value = beautifyPAN(elem.value);
                } else {
                    elem.value = elem.value;
                }
                
            } else {
                console.log('INSERT TEXT');
                let newValue = elem.value.slice(0, elem.value.length - 1);
                elem.value = newValue;
            }
        }
    }

    // Нажатие бэкспейса
    if (type === 'deleteContentBackward') {
        console.log('deleteContentBackward');
        // Если поле содержит выбранную карту
        if (elem.classList.contains('input-mask')) {
            elem.value = '';
            elem.classList.remove('input-mask');

            // Удаление карты

            inputCardIdp.value = '';
            
            inputCardExpiredMonth.disabled = false;
            inputCardExpiredYear.disabled = false;
            inputSaveCard.disabled = false;

            showCardInfo('000000');
        }
    }

    // ctrl + v
    if (type === 'insertFromPaste') {
        console.log('insertFromPaste');

        showCardInfo(elem.value);
        elem.value = beautifyPAN(elem.value);            
    }
});

formMain.addEventListener('submit', function(event) {
    event.preventDefault();

    let results = inputs.map(function(input) {
        return inputCheck(input, validateClassNames.inputErrorClass);
    });

    // Проверка даты
    if (!inputCardExpiredMonth.disabled && !inputCardExpiredYear.disabled) {
        results.push(dateCheck(inputCardExpiredMonth, inputCardExpiredYear, validateClassNames.inputErrorClass));
    }
    

    if (results.includes(false)) {
        // Поля невалидны
    } else {
        let btnSubmit = document.getElementById('submit');
        btnSubmit.classList.add('ripple-btn-wrap_loading')

        let cardNumber = inputCardNumber.value;
        let subtotal_p = inputSubtotalP.value;
        let customer_idp = inputCustomerIdp.value;
        let cardType = inputPaymentSystem.value;

        inputs.forEach((input) => {
            input.disabled = true;
        });
        // Эмуляция отправки формы
        let toPay = new Promise((resolve, reject) => {
            setTimeout(() => {
                // Сверяем номер карты с картой для неуспешной оплаты
                if (cardNumber.split(' ').join('') === '4000000000002479') {
                    reject('error PAN');
                } else {
                    // Если выбрали сохранить карту
                    if (inputSaveCard.checked && customer_idp) {
                        card.regCard(customer_idp, cardNumber, cardType);
                        // console.log('Сохраняем карту');
                    }
                    
                    // Данные валидны, отвечаем успехом
                    resolve('success');
                }
            }, 5000);
        });

        toPay.
            then((data) => {
                // console.log('Resolve', data);
                let date = new Date();
                let successDateDate = document.querySelector('.success__date span:first-child');
                successDateDate.textContent = date.toLocaleDateString();
                let successDateTime = document.querySelector('.success__date span:last-child');
                successDateTime.textContent = date.toLocaleTimeString();
                let successSubtotalP = document.querySelector('.success__subtotal-p span');
                successSubtotalP.textContent = subtotal_p;
                let successCardMask = document.querySelector('.success__card-mask span');
                successCardMask.textContent = cardNumber;
                document.body.classList.add('success');
            }).
            catch((error) => {
                // console.log('Reject', error);
                document.body.classList.add('error');
            })
    }
});