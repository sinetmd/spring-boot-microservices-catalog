package com.mrn.bookstorewebapp.clients;

import com.mrn.bookstorewebapp.ApplicationProperties;
import com.mrn.bookstorewebapp.clients.catalog.CatalogServiceClient;
import com.mrn.bookstorewebapp.clients.orders.OrderServiceClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class ClientsConfig {
    private final ApplicationProperties applicationProperties;

    ClientsConfig(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @Bean
    CatalogServiceClient catalogServiceClient() {
        RestClient restClient = RestClient.create(applicationProperties.apiGatewayUrl());
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(RestClientAdapter.create(restClient))
                .build();

        return factory.createClient(CatalogServiceClient.class);
    }

    @Bean
    OrderServiceClient orderServiceClient() {
        RestClient restClient = RestClient.create(applicationProperties.apiGatewayUrl());
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(RestClientAdapter.create(restClient))
                .build();

        return factory.createClient(OrderServiceClient.class);
    }
}
