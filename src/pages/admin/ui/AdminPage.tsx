import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { AuthorizationPage } from "@/pages/auth";
import { AdminProfileTable } from "@/widgets/admin-table-profile/AdminProfileTable";
// import { useState } from "react";

export const AdminPage = () => {
  // const [isAdmin] = useState(true);
  // if (isAdmin) return <AdminControl />;
  const currentUserId = useAuthStore((state) => state.currentUserId)
  const userIsLogged = useAuthStore((state) => state.userIsLogged)

  const checkAuth = currentUserId && userIsLogged

  if (!checkAuth) 
    return (
      <div className="banner">
        <h3 style={{textAlign: "center"}}>Здесь находится форма редактирования профиля, но поскольку вы не авторизованы - редактировать нечего. Однако...</h3>
        <AuthorizationPage />
      </div>
    )

  if (checkAuth) 
    return (
      <AdminProfileTable />
    )
  
};

export default AdminPage