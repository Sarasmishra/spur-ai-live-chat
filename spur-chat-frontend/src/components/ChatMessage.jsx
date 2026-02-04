export default function ChatMessage({ sender, text }) {
    const isUser = sender === "user";
  
    return (
    <div
        style={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
          marginBottom: 10
        }}
      >
        <div
          style={{
            background: isUser ? "#4f46e5" : "#e5e7eb",
            color: isUser ? "#fff" : "#111827",
            padding: "10px 14px",
            borderRadius: 14,
            maxWidth: "75%",
            lineHeight: 1.4,
            fontSize: 14
          }}
        >
          {text}
        </div>
    </div>
    );
  }
  