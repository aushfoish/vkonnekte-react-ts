import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useParams } from "react-router-dom";

export const PageOwnerCheck = () => {
  const { userId } = useParams();
  const currentUserId = useAuthStore((state) => state.currentUserId);

  const userIsOwner: boolean = userId === currentUserId 
  return userIsOwner
};
