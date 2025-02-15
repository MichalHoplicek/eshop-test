let cart = [];
let totalPrice = 0;

// Přidání do košíku
function addToCart(product, price) {
    cart.push({ product, price });
    totalPrice += price;
    updateCart();
}

// Aktualizace košíku
function updateCart() {
    let cartList = document.getElementById("cart");
    let totalPriceElement = document.getElementById("totalPrice");
    
    cartList.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.product} - ${item.price} Kč`;
        cartList.appendChild(li);
    });

    totalPriceElement.innerText = `Celková cena: ${totalPrice} Kč`;

    // Zobrazit PayPal tlačítko
    if (totalPrice > 0) {
        renderPayPalButton();
    }
}

// PayPal platba
function renderPayPalButton() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: totalPrice.toString(), currency_code: "CZK" }
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
