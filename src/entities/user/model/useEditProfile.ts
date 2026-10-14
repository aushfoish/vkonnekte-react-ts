import { supabaseFetch } from "@/shared/api";
import {  ProfilesSchema,  type ProfileItem } from "@/shared/api/schemas/userProfileSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditProfile = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<ProfileItem> & {id: number}) => {
      const updatedProfile = {
        firstname: payload.firstname,
        lastname: payload.lastname,
        bio: payload.bio,
        avatar: payload.avatar,
        city: payload.city,
        workplace: payload.workplace
      };

      const response = await supabaseFetch(`/rest/v1/profile?id=eq.${payload.id}`, {
        method: "PATCH",
        headers: {
          Prefer: "return=representation",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok)
        throw new Error(`Ошибка при редактировании анкеты: ${response.status}`);

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