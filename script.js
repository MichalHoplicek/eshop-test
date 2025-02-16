let cart = [];
let totalPrice = 0;

// Přidání do košíku
function addToCart(product, price) {
    cart.push({ product, price });
    totalPrice += price;
    totalPrice = parseFloat(totalPrice.toFixed(2)); // Zaokrouhlení na 2 desetinná místa
    updateCart();
}

// Aktualizace košíku
function updateCart() {
    let cartList = document.getElementById("cart");
    let totalPriceElement = document.getElementById("totalPrice");
    let paypalContainer = document.getElementById("paypal-button-container");
    
    cartList.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.product} - ${item.price.toFixed(2)} Kč`;
        cartList.appendChild(li);
    });

    totalPriceElement.innerText = `Celková cena: ${totalPrice.toFixed(2)} Kč`;

    // Odstranění předchozího PayPal tlačítka (pokud existuje)
    paypalContainer.innerHTML = "";

    // Zobrazit PayPal tlačítko, pokud je něco v košíku
    if (cart.length > 0) {
        renderPayPalButton();
    }
}

// PayPal platba
function renderPayPalButton() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: totalPrice.toFixed(2), currency_code: "CZK" }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert("Platba úspěšná! Děkujeme, " + details.payer.name.given_name);
                cart = [];
                totalPrice = 0;
                updateCart();
            });
        }
    }).render('#paypal-button-container');
}
