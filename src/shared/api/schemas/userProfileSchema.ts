import z from "zod";


export const UserProfileSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string(),
  avatar: z.string(),
  city: z.string(),
  workplace: z.string()
})

export type ProfileItem = z.infer<typeof UserProfileSchema>

export const ProfilesSchema = z.array(UserProfileSchema)

export interface ProfileItemProps extends ProfileItem {
    onDelete?: () => void,
    onEdit?: () => void,
}

export type Profiles = z.infer<typeof ProfilesSchema>

