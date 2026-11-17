import z from "zod";
import { UserPostSchema } from "./userPostSchema";

export const PostCommSchema = UserPostSchema.omit({
  wall_id: true,
  imageContentSrc: true,
})

export const PostsCommentariesSchema = z.array(PostCommSchema)

export const CommentToSendSchema = z.object({
  content: z.string(),
  // imageContentSrc: z.string(),
  author_id: z.string().nullable(),
  post_id: z.number()
})

export const CommentsSendSchema = z.array(CommentToSendSchema)

export type PostCommProps = z.infer<typeof PostCommSchema>
export type commentToSend = z.infer<typeof CommentToSendSchema>
export type postsComments = z.infer<typeof PostsCommentariesSchema>