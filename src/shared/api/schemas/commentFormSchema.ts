import z from "zod";

export const CommentSchema = z.object({
  text: z.string().trim().min(1, "Комментарий не может быть пустым").max(150, "Слишком длинный комментарий")
});