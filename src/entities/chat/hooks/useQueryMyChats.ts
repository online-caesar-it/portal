import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import { TChat } from "~/shared/types/chat-type";
export const useQueryMyChats = () => {
  const { data: chats, isLoading } = useQuery<TChat[]>({
    queryKey: ["get-my-chats"],
    queryFn: chatApi.getMyChats,
  });
  return { chats, isLoading };
};
