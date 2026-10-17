import type { UserPost } from "@/shared/api/schemas/userPostSchema";

export type EditState = {
  isEditing: boolean;
  values: Partial<UserPost>;
};