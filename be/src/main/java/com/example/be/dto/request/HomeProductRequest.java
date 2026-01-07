package com.example.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HomeProductRequest {
    private int page = 0;
    private int size = 8;
    private String sort = "newest"; // newest | priceAsc | priceDesc
}
