require('./ripple_btn');

let formUi = document.querySelector('.form-ui');
let labelsOfDropdowns = Array.from(
    document.querySelectorAll('.dropdown label')
);
let dropdowns = Array.from(
    document.querySelectorAll('.dropdown')
);

let listOfMenu = Array.from(
    document.querySelectorAll('.dropdown .dropdown__menu')
);
let inputs = Array.from(
    document.querySelectorAll('.textfield input')
);

inputs.forEach((input) => {
    input.addEventListener('change', function(event) {
        // console.log('INPUT change');
    });
});

// labelsOfDropdowns.forEach((label) => {
//     label.addEventListener('mouseover', function(event) {
//         this.parentElement.classList.add('dropdown_hover');
//     });
//     label.addEventListener('mouseout', function(event) {
//         this.parentElement.classList.remove('dropdown_hover');
//     });
// });

dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('mouseover', function(event) {
        this.classList.add('dropdown_hover');
    }, true);
    dropdown.addEventListener('mouseout', function(event) {
        this.classList.remove('dropdown_hover');
    }, true);
});

formUi.addEventListener('click', function(event) {
    let elem = event.target;
    let parent = elem.parentElement;
    // console.log(parent);
    if (elem.tagName === 'LABEL') {
        if (parent.classList.contains('dropdown')) {
            parent.classList.toggle('dropdown_is-open');
        } else if (parent.classList.contains('textfield')) {
            parent.querySelector('input').focus();
        }
        return true;     
    }

    if (elem.tagName === 'LI') {
        if (parent.classList.contains('dropdown__menu')) {
            let dropdown = parent.parentElement;
            let focusEvent = new Event('focus');
            let input = dropdown.querySelector('input');
            input.value = elem.dataset.value;
            input.dispatchEvent(focusEvent);
            dropdown.classList.remove('dropdown_is-open');
        }
    }
    // else if (elem.tagName === 'LABEL' && parent.classList.contains('textfield') && parent.classList.contains('dropdown')) {
    //     parent.classList.toggle('dropdown_is-open');
    // }
    else if (elem.classList.contains('textfield__clean')) {
        parent.querySelector('input').value = '';
        parent.classList.remove('textfield_not-empty');
    } else if (elem.classList.contains('dropdown__btn')) {
        parent.classList.toggle('dropdown_is-open');
    }
});

formUi.addEventListener('blur', function(event) {
    let elem = event.target;
    let parent = elem.parentElement;
    if (elem.tagName === 'INPUT' && parent.classList.contains('textfield')) {
        if (!elem.value) {
            parent.classList.remove('textfield_not-empty');
        }
    }
}, true);

formUi.addEventListener('focus', function(event) {
    let elem = event.target;
    let parent = elem.parentElement;
    if (elem.tagName === 'INPUT' && parent.classList.contains('textfield') && elem.value) {
        parent.classList.add('textfield_not-empty');
    }
}, true);

formUi.addEventListener('keyup', function(event) {
    let elem = event.target;
    let parent = elem.parentElement;
    if (elem.tagName === 'INPUT' && elem.value) {
        parent.classList.add('textfield_not-empty');
    } else if (elem.tagName === 'INPUT' && !elem.value) {
        parent.classList.remove('textfield_not-empty');
    }
});