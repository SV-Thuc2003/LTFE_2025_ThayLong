package com.example.be.controller;

import com.example.be.dto.request.HomeProductRequest;
import com.example.be.dto.request.ProductListRequest;
import com.example.be.dto.response.ProductDetailResponse;
import com.example.be.dto.response.ProductHomeResponse;
import com.example.be.dto.response.ProductListResponse;
import com.example.be.mapper.ProductMapper;
import com.example.be.repository.ProductRepository;
import com.example.be.service.Product_MilkServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class Product_MilkController {
    private ProductRepository productRepository;
    private ProductMapper productMapper;
    private final Product_MilkServiceImpl productService;
    // HOME
    @PostMapping("/home/products")
    public ResponseEntity<Page<ProductHomeResponse>> homeProducts(
            @RequestBody HomeProductRequest request
    ) {
        return ResponseEntity.ok(
                productService.getHomeProducts(request)
        );
    }

    // PRODUCT LIST
    @PostMapping("/products")
    public ResponseEntity<Page<ProductListResponse>> products(
            @RequestBody ProductListRequest request
    ) {
        return ResponseEntity.ok(productService.getProducts(request));
    }

    // PRODUCT DETAIL
    @GetMapping("/products/{slug}")
    public ResponseEntity<ProductDetailResponse> productDetail(
            @PathVariable String slug
    ) {
        return ResponseEntity.ok(
                productService.getProductDetail(slug)
        );
    }

    @GetMapping("/products/search")
    public ResponseEntity<Page<ProductListResponse>> search(
            @RequestParam String keyword,
            @RequestParam int page,
            @RequestParam int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(
                productRepository
                        .findByNameContainingIgnoreCase(keyword, pageable)
                        .map(productMapper::toList)
        );
    }

}
