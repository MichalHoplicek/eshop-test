document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    
    let cart = [];
    
    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            let productName = document.querySelectorAll(".product h2")[index].textContent;
            let productPrice = document.querySelectorAll(".product p")[index].textContent.split(": ")[1];
            
            cart.push({ name: productName, price: parseInt(productPrice) });
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `${item.name} - ${item.price} Kč`;
            cartItems.appendChild(li);
            total += item.price;
        });

        totalPrice.textContent = `Celková cena: ${total} Kč`;
    }
});
