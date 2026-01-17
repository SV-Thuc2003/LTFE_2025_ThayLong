import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { createChatClient } from "../services/chatSocket";
// import type { Product } from "../types/product";
import type { ChatProduct } from "../types/chat";

export interface ChatMessage {
  sender: "USER" | "BOT";
  message: string;
  products: ChatProduct[];
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const clientRef = useRef<Client | null>(null);
  const pendingMessages = useRef<any[]>([]);

  useEffect(() => {
  let isMounted = true;

  if (!clientRef.current) {
    clientRef.current = createChatClient((data) => {
      if (!isMounted) return;
      setMessages((prev) => [...prev, data]);
    });
  }

  return () => {
    isMounted = false;
    clientRef.current?.deactivate();
    clientRef.current = null;
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
      pendingMessages.current.push(msg);
    }

    setMessages((prev) => [
      ...prev,
      { sender: "USER", message: text, products: [] },
    ]);
  };

  return { messages, sendMessage };
};
