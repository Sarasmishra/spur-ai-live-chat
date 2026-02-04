const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");

const genAI = new GoogleGenerativeAI(env.geminiApiKey);

const model = genAI.getGenerativeModel({
  model:"gemini-3-flash-preview"

});

// Static FAQ / domain knowledge
const STORE_CONTEXT = `
You are a helpful support agent for a small e-commerce store.

Store Information:
- Shipping: We ship to USA, Canada, and India. Orders are delivered within 5–7 business days.
- Returns: Returns are accepted within 7 days of delivery if the product is unused.
- Refunds: Refunds are processed within 5 business days after return approval.
- Support Hours: Monday to Friday, 9 AM to 6 PM IST.

Guidelines:
- Be polite, concise, and helpful.
- If you don’t know something, say so honestly.
`;

const generateReply = async (messages) => {
  try {
    // Convert chat history to plain text (Gemini prefers text context)
    const historyText = messages
      .map(
        (msg) =>
          `${msg.sender === "user" ? "User" : "Agent"}: ${msg.text}`
      )
      .join("\n");

    const prompt = `
${STORE_CONTEXT}

Conversation so far:
${historyText}

Respond as the support agent:
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();
    return reply;
  } catch (error) {
    console.error("Gemini LLM Error:", error.message);
    throw new Error("LLM_FAILED");
  }
};

  
module.exports = { generateReply };
