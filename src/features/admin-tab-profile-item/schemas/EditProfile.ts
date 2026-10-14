import type { ProfileItem } from "@/shared/api/schemas/userProfileSchema";

export type EditProfileState = {
  isEditing: boolean;
  values: Partial<ProfileItem>;
};