document.addEventListener("DOMContentLoaded", function () {
    console.log("Script načten!");

    const buttons = document.querySelectorAll(".add-to-cart");
    const cart = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-product");
            const li = document.createElement("li");
            li.textContent = productName;
            cartItems.appendChild(li);
        });
    });
});
