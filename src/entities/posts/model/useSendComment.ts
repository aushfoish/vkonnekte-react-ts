import { supabaseFetch } from "@/shared/api";
import { CommentsSendSchema, type commentToSend } from "@/shared/api/schemas/postCommSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendComment = (postId: number) => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: {
      content: string;
      // contentPicture: string;
      postId: number
    }) => {
      const authorId = localStorage.getItem('current_user_id')

      const newPost: commentToSend = {
        content: payload.content,
        // imageContentSrc: payload.contentPicture,
        author_id: authorId,
        post_id: payload.postId,
      };

      const response = await supabaseFetch("/rest/v1/comments", {
        method: "POST",
        headers: {
          Prefer: "return=representation",
        },
        body: JSON.stringify(newPost),
      });

      if (!response?.ok) throw new Error(`Ошибка: ${response?.status}`);

      const createdPosts = CommentsSendSchema.parse(await response.json());
      return createdPosts[0];
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", postId] })
    },
    onError: (error) => {
      console.error(
        error instanceof Error ? error.message : "Неизвестная ошибка",
        error,
      );
    },
  });
};
