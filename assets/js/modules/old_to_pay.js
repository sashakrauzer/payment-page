function toPay(form) {
    let formData = new FormData(form);
    let cardNumber = formData.get('card_number');
    let cardExpiredMonth = formData.get('card_expired_month');
    let saveCard = formData.get('save_card');
    // Если карту пожелали сохранить, то 
    if (saveCard) {

    }
    console.log('FormData', formData.get('card_number'), formData.get('card_expired_month'), formData.get('save_card'));
}

module.exports = toPay;