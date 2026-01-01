package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponseDTO {
    private String sender;   // BOT
    private String message;
    private List<ProductChatResponseDTO> products = List.of();
}
