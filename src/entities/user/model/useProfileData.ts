import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import { useParams } from "react-router-dom";


export interface Friend {
  id: number;
  name: string;
  userpic: string;
  isOnline: boolean;
}


export const useUserProfileData = () => {
  const {userId} = useParams()
  const { profile } = useFetchProfile(userId);
  return profile
}
 


export const useSelectFirstname = () => useUserProfileData()?.firstname;
export const useSelectLastname = () => useUserProfileData()?.lastname;
export const useSelectBio = () => useUserProfileData()?.bio;
export const useSelectAvatar = () => useUserProfileData()?.avatar;
export const useSelectBirthday = () => useUserProfileData()?.birthday
export const useSelectCountry = () => useUserProfileData()?.country
export const useSelectCity = () => useUserProfileData()?.city;
export const useSelectWorkplace = () => useUserProfileData()?.workplace;
export const useSelectLanguages = () => useUserProfileData()?.languages;
export const useSelectBirthLocation = () => useUserProfileData()?.birth_location
export const useSelectWebsite = () => useUserProfileData()?.website
export const useSelectPhone = () => useUserProfileData()?.phone_number
export const useSelectActivities = () => useUserProfileData()?.activities
export const useSelectHobbies = () => useUserProfileData()?.hobbies
export const useSelectMusic = () => useUserProfileData()?.music_genres
export const useSelectGames = () => useUserProfileData()?.favorite_games
export const useSelectMovies = () => useUserProfileData()?.favorite_movies
export const useSelectQuotes = () => useUserProfileData()?.favorite_quotes
export const useSelectAbout = () => useUserProfileData()?.about_me

export const ContactsInfoCheck = useSelectBirthLocation || useSelectWebsite || useSelectPhone
export const PersonalInfoCheck = useSelectActivities || useSelectHobbies || useSelectMusic || useSelectGames || useSelectMovies || useSelectQuotes || useSelectAbout