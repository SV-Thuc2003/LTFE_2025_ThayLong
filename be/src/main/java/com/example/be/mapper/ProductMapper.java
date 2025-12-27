package com.example.be.mapper;

import com.example.be.dto.response.ProductHomeResponse;
import com.example.be.dto.response.ProductListResponse;
import com.example.be.dto.response.ProductDetailResponse;
import com.example.be.entity.Product;
import com.example.be.entity.ProductDetail;
import com.example.be.entity.ProductImage;

import org.mapstruct.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    private String getThumbnail(Product product) {
        return product.getImages()
                .stream()
                .filter(ProductImage::getIsThumbnail)
                .findFirst()
                .map(ProductImage::getImageUrl)
                .orElse(null);
    }

    public ProductHomeResponse toHome(Product product) {
        return ProductHomeResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .price(product.getPrice())
                .thumbnail(getThumbnail(product))
                .brandName(product.getBrand().getName())
                .build();
    }

    public ProductListResponse toList(Product product) {
        return ProductListResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .price(product.getPrice())
                .thumbnail(getThumbnail(product))
                .brandName(product.getBrand().getName())
                .build();
    }

    public ProductDetailResponse toDetail(
            Product product,
            List<ProductDetail> details
    ) {

        ProductDetailResponse res = new ProductDetailResponse();
        res.setId(product.getId());
        res.setName(product.getName());
        res.setSlug(product.getSlug());
        res.setPrice(product.getPrice());
        res.setDescription(product.getDescription());
        res.setBrand(product.getBrand().getName());
        res.setCategory(product.getCategory().getName());

        res.setImages(
                product.getImages()
                        .stream()
                        .map(ProductImage::getImageUrl)
                        .toList()
        );

        res.setAttributes(
                details.stream()
                        .collect(Collectors.toMap(
                                ProductDetail::getAttribute,
                                ProductDetail::getValue
                        ))
        );

        return res;
    }
}
