import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const nav = useNavigate();

  return () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("current_user_id");
    nav("/auth");
    useAuthStore.setState({currentUserId: null, userIsLogged: false, isUserLoggining: false})
  };
};
