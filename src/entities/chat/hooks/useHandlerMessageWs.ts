import { useState, useMemo, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { chatApi } from "~/entities/chat/api/chat.api";
import { TMessageType } from "~/shared/types/chat-type";
import { ChatEvents } from "~/shared/enums/ws-enum";

import { localStorageToken } from "~/shared/local-storage/token";
import { useWebSocket } from "~/shared/hooks/useWebSocket";

export const useHandlerMessageWs = (chatId: string) => {
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  const token = localStorageToken.getAccessToken();

  const { ws } = useWebSocket();
  const [messages, setMessages] = useState<TMessageType[]>([]);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["get-messages", chatId],
      queryFn: ({ pageParam }) => chatApi.getMessages(chatId, pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
    });
  const sendMessage = useCallback(
    (chatId: string, text: string) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const payload = {
          event: ChatEvents.SEND_MESSAGE,
          payload: { chatId, text },
        };

        ws.send(JSON.stringify(payload));

        console.log("Message sent:", text);
      } else {
        console.error("WebSocket is not open. Cannot send message.");
      }
    },
    [ws]
  );
  const getMessages = () => {
    const _messages = data?.pages?.flatMap((it) => it.items) ?? [];
    console.log(_messages);
    messages.forEach((item) => {
      const exist = _messages.find((it) => it.id === item.id);

      if (!exist) {
        _messages.unshift(item);
      }
    });
    return _messages;
  };
  const _messages = useMemo(() => getMessages(), [data, messages]);
  const getNextPage = async () => {
    if (isFetching || !hasNextPage) {
      return;
    }
    await fetchNextPage();
  };
  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.event === ChatEvents.NEW_MESSAGES) {
          setMessages((prevMessages) => [...prevMessages, data.payload]);
          console.log(event);
          setNewMessageReceived((prevState) => !prevState);
        } else {
          console.warn("Unknown event:", data.event);
        }
      };
    }
  }, [token, newMessageReceived, ws]);
  return {
    messages: _messages,
    sendMessage,
    isLoading,
    getNextPage,
    newMessageReceived,
  };
};
