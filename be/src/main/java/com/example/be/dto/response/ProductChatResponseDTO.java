package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductChatResponseDTO {

    private String name;
    private String slug;
    private String price;
    private String thumbnail;
}
