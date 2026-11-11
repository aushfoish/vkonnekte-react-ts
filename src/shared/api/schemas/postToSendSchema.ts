import z from "zod";

export const PostToSendSchema = z.object({
  content: z.string(),
  imageContentSrc: z.string(),
  author_id: z.string().nullable(),
  wall_id: z.string(),
});

export const PostsSendSchema = z.array(PostToSendSchema)

export type postToSend = z.infer<typeof PostToSendSchema>;
