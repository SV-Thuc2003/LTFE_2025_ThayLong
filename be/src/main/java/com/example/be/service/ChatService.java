package com.example.be.service;

import com.example.be.dto.request.ChatRequestDTO;
import com.example.be.dto.response.ChatResponseDTO;
import com.example.be.dto.response.ProductChatResponseDTO;
import com.example.be.entity.Product;
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

        String message = request.getMessage();
        ChatIntent intent = detectIntent(request.getMessage());

        return switch (intent) {

            case GREETING -> greeting();

            case SEARCH_CHEAPEST_PRODUCT -> handleCheapestProduct();

            case SEARCH_PRODUCT_DETAIL, ASK_PRICE, SEARCH_PRODUCT ->
                    handleSearchProduct(message);

            default -> unknown();
        };
    }
    private ChatResponseDTO greeting() {
        return new ChatResponseDTO(
                "BOT",
                "Chào bạn! Mình có thể giúp bạn tìm sữa theo *hãng*, *độ tuổi* hoặc *giá rẻ nhất* nhé!",
                List.of()
        );
    }



    // hoi chi tiet 1 san pham
    private ChatResponseDTO handleProductDetail(String message) {

        String keyword = extractProductName(message);

        List<Product> products =
                productRepository.findTop5ByNameContainingIgnoreCase(keyword);

        if (products.isEmpty()) {
            return new ChatResponseDTO(
                    "BOT",
                    "Mình chưa tìm thấy sản phẩm này. Bạn gõ lại tên giúp mình nhé!",
                    List.of()
            );
        }

        Product p = products.get(0);

        return new ChatResponseDTO(
                "BOT",
                "Mình tìm thấy sản phẩm bạn đang quan tâm:",
                List.of(mapToChatProduct(p))
        );
    }
    //  SỮA GIÁ RẺ NHẤT
    private ChatResponseDTO handleCheapestProduct() {

        return productRepository.findFirstByOrderByPriceAsc()
                .map(p -> new ChatResponseDTO(
                        "BOT",
                        "Đây là sản phẩm sữa giá rẻ nhất hiện tại",
                        List.of(mapToChatProduct(p))
                ))
                .orElse(unknown());
    }

    // ===================== TÌM KIẾM CHUNG (FALLBACK) =====================
    private ChatResponseDTO handleSearchProduct(String message) {

        String keyword = normalize(message);

        List<ProductChatResponseDTO> products =
                productRepository.findTop5ByNameContainingIgnoreCase(keyword)
                        .stream()
                        .limit(2)
                        .map(this::mapToChatProduct)
                        .toList();

        if (products.isEmpty()) {
            return new ChatResponseDTO(
                    "BOT",
                    "Mình chưa tìm thấy sản phẩm phù hợp Bạn thử gõ rõ hơn giúp mình nhé!",
                    List.of()
            );
        }

        String text = products.size() == 1
                ? "Mình tìm thấy sản phẩm phù hợp nhất cho bạn"
                : "Mình gợi ý cho bạn 2 sản phẩm phù hợp nhất";

        return new ChatResponseDTO("BOT", text, products);
    }
    // ===================== MAP PRODUCT → CHAT DTO =====================
    private ProductChatResponseDTO mapToChatProduct(Product p) {

        return new ProductChatResponseDTO(
                p.getName(),
                p.getSlug(),
                p.getPrice().toString(),
                p.getImages().stream()
                        .filter(img -> Boolean.TRUE.equals(img.getIsThumbnail()))
                        .findFirst()
                        .map(ProductImage::getImageUrl)
                        .orElse("")
        );
    }

    // ===================== DETECT INTENT =====================
    private ChatIntent detectIntent(String message) {

        String msg = message.toLowerCase();

        if (msg.matches(".*(chào|hi|hello).*"))
            return ChatIntent.GREETING;

        if (msg.matches(".*(rẻ nhất|giá rẻ).*"))
            return ChatIntent.SEARCH_CHEAPEST_PRODUCT;

        if (msg.matches(".*(giá|bao nhiêu).*"))
            return ChatIntent.ASK_PRICE;

        if (msg.matches(".*(xem|chi tiết).*"))
            return ChatIntent.SEARCH_PRODUCT_DETAIL;

        if (msg.contains("sữa"))
            return ChatIntent.SEARCH_PRODUCT;

        return ChatIntent.UNKNOWN;
    }

    private String normalize(String message) {

        return message.toLowerCase()
                .replaceAll(
                        "(mua|cho|bé|người lớn|tuổi|mình|muốn|xem|chi tiết|giá|bao nhiêu|sữa)",
                        "")
                .replaceAll(
                        "[^a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\\s]",
                        "")
                .trim();
    }
    private ChatResponseDTO unknown() {
        return new ChatResponseDTO(
                "BOT",
                "Mình chưa hiểu lắm Bạn thử gõ: *sữa Abbott*, *sữa cho bé*, hoặc *sữa giá rẻ* nhé!",
                List.of()
        );
    }

    // ===================== TÁCH TÊN SẢN PHẨM =====================
    private String extractProductName(String message) {

        return message.toLowerCase()
                .replaceAll("(xem|chi tiết|giá|bao nhiêu|sữa)", "")
                .trim();
    }
}
