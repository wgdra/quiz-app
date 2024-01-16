const chatModel = require("../models/chatModel");

// GET CONVERSATION
const getConversationUser = async (userId) => {
  try {
    const result = await chatModel.getConversationUser(userId);

    return result;
  } catch (error) {
    throw error;
  }
};

// Create CONVERSATION MESSAGES
const createConversation = async (reqBody) => {
  try {
    const createConversation = await chatModel.createConversation(reqBody);

    return createConversation;
  } catch (error) {
    throw error;
  }
};

// GET MESSAGES
const getMessagesConversation = async (conversationId) => {
  try {
    const result = await chatModel.getMessagesConversation(conversationId);

    return result;
  } catch (error) {
    throw error;
  }
};

// Create MESSAGES
const createMessages = async (reqBody) => {
  try {
    const createMessages = await chatModel.createMessages(reqBody);

    return createMessages;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getConversationUser,
  createConversation,
  getMessagesConversation,
  createMessages,
};
