
import { useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/entities/user/model/useAuthStore";


export const AdminAuth = () => {
  const userIsAdmin = useAuthStore((state) => state.userIsAdmin)
  const admin = useAuthStore((state) => state.admin)
  

  useEffect(() => {
    admin()
  },[admin, userIsAdmin] )

    return <Navigate to="/admin" replace />;
};
