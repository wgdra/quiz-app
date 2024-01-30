const { StatusCodes } = require("http-status-codes");
const chatService = require("../Service/chatService");

// GET CONVERSATION
const getConversationUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await chatService.getConversationUser(userId);

    res.status(StatusCodes.OK).json({ status: StatusCodes.OK, data: result });
    return result;
  } catch (error) {
    next(error);
  }
};

// Create CONVERSATION
const createConversation = async (req, res, next) => {
  try {
    const createConversation = await chatService.createConversation(req.body);

    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, data: createConversation });
  } catch (error) {
    next(error);
  }
};

// delete CONVERSATION
const deleteConversation = async (req, res, next) => {
  try {
    const conversationId = req.params.id;
    const deleteConversation = await chatService.deleteConversation(
      conversationId
    );

    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.OK, data: deleteConversation });
  } catch (error) {
    next(error);
  }
};

// GET MESSAGES
const getMessagesConversation = async (req, res, next) => {
  try {
    const conversationId = req.params.id;
    const result = await chatService.getMessagesConversation(conversationId);

    res.status(StatusCodes.OK).json({ status: StatusCodes.OK, data: result });
  } catch (error) {
    next(error);
  }
};

// Create MESSAGES
const createMessages = async (req, res, next) => {
  try {
    const createMessages = await chatService.createMessages(req.body);

    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, data: createMessages });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversationUser,
  createConversation,
  deleteConversation,
  getMessagesConversation,
  createMessages,
};
