import z from "zod";


export const UserProfileSchema = z.object({
  user_id: z.string(),
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string(),
  avatar: z.string(),
  birthday: z.string(),
  country: z.string(),
  city: z.string(),
  languages: z.string(),
  workplace: z.string(),
  birth_location: z.string(),
  website: z.string(),
  phone_number: z.string(),
  activities: z.string(),
  hobbies: z.string(),
  music_genres: z.string(),
  favorite_games: z.string(),
  favorite_movies: z.string(),
  favorite_quotes: z.string(),
  about_me: z.string(),
})

export type ProfileItem = z.infer<typeof UserProfileSchema>

export const ProfilesSchema = z.array(UserProfileSchema)

export interface ProfileItemProps extends ProfileItem {
    onDelete?: () => void,
    onEdit?: () => void,
}

export type Profiles = z.infer<typeof ProfilesSchema>

