import z from "zod";

export const PostSchema = z.object({
  inputPost: z.string().trim().min(1, "Поле ввода не может быть пустым")
});