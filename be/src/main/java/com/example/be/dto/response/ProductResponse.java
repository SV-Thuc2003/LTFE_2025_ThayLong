package com.example.be.dto.response;

import com.example.be.dto.response.detail.ProductDetailResponse;
import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;
    private String slug;
    private String brandName;
    private String categoryName;
    private BigDecimal price;
    private String productUrl;
    private String description;
    private List<String> images;
    private Map<String, String> details;
}

