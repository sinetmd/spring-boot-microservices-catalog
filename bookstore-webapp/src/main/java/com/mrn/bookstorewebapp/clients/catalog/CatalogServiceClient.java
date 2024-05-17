package com.mrn.bookstorewebapp.clients.catalog;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;

// calling the api-gateway without specifying the full url in our js files
public interface CatalogServiceClient {
    @GetExchange("/catalog/api/products")
    PagedResult<Product> getProducts(@RequestParam int page);

    @GetExchange("catalog/api/products/{code}")
    PagedResult<Product> getProductsByCode(@PathVariable String code);
}
