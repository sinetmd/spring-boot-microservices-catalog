package com.mrn.orderservice.web.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.mrn.orderservice.AbstractIT;
import com.mrn.orderservice.WithMockOAuth2User;
import org.junit.jupiter.api.Test;

// we are mocking the user without using keycloak
// using mockmvc
public class GetOrdersTest extends AbstractIT {
    @Test
    @WithMockOAuth2User(username = "user")
    void shouldGetOrdersSuccessfully() throws Exception {
        mockMvc.perform(get("/api/orders")).andExpect(status().isOk());
    }
}
