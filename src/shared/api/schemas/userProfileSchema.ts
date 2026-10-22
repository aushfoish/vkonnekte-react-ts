import z from "zod";


export const UserProfileSchema = z.object({
  user_id: z.string(),
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string().nullable(),
  avatar: z.string().nullable(),
  birthday: z.string().nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  languages: z.string().nullable(),
  workplace: z.string().nullable(),
  birth_location: z.string().nullable(),
  website: z.string().nullable(),
  phone_number: z.string().nullable(),
  activities: z.string().nullable(),
  hobbies: z.string().nullable(),
  music_genres: z.string().nullable(),
  favorite_games: z.string().nullable(),
  favorite_movies: z.string().nullable(),
  favorite_quotes: z.string().nullable(),
  about_me: z.string().nullable(),
})

export type ProfileItem = z.infer<typeof UserProfileSchema>

export const ProfilesSchema = z.array(UserProfileSchema)

export interface ProfileItemProps extends ProfileItem {
    onDelete?: () => void,
    onEdit?: () => void,
}

export type Profiles = z.infer<typeof ProfilesSchema>

