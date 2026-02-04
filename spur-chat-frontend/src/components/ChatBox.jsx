import { useEffect, useRef, useState } from "react";
import { sendMessage, getChatHistory } from "../api/chatApi";
import ChatMessage from "./ChatMessage";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    if (sessionId) {
      getChatHistory(sessionId)
        .then((data) => setMessages(data.messages))
        .catch(console.error);
    }
  }, [sessionId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(userText, sessionId);
      localStorage.setItem("sessionId", res.sessionId);
      setMessages((prev) => [...prev, { sender: "ai", text: res.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Something went wrong." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        height: "80vh"
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #e5e7eb",
          fontWeight: 600
        }}
      >
        AI Support Chat
      </div>
      

      <div
        style={{
          flex: 1,
          padding: 16,
          overflowY: "auto",
          background: "#f9fafb"
        }}
      >
        {messages.map((m, i) => (
          <ChatMessage key={i} sender={m.sender} text={m.text} />
        ))}
        <div ref={endRef} />
      </div>

      <div
        style={{
          display: "flex",
          padding: 12,
          borderTop: "1px solid #e5e7eb",
          gap: 8
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db"
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0 16px",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
