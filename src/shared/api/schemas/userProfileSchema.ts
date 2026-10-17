import z from "zod";


export const UserProfileSchema = z.object({
  user_id: z.string(),
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string(),
  avatar: z.string(),
  birthday: z.string(),
  city: z.string(),
  languages: z.string(),
  workplace: z.string(),
  contacts: z.object({city: z.string(), github: z.string(), mobile: z.string(), telegram: z.string()}),
  personal: z.object({activity: z.string(), hobbies: z.string(), music: z.string(), movies: z.string(), quotes: z.string()})
})

export type ProfileItem = z.infer<typeof UserProfileSchema>

export const ProfilesSchema = z.array(UserProfileSchema)

export interface ProfileItemProps extends ProfileItem {
    onDelete?: () => void,
    onEdit?: () => void,
}

export type Profiles = z.infer<typeof ProfilesSchema>

