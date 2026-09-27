import { ModalWindow } from "@/shared/ui/ModalWindow/ModalWindow";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AdminAuthModule } from "@/features/pass-the-authorization/ui/AdminAuthModule";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/entities/user/model/useAuthStore";


export const AdminAuth = () => {
  const [modalClosed, setModalClosed] = useState(false);
  const userIsAdmin = useAuthStore((state) => state.userIsAdmin)
  const admin = useAuthStore((state) => state.admin)
  

  useEffect(() => {
    admin()
  },[admin, userIsAdmin] )

  if (!userIsAdmin)
    return (
      <AnimatePresence>
        {modalClosed === false && (
          <ModalWindow
            children={<AdminAuthModule onClose={() => setModalClosed(true)} />}
            label="Войти как админ"
            id="adminAuth"
          />
        )}
      </AnimatePresence>
    );

  if (userIsAdmin) {
    return <Navigate to="/admin" replace />;
  }
  
};
