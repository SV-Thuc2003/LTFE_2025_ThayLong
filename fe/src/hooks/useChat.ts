import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { createChatClient } from "../services/chatSocket";
import type { Product } from "../types/product";

export type { Product } from "../types/product";

export interface ChatMessage {
  sender: "USER" | "BOT";
  message: string;
  products: Product[];
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const clientRef = useRef<Client | null>(null);
  const pendingMessages = useRef<any[]>([]); // queue tin nhắn chờ STOMP connect

  useEffect(() => {
    clientRef.current = createChatClient((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // BOT chào
    setMessages([
      {
        sender: "BOT",
        message: "Chào bạn! Tôi có thể giúp bạn tìm sản phẩm?",
        products: [],
      },
    ]);

    // gửi tin nhắn chờ khi connect
    const client = clientRef.current;
    const interval = setInterval(() => {
      if (client?.connected && pendingMessages.current.length > 0) {
        pendingMessages.current.forEach((msg) => client.publish(msg));
        pendingMessages.current = [];
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clientRef.current?.deactivate().catch((err) => {
        console.error("Lỗi khi ngắt kết nối chat client:", err);
      });
    };
  }, []);

  const sendMessage = (text: string) => {
    const msg = {
      destination: "/app/chat.sendMessage",
      body: JSON.stringify({ sender: "USER", message: text }),
    };

    if (clientRef.current?.connected) {
      clientRef.current.publish(msg);
    } else {
      pendingMessages.current.push(msg); // đẩy vào queue nếu chưa connect
    }

    setMessages((prev) => [...prev, { sender: "USER", message: text, products: [] }]);
  };

  return { messages, sendMessage };
};
