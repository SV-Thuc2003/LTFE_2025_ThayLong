import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const createChatClient = (onMessage: (msg: any) => void) => {
  const token = localStorage.getItem("token");

  const client = new Client({
    webSocketFactory: () =>
      new SockJS("http://localhost:8080/ws-chat"),

    connectHeaders: {
      Authorization: `Bearer ${token}`, 
    },

    reconnectDelay: 5000,
    debug: () => {},
  });

  client.onConnect = () => {
    console.log("STOMP connected");

    client.subscribe("/topic/public", (message) => {
      onMessage(JSON.parse(message.body));
    });
  };

  client.onStompError = (frame) => {
    console.error(" STOMP error:", frame.headers["message"]);
  };

  client.onWebSocketClose = (evt) => {
    console.warn("WebSocket closed:", evt);
  };

  client.activate();
  return client;
};
