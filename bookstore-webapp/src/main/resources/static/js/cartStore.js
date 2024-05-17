const BOOKSTORE_STATE_KEY = "BOOKSTORE_STATE";

const getCart = function () {
    let cart = localStorage.getItem(BOOKSTORE_STATE_KEY)
    if (!cart) {
        // initialize if there is no cart
        cart = JSON.stringify({items: [], totalAmount: 0});
        localStorage.setItem(BOOKSTORE_STATE_KEY, cart);
    }
    return JSON.parse(cart);
}

const addProductToCart = function (product) {
    let cart = getCart();
    let cartItem = cart.items.find(itemModel => itemModel.code === product.code);
    if (cartItem) {
        cartItem.quantity = parseInt(cartItem.quantity) + 1;
    } else {
        cart.items.push(Object.assign({}, product, {quantity: 1}));
    }

    localStorage.setItem(BOOKSTORE_STATE_KEY, JSON.stringify(cart));

    // recalculate the quantity of products
    updateCartItemCount();
}

const updateProductQuantity = function (code, quantity) {
    let cart = getCart();
    if (quantity < 1) {
        cart.items = cart.items.filter(itemModel => itemModel.code !== code);
    } else {
        let cartItem = cart.items.find(itemModel => itemModel.code === code);
        if (cartItem) {
            cartItem.quantity = parseInt(quantity);
        } else {
            console.log("Product code is not already in Cart, ignoring")
        }
    }
    localStorage.setItem(BOOKSTORE_STATE_KEY, JSON.stringify(cart));
    updateCartItemCount();
}

const deleteCart = function () {
    localStorage.removeItem(BOOKSTORE_STATE_KEY);
    updateProductQuantity();
}

// update the item quantity
const updateCartItemCount = function (code, quantity) {
    let cart = getCart();
    let count = 0;

    cart.items.forEach(item => {
        count = count + item.quantity;
    });

    // update the text in cart div
    $('#cart-item-count').text('(' + count + ')');
}

function getCartTotal() {
    let cart = getCart();
    let totalAmount = 0;

    cart.items.forEach(item => {
        totalAmount = totalAmount + (item.price * item.quantity);
    })
    return totalAmount;
}