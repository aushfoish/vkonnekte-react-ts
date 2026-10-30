import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { Navigate } from "react-router-dom";

export const RootRedirect = () => {
  const myId = useAuthStore((state) => state.currentUserId);

  if (myId) {
    return <Navigate to={`profile/${myId}`} replace />;
  }

};