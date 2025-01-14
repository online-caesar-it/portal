import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
export const useQueryMyChats = () => {
  const { data: chats, isLoading } = useQuery({
    queryKey: ["get-my-chats"],
    queryFn: chatApi.getMyChats,
    queryHash: "15m",
  });
  return { chats, isLoading };
};
