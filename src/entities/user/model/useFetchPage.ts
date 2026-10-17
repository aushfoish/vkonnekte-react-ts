import { useFetchProfile } from "@/entities/user/model/useFetchProfile";


export interface Friend {
  id: number;
  name: string;
  userpic: string;
  isOnline: boolean;
}


export const useUserProfileData = () => {
  const { profile } = useFetchProfile("c849ba0e-1a02-4d1b-8042-01d801e3c7b1");
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
