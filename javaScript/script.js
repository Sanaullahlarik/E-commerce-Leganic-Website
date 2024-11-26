let cart = [];

function updateCartDisplay() {
    let cartItemsDiv = document.getElementById("cartItems");
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        updateTotalPrice();
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        cartItemsDiv.innerHTML += `
            <div class="card mb-3 p-3 shadow-sm">
                <div class="d-flex justify-content-between align-items-center">
                    <img src="${item.img}" alt="${item.name}" style="width: 90px; height: 90px; object-fit: cover;" class="me-3 rounded">
                    <div class="flex-grow-1">
                        <h5 class="mb-1">${item.name}</h5>
                        <p class="text-muted mb-0">$${item.price} x ${item.quantity}</p>
                        <button class="btn btn-sm btn-danger mt-2" onclick="removeItem(${i})">Remove</button>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-danger me-2" onclick="updateQuantity(${i}, -1)">-</button>
                        <span class="px-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-success ms-2" onclick="updateQuantity(${i}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    }

    updateTotalPrice();
    updateCartCounter();
}


let addToCartButtons = document.querySelectorAll(".add-to-cart-btn"); 
for (let j = 0; j < addToCartButtons.length; j++) {
    addToCartButtons[j].addEventListener("click", function () {
        let productName = this.getAttribute("data-name");
        let productPrice = this.getAttribute("data-price");
        let productImg = this.getAttribute("data-img");

        let listItem = cart.find(function (item) {
            return item.name === productName;
        });

        if (listItem) {
            listItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: Number(productPrice),
                img: productImg,
                quantity: 1
            });
        }

        localStorage.setItem("cartItems", String(cart));
        updateCartDisplay();
    });
}


function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cartItems", String(cart));
    updateCartDisplay();
}


function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cartItems", String(cart));
    updateCartDisplay();
}


function updateCartCounter() {
    let cartQuantityBadge = document.getElementById('cartCounter');
    let totalItems = 0;

    for (let k = 0; k < cart.length; k++) {
        totalItems += cart[k].quantity;
    }

    cartQuantityBadge.innerText = totalItems === 0 ? 0 : totalItems;
}


function updateTotalPrice() { 
    let totalPriceElement = document.getElementById("totalPrice");
    let totalPrice = 0;

    for (let l = 0; l < cart.length; l++) {
        totalPrice += cart[l].price * cart[l].quantity;
    }

    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}


if (localStorage.getItem("cartItems")) {
    let storedCart = localStorage.getItem("cartItems").split(",");
    for (let i = 0; i < storedCart.length; i++) {
        let itemData = storedCart[i].split("|");
        cart.push({
            name: itemData[0],
            price: Number(itemData[1]),
            img: itemData[2],
            quantity: Number(itemData[3])
        });
    }
}

window.addEventListener('load', function () {
    updateCartDisplay();
    updateCartCounter();
});
