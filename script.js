document.addEventListener("DOMContentLoaded", function () {
    console.log("Script načten!");
});

let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.product} - ${item.price} Kč`;
        cartList.appendChild(li);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Košík je prázdný!");
        return;
    }
    alert("Objednávka odeslána!");
    cart = [];
    updateCart();
}
