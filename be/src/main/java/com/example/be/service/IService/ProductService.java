package com.example.be.service.IService;

import com.example.be.dto.request.HomeProductRequest;
import com.example.be.dto.request.ProductListRequest;
import com.example.be.dto.response.ProductDetailResponse;
import com.example.be.dto.response.ProductHomeResponse;
import com.example.be.dto.response.ProductListResponse;
import org.springframework.data.domain.Page;

public interface ProductService {
    Page<ProductHomeResponse> getHomeProducts(HomeProductRequest request);

    Page<ProductListResponse> getProducts(ProductListRequest request);

    ProductDetailResponse getProductDetail(String slug);
}
