// script.js
let cart = [];
function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
}
function updateCart() {
    let cartList = document.getElementById('cart');
    let total = document.getElementById('total');
    cartList.innerHTML = '';
    let sum = 0;
    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.product} - ${item.price} Kč`;
        cartList.appendChild(li);
        sum += item.price;
    });
    total.textContent = `Celková cena: ${sum} Kč`;
