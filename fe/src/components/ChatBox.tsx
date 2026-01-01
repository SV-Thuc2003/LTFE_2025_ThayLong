// components/ChatBox.tsx
import { useState } from "react";
import { useChat } from "../hooks/useChat";

const ChatBox = () => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-[420px] bg-white border rounded-lg shadow flex flex-col">
      {/* Header */}
      <div className="p-3 border-b font-semibold bg-orange-500 text-white">
        Trợ lý mua sắm
      </div>

      {/* Messages */}
      <div className="flex-1 p-2 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "USER" ? "text-right" : "text-left"}
          >
            <div
              className={`inline-block p-2 rounded-lg max-w-[90%] ${
                msg.sender === "USER" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <p>{msg.message}</p>

              {/* Product cards */}
              {msg.products.map((p) => (
                <a
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="flex items-center gap-2 border rounded mt-2 p-1 bg-white hover:bg-gray-50"
                >
                  <img
                    src={
                      p.images?.find((img) => img.isThumbnail)?.imageUrl ||
                      "/placeholder.png"
                    }
                    className="w-12 h-12 object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-red-500">{p.price} đ</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick reply (Shopee rất hay dùng) */}
      <div className="p-2 flex gap-2 text-xs">
        <button
          onClick={() => sendMessage("sữa cho bé")}
          className="border px-2 py-1 rounded"
        >
          Sữa cho bé
        </button>
        <button
          onClick={() => sendMessage("sữa giá rẻ")}
          className="border px-2 py-1 rounded"
        >
          Giá rẻ
        </button>
      </div>

      {/* Input */}
      <div className="p-2 flex gap-2 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2"
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 text-white px-3 rounded"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
