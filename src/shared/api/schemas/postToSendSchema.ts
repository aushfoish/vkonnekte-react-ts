import z from "zod";

export const PostToSendSchema = z.object({
  content: z.string(),
  imageContentSrc: z.string(),
  author_id: z.string().nullable(),
  wall_id: z.string(),
});

export const CommentToSendSchema = z.object({
  content: z.string(),
  // imageContentSrc: z.string(),
  author_id: z.string().nullable(),
  post_id: z.number()
})


export const PostsSendSchema = z.array(PostToSendSchema)

export type postToSend = z.infer<typeof PostToSendSchema>;

export const CommentsSendSchema = z.array(CommentToSendSchema)

export type commentToSend = z.infer<typeof CommentToSendSchema>