document.addEventListener('alpine:init', () => {
    Alpine.data('initData', (pageNo) => ({
        pageNo: pageNo,
        products: {
            data: []
        },
        init() {
            this.loadProducts(this.pageNo);
        },
        loadProducts(pageNo) {
            $.getJSON("/api/products?page=" + pageNo, (res) => {
                console.log("Products Resp:", res)
                this.products = res;
            })
        },
        addToCart(product) {
            addProductToCart(product)
        }
    }))
})