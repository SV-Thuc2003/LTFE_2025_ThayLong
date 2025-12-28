package com.example.be.repository;

import com.example.be.entity.Product;
import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {

    // Home + Product list
    @EntityGraph(attributePaths = {"images", "brand"})
    Page<Product> findAll(Pageable pageable);

    // Search
    @EntityGraph(attributePaths = {"images", "brand"})
    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

    // Detail
    @EntityGraph(attributePaths = {"images", "details", "brand", "category"})
    Optional<Product> findBySlug(String slug);

    // Filter category
    @EntityGraph(attributePaths = {"images", "brand"})
    Page<Product> findByCategory_Slug(String slug, Pageable pageable);
}
