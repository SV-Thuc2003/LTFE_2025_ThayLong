package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name ="product_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ProductImage {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        private String imageUrl;

        private Boolean isThumbnail = false;

        @ManyToOne
        @JoinColumn(name = "product_id")
        private Product product;
}

