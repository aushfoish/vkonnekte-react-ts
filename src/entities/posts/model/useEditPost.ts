import { supabaseFetch } from "@/shared/api";
import { UserPostsSchema } from "@/shared/api/schemas/userPostSchema";
import { useMutation } from "@tanstack/react-query";

export const useEditPost = () => {
  return useMutation({
    mutationFn: async (payload: {
      id: number, 
      content: string
    }) => {
      const updatedPost = {
        content: payload.content,
      };

      const response = await supabaseFetch(`/rest/v1/posts?id=eq.${payload.id}`, {
        method: "PATCH",
        headers: {
          Prefer: "return=representation",
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok)
        throw new Error(`Ошибка при редактировании поста: ${response.status}`);

      const createdPosts = UserPostsSchema.parse(await response.json())
      return createdPosts;
    },
    onSuccess: () => {},

    onError: (error) => {
      console.error(
        error instanceof Error
          ? error.message
          : "Неизвестная ошибка при редактировании поста",
        error,
      );
    },
  });
};
