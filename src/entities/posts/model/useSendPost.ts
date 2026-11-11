import { supabaseFetch } from "@/shared/api";
import { PostsSendSchema, type postToSend } from "@/shared/api/schemas/postToSendSchema";
import { useMutation } from "@tanstack/react-query";

export const useSendPost = () => {
  return useMutation({
    mutationFn: async (payload: {
      content: string;
      contentPicture: string;
      wallId: string
    }) => {
      const authorId = localStorage.getItem('current_user_id')

      const newPost: postToSend = {
        content: payload.content,
        imageContentSrc: payload.contentPicture,
        author_id: authorId,
        wall_id: payload.wallId,
      };

      const response = await supabaseFetch("/rest/v1/posts", {
        method: "POST",
        headers: {
          Prefer: "return=representation",
        },
        body: JSON.stringify(newPost),
      });

      if (!response?.ok) throw new Error(`Ошибка: ${response?.status}`);

      const createdPosts = PostsSendSchema.parse(await response.json());
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
