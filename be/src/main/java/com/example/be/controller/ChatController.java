package com.example.be.controller;

import com.example.be.dto.request.ChatRequestDTO;
import com.example.be.dto.response.ChatResponseDTO;
import com.example.be.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatResponseDTO receive(@Payload ChatRequestDTO request) {
        System.out.println("==== CHAT MESSAGE ====");
        System.out.println("Sender: " + request.getSender());
        System.out.println("Message: " + request.getMessage());
        System.out.println("Received message: " + request.getMessage());
        return chatService.handle(request);
    }
}
