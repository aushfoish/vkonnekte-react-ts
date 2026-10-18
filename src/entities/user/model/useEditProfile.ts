import { supabaseFetch } from "@/shared/api";
import {  ProfilesSchema,  type ProfileItem } from "@/shared/api/schemas/userProfileSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditProfile = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<ProfileItem> & {id: number}) => {
      const updatedProfile = {
        user_id: payload.user_id,
        firstname: payload.firstname,
        lastname: payload.lastname,
        bio: payload.bio,
        avatar: payload.avatar,
        city: payload.city,
        workplace: payload.workplace,
        birthday: payload.birthday,
        contacts: {
          city: payload.contacts?.city,
          github: payload.contacts?.github,
          mobile: payload.contacts?.mobile,
          telegram: payload.contacts?.telegram,
        },
        // personal: {
        //   activity: payload.personal?.activity,
        //   hobbies: payload.personal?.hobbies,  
        //   movies: payload.personal?.movies,    
        //   music: payload.personal?.music,      
        //   quotes: payload.personal?.quotes     
        // }
        
      }
      const response = await supabaseFetch(`/rest/v1/users?id=eq.${payload.id}`, {
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