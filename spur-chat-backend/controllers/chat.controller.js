const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { generateReply } = require("../services/llm.service");

const sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // 1. Validate input
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    let conversation;

    // 2. Get or create conversation
    if (sessionId) {
      conversation = await Conversation.findById(sessionId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
    } else {
      conversation = await Conversation.create({});
    }

    // 3. Save user message
    await Message.create({
      conversationId: conversation._id,
      sender: "user",
      text: message
    });

    // 4. Fetch full conversation history
    const history = await Message.find({
      conversationId: conversation._id
    }).sort({ createdAt: 1 });

    // 5. Generate AI reply (Gemini)
    let aiReply;
    try {
      aiReply = await generateReply(history);
    } catch (err) {
      aiReply =
        "Sorry, I’m having trouble responding right now. Please try again in a moment.";
    }

    // 6. Save AI reply
    await Message.create({
      conversationId: conversation._id,
      sender: "ai",
      text: aiReply
    });

    // 7. Send response
    res.json({
      reply: aiReply,
      sessionId: conversation._id
    });
  } catch (error) {
    console.error("Chat controller error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getChatHistory = async (req, res) => {
    try {
      const { sessionId } = req.params;
  
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
      }
  
      const conversation = await Conversation.findById(sessionId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
  
      const messages = await Message.find({
        conversationId: sessionId
      })
        .sort({ createdAt: 1 })
        .select("sender text -_id");
  
      res.json({ messages });
    } catch (error) {
      console.error("Get history error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
module.exports = { sendMessage, getChatHistory };
