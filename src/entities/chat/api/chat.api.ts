import { api } from "~/shared/api/api";
import { TChat, TChatCreate, TMessageType } from "~/shared/types/chat-type";

const getMyChats = async (): Promise<{ data: TChat[] }> => {
  return await api.get("/chat/getMyChats");
};
const createChat = async (body: TChatCreate) => {
  return await api.post("/chat/create", body);
};
const getMessages = async (
  chatId: string,
  cursor: number,
  offset: number
): Promise<{
  items: TMessageType[];
  nextCursor: number;
}> => {
  const { data } = await api.get(
    `/chat/messages/get?chatId=${chatId}&cursor=${cursor}&limit=${10}&offset=${offset}`
  );
  return data;
};
export const chatApi = {
  getMyChats,
  createChat,
  getMessages,
};
