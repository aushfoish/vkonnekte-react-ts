import { ModalWindow } from "@/shared/ui/ModalWindow/ModalWindow";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AdminAuthModule } from "@/features/pass-the-authorization/ui/AdminAuthModule";
import { Navigate } from "react-router-dom";


export const AdminAuth = () => {
  const [modalClosed, setModalClosed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  

  useEffect(() => {
    const tokenCheck = localStorage.getItem('access_token')
    if (tokenCheck) {
      // setIsAdmin(true)
    }
  },[setIsAdmin] )

  if (!isAdmin)
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

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  
};
