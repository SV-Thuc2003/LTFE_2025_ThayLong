package com.example.be.controller;

import com.example.be.entity.Product;
import com.example.be.service.ProductServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

public class ProductController_Milk {
    private final ProductServiceImpl productService;

    public ProductController_Milk(ProductServiceImpl productService) {
        this.productService = productService;
    }

    // HOME (giống thegioisua.com)
    @GetMapping
    public Page<Product> home(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return productService.getAllProducts(page, size);
    }

    // SEARCH
    @GetMapping("/search")
    public Page<Product> search(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return productService.searchProducts(keyword, page, size);
    }

    // CATEGORY (sữa bột cho bé / người lớn)
    @GetMapping("/category/{slug}")
    public Page<Product> byCategory(
            @PathVariable String slug,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return productService.getProductsByCategory(slug, page, size);
    }

    // PRODUCT DETAIL
    @GetMapping("/{slug}")
    public Product detail(@PathVariable String slug) {
        return productService.getProductDetail(slug);
    }
}
