import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { FaCommentDots } from "react-icons/fa";

const ChatBox = () => {
  const navigate = useNavigate();

  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="w-80 h-96 bg-white border rounded-lg shadow flex flex-col">
          <div
            className="p-3 border-b font-semibold bg-rose-500 text-white flex justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <span>Trợ lý mua sắm</span>
            <span className="text-white font-bold">✕</span>
          </div>

          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.sender === "USER" ? "text-right" : "text-left"}
              >
                <div
                  className={`inline-block p-2 rounded-lg max-w-[90%] ${
                    msg.sender === "USER"
                      ? "bg-rose-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{msg.message}</p>
                  {msg.products?.map((p) => (
                    <a
                      key={p.slug}
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="group flex items-center gap-2 border rounded mt-2 p-1 bg-white hover:bg-gray-50 cursor-pointer transition"
                    >
                      <img
                        src={p.thumbnail || "/placeholder.png"}
                        className="w-12 h-12 object-cover"
                      />

                      <div>
                        <p className="text-sm font-medium group-hover:text-rose-600 transition">
                          {p.name}
                        </p>
                        <p className="text-xs text-red-500 group-hover:text-red-600 transition">
                          {p.price} đ
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 flex gap-2 text-xs">
            <button
              onClick={() => sendMessage("sữa cho bé")}
              className="border px-2 py-1 rounded"
            >
              Sữa cho bé
            </button>
            <button
              onClick={() => sendMessage("sữa người lớn")}
              className="border px-2 py-1 rounded"
            >
              Sữa người lớn
            </button>
          </div>

          <div className="p-2 flex gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 border rounded px-2"
              placeholder="Nhập tin nhắn..."
            />
            <button
              onClick={handleSend}
              className="bg-rose-500 text-white px-3 rounded"
            >
              Gửi
            </button>
          </div>
        </div>
      ) : (
        <div
          className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer text-2xl"
          onClick={() => setIsOpen(true)}
        >
          <FaCommentDots />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
