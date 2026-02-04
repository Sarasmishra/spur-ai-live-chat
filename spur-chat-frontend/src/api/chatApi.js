const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/chat`;


export const sendMessage = async (message, sessionId) => {
  const res = await fetch(`${BASE_URL}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId })
  });

  if (!res.ok) throw new Error("Send failed");
  return res.json();
};

export const getChatHistory = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/history/${sessionId}`);
  if (!res.ok) throw new Error("History fetch failed");
  return res.json();
};
