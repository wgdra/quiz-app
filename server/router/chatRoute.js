const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

// CONVERSATION
router.route("/conversation/:id").get(chatController.getConversationUser);
router.route("/conversation").post(chatController.createConversation);

// MESSAGES
router.route("/messages/:id").get(chatController.getMessagesConversation);
router.route("/messages").post(chatController.createMessages);

module.exports = router;
