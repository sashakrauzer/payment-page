function beautifyPAN(card_number) {
    card_number = card_number.split(' ').join('');
    let listOfString = card_number.match(/.{1,4}/g);
    return listOfString.join(' ');
}

module.exports = beautifyPAN;