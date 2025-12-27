package com.example.be.service;

import com.example.be.entity.Product;
import com.example.be.repository.ProductRepository;
import com.example.be.service.IService.IProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public class ProductServiceImpl implements IProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Page<Product> getAllProducts(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Page<Product> searchProducts(String keyword, int page, int size) {
        return productRepository.findByNameContainingIgnoreCase(
                keyword, PageRequest.of(page, size));
    }

    @Override
    public Product getProductDetail(String slug) {
        return productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public Page<Product> getProductsByCategory(String categorySlug, int page, int size) {
        return productRepository.findByCategory_Slug(
                categorySlug, PageRequest.of(page, size));
    }
}
