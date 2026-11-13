import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { Navigate } from "react-router-dom";

export const RootRedirect = () => {
  const myId = useAuthStore.getState().currentUserId;

  if (myId) {
    return <Navigate to={`profile/${myId}`} replace />;
  }

  if (!myId) {
    return <Navigate to ={`auth`} replace />
  }

};