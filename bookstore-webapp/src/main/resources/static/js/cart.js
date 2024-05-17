document.addEventListener('alpine:init', () => {
    Alpine.data('initData', () => ({
        cart: {items: [], totalAmount: 0},

        // pre-populated form values
        orderForm: {
            customer: {
                name: "Meme",
                email: "me@email.com",
                phone: "0740540733"
            },
            deliveryAddress: {
                addressLine1: "Address1",
                addressLine2: "Sukabliet",
                city: "Cozdesti",
                state: "AG",
                zipCode: "1001-LT",
                country: "USA"
            }
        },

        init() {
            updateCartItemCount();
            this.loadCart();
            this.cart.totalAmount = getCartTotal();
        },
        loadCart() {
            this.cart = getCart()
        },
        updateItemQuantity(code, quantity) {
            updateProductQuantity(code, quantity);
            this.loadCart();
            this.cart.totalAmount = getCartTotal();
        },
        removeCart() {
            deleteCart();
        },
        createOrder() {
            let order = Object.assign({}, this.orderForm, {items: this.cart.items});
            //console.log("Order ", order);

            $.ajax({
                url: '/api/orders',
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(order),
                success: (res) => {
                    //console.log("Order Resp:", res)
                    this.removeCart();
                    // alert("Order placed successfully")
                    window.location = "/orders/" + res.orderNumber;
                }, error: (err) => {
                    console.log("Order Creation Error:", err)
                    alert("Order creation failed")
                }
            });
        },
    }))
});