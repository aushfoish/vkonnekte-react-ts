import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { supabaseFetch } from "@/shared/api";
import type { postToSend } from "@/shared/api/schemas/postToSendSchema";
import { UserPostsSchema } from "@/shared/api/schemas/userPostSchema";
import { useMutation } from "@tanstack/react-query";

export const useSendPost = () => {
  return useMutation({
    mutationFn: async (payload: {
      content: string;
      contentPicture: string;
    }) => {
      const userName = useAuthStore.getState().userName;
      const userPic = useAuthStore.getState().userPic;

      const newPost: postToSend = {
        content: payload.content,
        username: userName,
        userPictureSrc: userPic,
        imageContentSrc: payload.contentPicture,
      };

      const response = await supabaseFetch("/rest/v1/posts", {
        method: "POST",
        headers: {
          Prefer: "return=representation",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

      const createdPosts = UserPostsSchema.parse(await response.json());
      return createdPosts[0];
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error(
        error instanceof Error ? error.message : "Неизвестная ошибка",
        error,
      );
    },
  });
};
