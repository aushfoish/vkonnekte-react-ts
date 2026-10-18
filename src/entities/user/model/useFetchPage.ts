import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";


export interface Friend {
  id: number;
  name: string;
  userpic: string;
  isOnline: boolean;
}


export const useUserProfileData = () => {
  const currentUserId = useAuthStore((state) => state.currentUserId)
  const { profile } = useFetchProfile(currentUserId);
  return profile
}
 


export const useSelectFirstname = () => useUserProfileData()?.firstname;
export const useSelectLastname = () => useUserProfileData()?.lastname;
export const useSelectBio = () => useUserProfileData()?.bio;
export const useSelectAvatar = () => useUserProfileData()?.avatar;
export const useSelectBirthday = () => useUserProfileData()?.birthday
export const useSelectCity = () => useUserProfileData()?.city;
export const useSelectWorkplace = () => useUserProfileData()?.workplace;
export const useSelectLanguages = () => useUserProfileData()?.languages;
export const useSelectContacts = () => useUserProfileData()?.contacts;
export const useSelectPersonal = () => useUserProfileData()?.personal;
