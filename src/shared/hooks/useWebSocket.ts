import { useState, useEffect, useCallback } from "react";
import { localStorageToken } from "../local-storage/token";
import { ChatEvents } from "../enums/ws-enum";
import { env } from "~/env";

export const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket>();
  const token = localStorageToken.getAccessToken();
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  useEffect(() => {
    const wsUrl = new URL(env.VITE_WS_URL + url);
    wsUrl.searchParams.append("access_token", token || "");

    const socket = new WebSocket(wsUrl.toString(), "protocol");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

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

  return {
    ws,
    sendMessage,
    newMessageReceived,
  };
};
