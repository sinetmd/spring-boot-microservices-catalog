package com.mrn.catalogservice.domain;

import java.math.BigDecimal;

// DAO
public record Product(String code, String name, String description, String imageUrl, BigDecimal price) {}
