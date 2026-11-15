import { AdminAuthModule } from "@/features/pass-the-authorization/ui/AdminAuthModule";
import { ModalWindow } from "@/shared/ui/ModalWindow/ModalWindow";
import { AnimatePresence } from "framer-motion";
import style from './style.module.scss'

export const MainPageAuthorization = () => {

  return (
    <AnimatePresence>
        <ModalWindow
          children={
          <div className={style.authModule}>
            <AdminAuthModule />
          </div>
        }
          label="Авторизация"
          id="auth"
        />
    </AnimatePresence>
  );
};
