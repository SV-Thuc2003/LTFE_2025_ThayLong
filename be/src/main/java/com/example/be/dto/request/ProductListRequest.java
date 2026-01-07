package com.example.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class ProductListRequest {
    private Integer categoryId;
    private String categorySlug;
    private Integer brandId;

    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    private int page = 0;
    private int size = 12;

    private String sort = "newest";
}
