import { Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const createChatClient = (onMessage: (msg: any) => void) => {
    const socket = new SockJS('http://localhost:8080/ws-chat');
    
    const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug:() => {}
    });

    client.onConnect = () => {
        client.subscribe('/topic/public', message => {
            onMessage(JSON.parse(message.body));
        });
    };

    client.onStompError = (frame) => {
    console.error("STOMP error", frame.headers['message'], frame.body);
  };

  client.onWebSocketError = (evt) => {
    console.error("WebSocket error", evt);
  };

  client.onWebSocketClose = (evt) => {
    console.warn("WebSocket closed", evt);
  };

    client.activate();
    return client;
}