import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const nav = useNavigate();

  return () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("current_user_id");
    nav("/profile/c849ba0e-1a02-4d1b-8042-01d801e3c7b1");
    useAuthStore.setState({currentUserId: null, userIsLogged: false, isUserLoggining: false})
  };
};
