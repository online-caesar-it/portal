import { useState, useEffect, useCallback } from "react";
import { localStorageToken } from "../local-storage/token";
import { env } from "~/env";
import { EEntitiesEnum } from "../enums/entities";

export const useWebSocket = <T>(entity: EEntitiesEnum) => {
  const [ws, setWs] = useState<WebSocket>();
  const [messages, setMessages] = useState<T[]>([]);
  const token = localStorageToken.getAccessToken();
  const queryStr = entity ? `/${entity}` : "";
  useEffect(() => {
    const wsUrl = new URL(env.VITE_WS_URL + queryStr);
    wsUrl.searchParams.append("access_token", token || "");

    const socket = new WebSocket(wsUrl.toString(), "protocol");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch (error) {
        console.error("WebSocket message parsing error:", error);
      }
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
  }, [token, entity]);

  const sendMessage = useCallback(
    (payload: object) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(payload));
        console.log("WebSocket message sent:", payload);
      } else {
        console.error("WebSocket is not open. Cannot send message.");
      }
    },
    [ws]
  );

  return {
    messages,
    sendMessage,
  };
};
