import { supabaseFetch } from "@/shared/api";
import {  ProfilesSchema,  type ProfileItem } from "@/shared/api/schemas/userProfileSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserpic = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<ProfileItem> & {id: number}) => {
      const updatedProfile = {
        avatar: payload.avatar,
        avatar_mini_50: payload.avatar_mini_50,
        avatar_main_page: payload.avatar_main_page
      }
      const response = await supabaseFetch(`/rest/v1/users?id=eq.${payload.id}`, {
        method: "PATCH",
        headers: {
          Prefer: "return=representation",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response?.ok)
        throw new Error(`Ошибка при редактировании анкеты: ${response?.status}`);

      const editedProfile = ProfilesSchema.parse(await response.json())
      return editedProfile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileOwner"] });
    },

    onError: (error) => {
      console.error(
        error instanceof Error
          ? error.message
          : "Неизвестная ошибка при редактировании анкеты",
        error,
      );
    },
  });
}