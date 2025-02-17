import { api } from "~/shared/api/api";
import {
  TChat,
  TChatCreate,
  TMessageType,
  TSearchMessageType,
} from "~/shared/types/chat-type";

const getMyChats = async (search: string): Promise<{ data: TChat[] }> => {
  return await api.get(`/chat/getMyChats?search=${search}`);
};
const createChat = async (body: TChatCreate) => {
  return await api.post("/chat/create", body);
};
const getMessages = async (
  chatId: string,
  cursor: number
): Promise<{
  items: TMessageType[];
  nextCursor: number;
}> => {
  const { data } = await api.get(
    `/chat/messages/get?chatId=${chatId}&cursor=${cursor}&limit=${30}`
  );
  return data;
};
const searchMessage = async (
  search: string,
  chatId: string
): Promise<TSearchMessageType[]> => {
  const { data } = await api.get(
    `/chat/messages/search?chatId=${chatId}&search=${search}`
  );
  return data;
};
export const chatApi = {
  getMyChats,
  createChat,
  getMessages,
  searchMessage,
};
