import { ChatType } from "../enums/chat-enum";
import { TUser } from "./user-type";

export type TChat = {
  id: string;
  name: string;
  description: string;
  interlocutors: Omit<TUser, "config">[];
  type: ChatType;
  message: TMessageType;
};

export type TChatCreate = {
  userIds: string[];
  name?: string;
  description?: string;
};

export type TMessageType = {
  ownerId: string;
  text: string;
  createdAt: string;
  id: string;
  chatId: string;
  interlocutor: TUser;
};
export type TSearchMessageType = Pick<
  TMessageType,
  "chatId" | "id" | "text" | "createdAt"
>;
export type TMessageResponseType = {
  messages: TMessageType[];
  maxPages: number;
};
