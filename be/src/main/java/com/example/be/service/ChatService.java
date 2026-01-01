package com.example.be.service;

import com.example.be.dto.request.ChatRequestDTO;
import com.example.be.dto.response.ChatResponseDTO;
import com.example.be.dto.response.ProductChatResponseDTO;
import com.example.be.entity.ProductImage;
import com.example.be.enums.ChatIntent;
import com.example.be.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ProductRepository productRepository;

    public ChatResponseDTO handle(ChatRequestDTO request) {

        ChatIntent intent = detectIntent(request.getMessage());

        return switch (intent) {

            case GREETING -> new ChatResponseDTO(
                    "BOT",
                    "Chào bạn Mình có thể giúp tìm sản phẩm cho bạn.",
                    List.of()
            );

            case ASK_PRICE -> new ChatResponseDTO(
                    "BOT",
                    "Bạn đang quan tâm sản phẩm nào để mình báo giá chính xác?",
                    List.of()
            );

            case SEARCH_PRODUCT -> handleSearchProduct(request.getMessage());

            default -> new ChatResponseDTO(
                    "BOT",
                    "Mình chưa hiểu rõ Bạn thử gõ: 'sữa cho bé' nhé!",
                    List.of()
            );
        };
    }
    private ChatResponseDTO handleSearchProduct(String message) {

        String keyword = message.replaceAll(
                "(mua|cho|bé|tuổi|mình|muốn)", ""
        ).trim();

        List<ProductChatResponseDTO> products =
                productRepository.findTop5ByNameContainingIgnoreCase(keyword)
                        .stream()
                        .map(p -> new ProductChatResponseDTO(
                                p.getName(),
                                p.getSlug(),
                                p.getPrice().toString(),
                                p.getImages().stream()
                                        .filter(ProductImage::getIsThumbnail)
                                        .findFirst()
                                        .map(ProductImage::getImageUrl)
                                        .orElse("")
                        ))
                        .toList();

        if (products.isEmpty()) {
            return new ChatResponseDTO(
                    "BOT",
                    "Hiện chưa có sản phẩm phù hợp ",
                    List.of()
            );
        }

        return new ChatResponseDTO(
                "BOT",
                "Mình tìm thấy các sản phẩm sau cho bạn:",
                products
        );
    }

    private ChatIntent detectIntent(String message){
        String msg = message.toLowerCase();
        if (msg.contains("Chào") || msg.contains("Hi")){
            return ChatIntent.GREETING;
        }
        if (msg.contains("giá") || msg.contains("bao nhiêu")){
            return ChatIntent.ASK_PRICE;
        }
        if (msg.contains("sữa") || msg.contains("sưaxx")){
            return ChatIntent.SEARCH_PRODUCT;
        }
            return ChatIntent.UNKNOWN;

    }
}
