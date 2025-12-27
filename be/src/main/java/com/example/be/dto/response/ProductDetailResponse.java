package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailResponse {
    private Integer id;
    private String name;
    private String slug;
    private BigDecimal price;

    private String description;
    private String brand;
    private String category;

    private List<String> images;
    private Map<String, String> attributes;
}
