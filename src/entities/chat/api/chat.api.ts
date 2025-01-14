import { api } from "~/shared/api/api";

const getMyChats = async () => {
  return await api.get("/chat/getMyChats");
};
const createChat = async (body: {
  userIds: string;
  name: string;
  description?: string;
}) => {
  return await api.post("/chat/create", body);
};
export const chatApi = {
  getMyChats,
  createChat,
};
