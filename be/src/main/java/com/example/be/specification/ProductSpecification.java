package com.example.be.specification;

import com.example.be.dto.request.ProductListRequest;
import com.example.be.entity.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> filter(ProductListRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Category
            addEqual(predicates, cb, root.get("category").get("id"), request.getCategoryId());
            addEqual(predicates, cb, root.get("category").get("slug"), request.getCategorySlug());

            // Brand
            addEqual(predicates, cb, root.get("brand").get("id"), request.getBrandId());

            // Price
            addPriceRange(predicates, cb, root.get("price"),
                    request.getMinPrice(), request.getMaxPrice());

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    /* ================= HELPER METHODS ================= */

    private static <T> void addEqual(
            List<Predicate> predicates,
            jakarta.persistence.criteria.CriteriaBuilder cb,
            jakarta.persistence.criteria.Expression<T> path,
            T value
    ) {
        if (value != null) {
            predicates.add(cb.equal(path, value));
        }
    }

    private static void addPriceRange(
            List<Predicate> predicates,
            jakarta.persistence.criteria.CriteriaBuilder cb,
            jakarta.persistence.criteria.Expression<BigDecimal> pricePath,
            BigDecimal min,
            BigDecimal max
    ) {
        if (min != null && max != null && min.compareTo(max) > 0) {
            // auto swap để tránh lỗi UX
            BigDecimal temp = min;
            min = max;
            max = temp;
        }

        if (min != null) {
            predicates.add(cb.greaterThanOrEqualTo(pricePath, min));
        }
        if (max != null) {
            predicates.add(cb.lessThanOrEqualTo(pricePath, max));
        }
    }
}
