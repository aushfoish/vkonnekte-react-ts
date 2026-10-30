import { AdminAuthModule } from "@/features/pass-the-authorization/ui/AdminAuthModule";
import { GuestAuthMode } from "@/features/pass-the-authorization/ui/GuestAuthModule";
import { ModalWindow } from "@/shared/ui/ModalWindow/ModalWindow";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import style from './style.module.scss'

export const MainPageAuthorization = () => {
  const [modalClosed, setModalClosed] = useState(false);

  return (
    <AnimatePresence>
      {modalClosed === false && (
        <ModalWindow
          children={
          <div className={style.authModule}>
            <AdminAuthModule onClose={() => setModalClosed(true)}/>
            <GuestAuthMode onClose={() => setModalClosed(true)} /> 
          </div>
        }
          label="Авторизация"
          id="auth"
        />
      )}
    </AnimatePresence>
  );
};
