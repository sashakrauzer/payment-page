let hints = Array.from(
    document.querySelectorAll('.hint')
);

// Создаем подсказки для необходимых элементов
hints.forEach((hintContainer) => {
    let hint = document.createElement('span');
    hint.classList.add('hint__text');
    hint.textContent = hintContainer.dataset.hint;
    document.body.appendChild(hint);

    // Ставим обработчик кликов на элементы с подсказками, 
    // и в случае клика, показываем подсказку
    hintContainer.addEventListener('click', function(event) {
        if (hint.classList.contains('hint__text_visible')) {
            hint.classList.remove('hint__text_visible');
            hint.style.cssText = `left: -9999px`;
        } else {
            let left = event.pageX - hint.offsetWidth / 2;
            let top = event.pageY - hint.offsetHeight - 10;
            hint.style.cssText = `top: ${top}px; left: ${left}px;`;
            hint.classList.add('hint__text_visible');
        }
    });
});

// Отслеживанием клики вне подсказки и скрываем её при необходимости
document.addEventListener('click', function(event) {
    let target = event.target;
    let hintIsExist = Array.from(
        document.querySelectorAll('.hint__text_visible')
    );
    if(!target.classList.contains('hint') && !target.classList.contains('hint__text') && hintIsExist.length) {
        hintIsExist.forEach((hintText) => {
            hintText.classList.remove('hint__text_visible');
        })
    }
});