function buttonClick(event) {
    const currentProduct = event.target.parentNode;
    const btn = currentProduct.querySelector('button');
    btn.innerText = currentProduct.classList.contains("product__show") ? "Подробнее" : "Отмена";
    currentProduct.classList.toggle("product__show");
}


const buttons = document.querySelectorAll('.product button');
buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        buttonClick(event);
    })
});