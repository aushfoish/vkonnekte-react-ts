import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { AdminAuthModule } from "@/features/pass-the-authorization";
import { Navigate } from "react-router-dom";

export const AuthorizationPage = () => {
  const currentUserId = useAuthStore((state) => state.currentUserId)

  if (!currentUserId)
    return (
      <div>
        <AdminAuthModule />
      </div>
    );

  if (currentUserId) 
    return (
        <Navigate to={`/profile/${currentUserId}`} />
    )
};
