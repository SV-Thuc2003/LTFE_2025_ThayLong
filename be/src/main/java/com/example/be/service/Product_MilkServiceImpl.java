package com.example.be.service;

import com.example.be.dto.request.HomeProductRequest;
import com.example.be.dto.request.ProductListRequest;
import com.example.be.dto.response.ProductDetailResponse;
import com.example.be.dto.response.ProductHomeResponse;
import com.example.be.dto.response.ProductListResponse;
import com.example.be.entity.Product;
import com.example.be.entity.ProductDetail;
import com.example.be.enums.exception.ErrorCode;
import com.example.be.exception.AppException;
import com.example.be.mapper.ProductMapper;
import com.example.be.repository.ProductDetailRepository;
import com.example.be.repository.ProductRepository;
import com.example.be.service.IService.ProductService;
import com.example.be.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Product_MilkServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    private Sort buildSort(String sort) {
        if (sort == null || sort.isBlank()) {
            return Sort.by("id").descending();
        }
        return switch (sort) {
            case "priceAsc" -> Sort.by("price").ascending();
            case "priceDesc" -> Sort.by("price").descending();
            case "nameAsc" -> Sort.by("name").ascending();
            case "nameDesc" -> Sort.by("name").descending();
            case "newest", "default" -> Sort.by("id").descending();
            default -> Sort.by("id").descending();
        };
    }


    @Override
    public Page<ProductListResponse> getProducts(ProductListRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), buildSort(request.getSort()));

        var spec = ProductSpecification.filter(request);

        return productRepository.findAll(spec, pageable)
                .map(productMapper::toList);
    }

    // Giữ nguyên home products + product detail
    @Override
    public Page<ProductHomeResponse> getHomeProducts(HomeProductRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), buildSort(request.getSort()));
        return productRepository.findAll(pageable)
                .map(productMapper::toHome);
    }

    @Override
    public ProductDetailResponse getProductDetail(String slug) {
        var product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return productMapper.toDetail(product, product.getDetails());
    }
}
