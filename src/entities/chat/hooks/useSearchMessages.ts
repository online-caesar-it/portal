import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import { useState } from "react";

export const useSearchMessages = (chatId: string) => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["search-messages", search],
    queryFn: () => chatApi.searchMessage(search, chatId),
    enabled: !!search,
  });
  return {
    messagesSearch: data,
    isMessagesSearchLoading: isLoading,
    setSearch,
    search,
  };
};
