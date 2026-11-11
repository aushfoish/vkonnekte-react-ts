import z from "zod";

export const UserPostSchema = z.object({
  id: z.number(),
  content: z.string(),
  date: z.string(),
  imageContentSrc: z.string(),
  wall_id: z.string(),
  author_id: z.string().nullable(),
  author: z.object({
    avatar: z.string().nullable(),
    lastname: z.string().nullable(),
    firstname: z.string().nullable(),
  })
});

export const UserPostsSchema = z.array(UserPostSchema)

export type UserPost = z.infer<typeof UserPostSchema>;

export const PostToEditSchema = UserPostSchema.omit({
  author: true,
})

export const EditedPostsSchema = z.array(PostToEditSchema)

export type SentPost = z.infer<typeof PostToEditSchema>

export interface PostCardProps extends UserPost {
    onDelete?: () => void;
    onEdit?: () => void;
}


export type UserPosts = z.infer<typeof UserPostsSchema>