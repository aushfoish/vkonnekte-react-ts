import z from "zod";

export const UserPostSchema = z.object({
  id: z.number(),
  content: z.string(),
  date: z.string(),
  username: z.string(),
  userPictureSrc: z.string(),
  imageContentSrc: z.string(),
});

export const UserPostsSchema = z.array(UserPostSchema)

export type UserPost = z.infer<typeof UserPostSchema>;

export interface PostCardProps extends UserPost {
    onDelete?: () => void;
}

export type UserPosts = z.infer<typeof UserPostsSchema>