package com.mrn.bookstorewebapp.clients.orders;

public record OrderConfirmationDTO(String orderNumber, OrderStatus status) {}
