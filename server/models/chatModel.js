const Joi = require("joi");
const connect = require("../database/connect");
const { ObjectId } = require("mongodb");
const userModel = require("./userModel");

// SCHEMA
const COLLECTION_CONVERSATION = "Conversation";
const COLLECTION_SCHEMA_CONVERSATION = Joi.object({
  members: Joi.object().default({}),
});

const COLLECTION_MESSAGES = "Messages";
const COLLECTION_SCHEMA_MESSAGES = Joi.object({
  conversationId: Joi.string().default(""),
  senderId: Joi.string().default(""),
  message: Joi.string().default(""),
});

// CONVERSATION
const getConversationUser = async (userId) => {
  try {
    const conversations = await connect
      .GET_DB()
      .collection(COLLECTION_CONVERSATION)
      .find({ members: { $in: [new ObjectId(userId)] } })
      .toArray();

    const conversationUserData = Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member.toString() !== new ObjectId(userId).toString()
        );

        const user = await userModel.getOneUser(receiverId);
        return {
          user: {
            receiverId: user._id,
            email: user.email,
            full_name: user.full_name,
          },
          conversationId: conversation._id,
        };
      })
    );

    return conversationUserData;
  } catch (error) {
    throw new Error(error);
  }
};

const createConversation = async (reqBody) => {
  try {
    const { senderId, receiverId } = reqBody;

    const createNew = await connect
      .GET_DB()
      .collection(COLLECTION_CONVERSATION)
      .insertOne({
        members: [new ObjectId(senderId), new ObjectId(receiverId)],
      });

    return createNew;
  } catch (error) {
    throw new Error(error);
  }
};

// MESSAGES
const getMessagesConversation = async (conversationId) => {
  try {
    const messages = await connect
      .GET_DB()
      .collection(COLLECTION_MESSAGES)
      .find({ conversationId: new ObjectId(conversationId) })
      .toArray();

    const messageUserData = Promise.all(
      messages.map(async (message) => {
        const user = await userModel.getOneUser(message.senderId);
        return {
          user: {
            id: user._id,
            email: user.email,
            full_name: user.full_name,
          },
          message: message.message,
        };
      })
    );

    return messageUserData;
  } catch (error) {
    throw new Error(error);
  }
};

const createMessages = async (reqBody) => {
  try {
    const { conversationId, senderId, message, receiverId } = reqBody;

    if (conversationId === null) {
      const newCoversation = await connect
        .GET_DB()
        .collection(COLLECTION_CONVERSATION)
        .insertOne({
          members: [new ObjectId(senderId), new ObjectId(receiverId)],
        });

      const newMessage = await connect
        .GET_DB()
        .collection(COLLECTION_MESSAGES)
        .insertOne({
          conversationId: new ObjectId(newCoversation.insertedId),
          senderId: new ObjectId(senderId),
          message,
        });

      return newMessage;
    }

    const newMessage = await connect
      .GET_DB()
      .collection(COLLECTION_MESSAGES)
      .insertOne({
        conversationId: new ObjectId(conversationId),
        senderId: new ObjectId(senderId),
        message,
      });

    return newMessage;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  COLLECTION_CONVERSATION,
  COLLECTION_SCHEMA_CONVERSATION,

  COLLECTION_MESSAGES,
  COLLECTION_SCHEMA_MESSAGES,

  getConversationUser,
  createConversation,

  getMessagesConversation,
  createMessages,
};
