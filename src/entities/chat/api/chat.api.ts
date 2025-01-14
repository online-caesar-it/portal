import { api } from "~/shared/api/api";
import { TChat, TChatCreate } from "~/shared/types/chat-type";

const getMyChats = async (): Promise<TChat[]> => {
  return await api.get("/chat/getMyChats");
};
const createChat = async (body: TChatCreate) => {
  return await api.post("/chat/create", body);
};
export const chatApi = {
  getMyChats,
  createChat,
};
