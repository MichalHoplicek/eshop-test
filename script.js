let cart = [];
let totalPrice = 0;

// Přidání do košíku s animací
function addToCart(product, price, event) {
    cart.push({ product, price });
    totalPrice += price;
    updateCart();
    
    // Efekt vhození do košíku
    animateFlyToCart(event.target);
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

// Animace vhození do košíku
function animateFlyToCart(button) {
    let product = button.closest(".product");
    let productImage = product.querySelector("img");
    let cartIcon = document.querySelector(".cart-container");

    // Klonování obrázku
    let flyingImage = productImage.cloneNode(true);
    document.body.appendChild(flyingImage);

    // Nastavení stylu
    let rect = productImage.getBoundingClientRect();
    flyingImage.style.position = "absolute";
    flyingImage.style.left = rect.left + "px";
    flyingImage.style.top = rect.top + "px";
    flyingImage.style.width = productImage.width + "px";
    flyingImage.style.height = productImage.height + "px";
    flyingImage.classList.add("fly-to-cart");

    // Konečná pozice (u košíku)
    let cartRect = cartIcon.getBoundingClientRect();
    setTimeout(() => {
        flyingImage.style.transform = `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px) scale(0)`;
        flyingImage.style.opacity = "0";
    }, 100);

    // Odstranění po animaci
    setTimeout(() => {
        flyingImage.remove();
    }, 800);
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
