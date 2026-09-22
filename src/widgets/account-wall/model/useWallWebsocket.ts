import type { UserPosts } from "@/entities/posts/model/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useWallWebsocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let isCancelled = false;
    let ws: WebSocket | null = null;
    let heartbeatInterval: ReturnType<typeof setInterval> | undefined;

    const API_KEY = import.meta.env.VITE_SUPABASE_WEBSOCKET;

    // Возвращаем твой старый проверенный формат строки, только с новой переменной и протоколом v1, как было изначально!
    const wsUrl = `wss://tyekwqioulapfagzpswr.supabase.co/realtime/v1/websocket?apikey=${API_KEY}&vsn=1.0.0`;

    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      if (isCancelled) {
        ws?.close();
        return;
      }

      console.log("Вебсокет подключён");
      const subscribeMessage = {
        topic: "realtime:public:posts",
        event: "phx_join",
        payload: {
          config: {
            postgres_changes: [
              { event: "*", schema: "public", table: "posts" },
            ],
          },
        },
        ref: "1",
      };
      ws?.send(JSON.stringify(subscribeMessage));

      heartbeatInterval = setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              topic: "phoenix",
              event: "heartbeat",
              payload: {},
              ref: Date.now().toString(),
            }),
          );
        }
      }, 30000);
    };

    ws.onmessage = (event) => {
      if (isCancelled) return;
      const response = JSON.parse(event.data);
      const payload = response.payload;

      if (response.event === "postgres_changes") {
        const type = response.payload?.data?.type || response.payload?.type;

        if (type === "INSERT" && payload?.data?.record) {
          const newPost = payload.data.record as UserPosts;
          queryClient.setQueryData<UserPosts[]>(
            ["posts"],
            (oldPosts) => {
              if (!oldPosts) return [newPost];
              return [newPost, ...oldPosts];
            },
          );
        } else if (type === "DELETE") {
          const oldRecordID = payload?.data?.old_record.id;
          if (oldRecordID !== undefined && oldRecordID !== null) {
            queryClient.setQueryData<UserPosts[]>(
              ["posts"],
              (oldpPosts) => {
                if (!oldpPosts) return [];
                return oldpPosts.filter((post) => post.id !== oldRecordID);
              },
            );
          }
        }
      }
    };

    ws.onerror = (error) => {
      if (!isCancelled) console.error("Ошибка WS:", error);
    };

    return () => {
      isCancelled = true;
      if (heartbeatInterval) clearInterval(heartbeatInterval);

      if (ws) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      }
    };
  }, [queryClient]);
};
