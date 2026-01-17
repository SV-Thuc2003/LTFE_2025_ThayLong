package com.example.be.controller;

import com.example.be.dto.response.BrandResponse;
import com.example.be.entity.Brand;
import com.example.be.repository.BrandRepository;
//import com.example.be.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandRepository brandRepository;

    @GetMapping
    public ResponseEntity<List<Brand>> getAll() {
        return ResponseEntity.ok(brandRepository.findAll());
    }
}
