const express = require("express");
const {
  sendMessage,
  getChatHistory
} = require("../controllers/chat.controller");

const router = express.Router();

router.post("/message", sendMessage);
router.get("/history/:sessionId", getChatHistory);

module.exports = router;
