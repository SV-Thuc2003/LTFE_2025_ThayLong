package com.example.be.dto.request;

import com.example.be.dto.request.detail.ProductDetailRequest;
import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import jakarta.validation.constraints.NotBlank;

@Data
public class ProductRequest {
    private String name;
    private String slug;
    private Integer brandId;
    private Integer categoryId;
    private BigDecimal price;
    private String productUrl;
    private String description;

    // Optional: gửi details và images khi tạo sản phẩm
    private Map<String, String> details; // key: attribute, value: value
    private List<String> images; // danh sách URL ảnh
}

