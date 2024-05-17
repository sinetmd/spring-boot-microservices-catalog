document.addEventListener("alpine:init", () => {
    Alpine.data("initData", (orderNumber) => ({
        orderNumber: orderNumber,
        orderDetails: {
            items: [],
            customer: {},
            deliveryAddress: {}
        },
        init() {
            updateCartItemCount();
            this.getOrderDetails(this.orderNumber);
        },
        getOrderDetails(orderNumber) {
            $.getJSON("/api/orders/" + orderNumber, (data) => {
                console.log("Order Details Data: ", data);
                this.orderDetails = data;
            })
        }
    }))
})