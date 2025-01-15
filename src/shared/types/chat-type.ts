import { TUser } from "./user-type";

export type TChat = {
  id: string;
  name: string;
  description: string;
  interlocutors: Omit<TUser, "config">[];
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
  owner: TUser;
};
export type TMessageResponseType = {
  messages: TMessageType[];
  maxPages: number;
};
