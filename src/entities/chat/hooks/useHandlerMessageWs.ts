import { useState, useMemo, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { chatApi } from "~/entities/chat/api/chat.api";
import { TMessageType } from "~/shared/types/chat-type";
import { ChatEvents } from "~/shared/enums/ws-enum";
import { useWebSocket } from "~/shared/hooks/useWebSocket";
import { EEntitiesEnum } from "~/shared/enums/entities";

type TChatWebSocketMessage =
  | { event: ChatEvents.NEW_MESSAGES; payload: TMessageType }
  | {
      event: ChatEvents.SEND_MESSAGE;
      payload: { chatId: string; text: string };
    };

export const useHandlerMessageWs = (chatId: string) => {
  const { messages: wsMessages, sendMessage } =
    useWebSocket<TChatWebSocketMessage>(EEntitiesEnum.CHAT);
  const [messages, setMessages] = useState<TMessageType[]>([]);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["get-messages", chatId],
      queryFn: ({ pageParam }) => chatApi.getMessages(chatId, pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
    });

  useMemo(() => {
    wsMessages.forEach((msg) => {
      if (msg.event === ChatEvents.NEW_MESSAGES) {
        setMessages((prev) => [...prev, msg.payload]);
      }
    });
  }, [wsMessages]);

  const getMessages = () => {
    const _messages = data?.pages?.flatMap((it) => it.items) ?? [];
    messages.forEach((item) => {
      if (!_messages.find((it) => it.id === item.id)) {
        _messages.unshift(item);
      }
    });
    return _messages;
  };

  const _messages = useMemo(() => getMessages(), [data, messages]);

  const sendChatMessage = useCallback(
    (text: string) => {
      sendMessage({
        event: ChatEvents.SEND_MESSAGE,
        payload: { chatId, text },
      });
    },
    [chatId, sendMessage]
  );

  const getNextPage = async () => {
    if (isFetching || !hasNextPage) return;
    await fetchNextPage();
  };

  return {
    messages: _messages,
    sendMessage: sendChatMessage,
    isLoading,
    getNextPage,
  };
};
