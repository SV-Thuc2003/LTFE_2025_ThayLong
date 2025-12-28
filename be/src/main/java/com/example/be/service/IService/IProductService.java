package com.example.be.service.IService;

import com.example.be.entity.Product;
import org.springframework.data.domain.Page;

public interface IProductService {
    Page<Product> getAllProducts(int page, int size);

    Page<Product> searchProducts(String keyword, int page, int size);

    Product getProductDetail(String slug);

    Page<Product> getProductsByCategory(String categorySlug, int page, int size);
}
