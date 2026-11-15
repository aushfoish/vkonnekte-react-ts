import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { MainPageAuthorization } from "@/widgets/authorization-window";
import { Navigate } from "react-router-dom";

export const AuthorizationPage = () => {
  const currentUserId = useAuthStore.getState().currentUserId;
  const loggedStatus = useAuthStore.getState().userIsLogged;

  if (!loggedStatus)
    return (
      <div>
        <MainPageAuthorization />
      </div>
    );

  if (loggedStatus) 
    return (
        <Navigate to={`/profile/${currentUserId}`} />
    )
};
