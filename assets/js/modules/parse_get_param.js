let {
    inputSubtotalP,
    inputCustomerIdp,
    inputOrderIdp,
    inputEmail
} = require('./vars');


let paramList = document.location.search.slice(1).split('&');
let getParamObj = {};
paramList.forEach((elem) => {
    let arrFromString = elem.split('=');
    getParamObj[arrFromString[0]] = arrFromString[1];
});

for (let param in getParamObj) {
    if (getParamObj.hasOwnProperty(param)) {
        switch (param) {
            case 'subtotal_p':
                inputSubtotalP.value = getParamObj[param];
                break;
            case 'order_idp':
                inputOrderIdp.value = getParamObj[param];
                break;
            case 'customer_idp':
                inputCustomerIdp.value = getParamObj[param];
                break;
            case 'email':
                inputEmail.value = getParamObj[param];
                inputEmail.focus();
                inputEmail.disabled = true;
                break;
        }
    }
}

// module.exports = parseGetParam;