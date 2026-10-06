import { supabaseFetch } from "@/shared/api";
import { UserPostsSchema, type UserPost } from "@/shared/api/schemas/userPostSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<UserPost> & {id: number}) => {
      const updatedPost = {
        content: payload.content,
        username: payload.username,
        userPictureSrc: payload.userPictureSrc,
        imageContentSrc: payload.imageContentSrc
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
