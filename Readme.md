<img width="1913" height="894" alt="image" src="https://github.com/user-attachments/assets/dfa899bb-545f-4a0a-92f3-958084b75293" /><img width="1913" height="894" alt="image" src="https://github.com/user-attachments/assets/dfa899bb-545f-4a0a-92f3-958084b75293" /># AI Live Chat Support Agent – Spur Hiring Assignment

This project is a full-stack AI-powered live chat application built as part of the **Spur Software Engineer hiring assignment**.

It simulates a customer support chat widget where users can ask questions and receive responses from an AI support agent. The application persists conversations, maintains session continuity across page reloads, and integrates a real Large Language Model (LLM).

---

## 📂 Project Structure

Spur-Software-Hiring-Assignment/
├── spur-chat-backend/ # Node.js + Express backend
├── spur-chat-frontend/ # React (Vite) frontend
└── README.md # Project documentation

---

## 🚀 Features

- AI-powered customer support chat using a real LLM
- Session-based conversations (chat continues after refresh)
- Persistent message storage using MongoDB
- Graceful handling of API, network, and LLM failures
- Clean, minimal, support-style user interface
- Clear separation of backend and frontend responsibilities

---

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Google Gemini API (LLM)
- dotenv
- cors

### Frontend
- React (Vite)
- Fetch API
- LocalStorage (for session persistence)
- Plain CSS / inline styling

---

## 🧠 How the Application Works

1. User opens the chat UI.
2. A `sessionId` is created (or reused from `localStorage`).
3. User sends a message.
4. Backend:
   - Stores the user message in MongoDB.
   - Fetches full conversation history.
   - Sends context + predefined store policies to the LLM.
   - Stores the AI response.
5. AI reply is returned and displayed in the UI.
6. On page reload, chat history is restored using the same session.

---

## 📦 Data Models

### Conversation
```js
{
  _id,
  createdAt
}
```

### Message
```js
{
  conversationId,
  sender: "user" | "ai",
  text,
  createdAt
}
```

---

## 🔌 API Endpoints

### POST /chat/message

Send a user message and receive an AI reply.

Request
```json
{
  "message": "What is your return policy?",
  "sessionId": "optional"
}
```
Response
```json
{
  "reply": "We accept returns within 7 days...",
  "sessionId": "abc123"
}
```
---

### GET /chat/history/:sessionId
Fetch the full chat history for a session.

Response
```json
{
  "messages": [
    { "sender": "user", "text": "Hello" },
    { "sender": "ai", "text": "Hi, how can I help?" }
  ]
}
```

---

## 🤖 LLM Integration
- Provider: Google Gemini
- Model: Gemini Flash (Preview)
- The LLM is encapsulated inside a dedicated service layer.
- Store policies (shipping, returns, support hours) are injected via prompt context.
- Full conversation history is provided for contextual replies.
- LLM or API failures are handled gracefully with a fallback response.

--- 

## 🛡️ Error Handling & Robustness
 - Empty messages are validated and blocked.
 - Invalid session IDs are handled safely.
 - LLM/API failures do not crash the server.
 - Frontend displays friendly fallback messages.
 - Application remains stable under bad input or network issues.

---

## 🛠️ Environment Variables

**Backend (`spur-chat-backend/.env`):**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/spur_chat
GEMINI_API_KEY=your_gemini_api_key_here
```

**Frontend (`spur-chat-frontend/.env`):**
```
VITE_BACKEND_URL=http://localhost:5000
```

> **Note:** Frontend environment variables are for configuration only and are not secret.

---

## ▶️ Running the Project Locally

**Backend:**
```sh
cd spur-chat-backend
npm install
npm run dev
```
Backend runs on:  
[http://localhost:5000](http://localhost:5000)

**Frontend:**
```sh
cd spur-chat-frontend
npm install
npm run dev
```
Frontend runs on:  
[http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment

- **Backend:** https://spur-chat-backend-l1l3.onrender.com/
- **Frontend:** https://spur-ai-live-chat.netlify.app/

_Live deployment URLs will be added after deployment is complete._

---

## 🔍 Trade-offs & Future Improvements

- Authentication is intentionally left out for simplicity.
- Redis caching could accelerate session retrieval.
- Multi-channel support (WhatsApp, Instagram, etc.) can be added.
- UI improvements: typing indicators, themes, and more are possible.

---
## 🔍 Trade-offs & Future Improvements

- Authentication is intentionally skipped to keep the flow simple.
- Redis caching can be added for faster session access.
- Multi-channel support (WhatsApp, Instagram, etc.) can be integrated.
- UI enhancements like typing indicators and themes can be added.

--- 
## 👤 Author

Saras Mishra
MERN Stack Developer
