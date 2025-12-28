package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
@Builder
public class ProductListResponse {
    private Integer id;
    private String name;
    private String slug;
    private BigDecimal price;

    private String thumbnail;
    private String brandName;
}
