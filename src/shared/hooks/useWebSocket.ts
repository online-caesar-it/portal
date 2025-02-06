import { useState, useEffect, useCallback } from "react";
import { localStorageToken } from "../local-storage/token";
import { ChatEvents } from "../enums/ws-enum";
// import { TMessageType } from "../types/chat-type";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { chatApi } from "~/entities/chat/api/chat.api";
import { env } from "~/env";

export const useWebSocket = () => {
  const [ws, setWs] = useState<WebSocket>();
  // const [messages, setMessages] = useState<TMessageType[]>([]);
  const token = localStorageToken.getAccessToken();
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  useEffect(() => {
    const wsUrl = new URL(env.VITE_WS_URL);
    wsUrl.searchParams.append("access_token", token || "");

    const socket = new WebSocket(wsUrl.toString(), "protocol");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    // socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if (data.event === ChatEvents.NEW_MESSAGES) {
    //     setMessages((prevMessages) => [...prevMessages, data.payload]);
    //     console.log(event);
    //     setNewMessageReceived((prevState) => !prevState);
    //   } else {
    //     console.warn("Unknown event:", data.event);
    //   }
    // };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [token]);

  const sendMessage = useCallback(
    (chatId: string, text: string) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const payload = {
          event: ChatEvents.SEND_MESSAGE,
          payload: { chatId, text },
        };

        ws.send(JSON.stringify(payload));
        setNewMessageReceived((prevState) => !prevState);

        console.log("Message sent:", text);
      } else {
        console.error("WebSocket is not open. Cannot send message.");
      }
    },
    [ws]
  );
  // const { data, isLoading, hasNextPage, fetchNextPage, isFetching } =
  //   useInfiniteQuery({
  //     queryKey: ["get-messages", chatId],
  //     queryFn: ({ pageParam }) => chatApi.getMessages(chatId, pageParam),
  //     getNextPageParam: (lastPage) => lastPage.nextCursor,
  //     initialPageParam: 0,
  //   });
  // const getMessages = () => {
  //   const _messages = data?.pages?.flatMap((it) => it.items) ?? [];
  //   console.log(_messages);
  //   messages.forEach((item) => {
  //     const exist = _messages.find((it) => it.id === item.id);

  //     if (!exist) {
  //       _messages.unshift(item);
  //     }
  //   });
  //   return _messages;
  // };
  // const _messages = useMemo(() => getMessages(), [data, messages]);
  // const getNextPage = async () => {
  //   if (isFetching || !hasNextPage) {
  //     return;
  //   }
  //   await fetchNextPage();
  // };
  return {
    ws,
    sendMessage,
    newMessageReceived,
  };
};
