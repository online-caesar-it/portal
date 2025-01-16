import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import { TChat } from "~/shared/types/chat-type";
import { useState } from "react";
export const useQueryMyChats = () => {
  const [searchString, setSearchString] = useState("");
  const { data: chats, isLoading } = useQuery<{ data: TChat[] }>({
    queryKey: ["get-my-chats", searchString],
    queryFn: () => chatApi.getMyChats(searchString),
  });
  return { chats, isLoading, searchString, setSearchString };
};
