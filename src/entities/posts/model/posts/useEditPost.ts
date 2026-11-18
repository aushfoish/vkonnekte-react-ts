import { supabaseFetch } from "@/shared/api";
import { EditedPostsSchema, type UserPost } from "@/shared/api/schemas/userPostSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<UserPost> & {id: number}) => {
      const currentUserId = localStorage.getItem('current_user_id')
      const updatedPost = {
        content: payload.content,
        imageContentSrc: payload.imageContentSrc,
        author_id: currentUserId,
        wall_id: currentUserId
      };

      const response = await supabaseFetch(`/rest/v1/posts?id=eq.${payload.id}`, {
        method: "PATCH",
        headers: {
          Prefer: "return=representation",
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response?.ok)
        throw new Error(`Ошибка при редактировании поста: ${response?.status}`);

      const editedPosts = EditedPostsSchema.parse(await response.json())
      return editedPosts;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

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
