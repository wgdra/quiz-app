import instance from "../utils/axiosCustomize";

// Conversation
const getConversationUser = (userId, token) => {
  return instance.get(`/api/chat/conversation/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createConversation = (data, token) => {
  return instance.post(
    `/api/chat/conversation`,
    {
      senderId: data.senderId,
      receiverId: data.receiverId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// Messages
const getMessagesConversation = (conversationId, token) => {
  return instance.get(`/api/chat/messages/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createMessages = (data, token) => {
  return instance.post(
    `/api/chat/messages/`,
    {
      conversationId: data.conversationId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      message: data.message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export {
  getConversationUser,
  createConversation,
  getMessagesConversation,
  createMessages,
};
