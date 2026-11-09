import { AudioMainpageVidget } from "@/pages/music/ui/AudioMainpageVidget";
import { AppAside } from "@/widgets/app-aside";
import { AppHeader } from "@/widgets/app-header";
import { MainPageAuthorization } from "@/widgets/authorization-window";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from './MainLayout.module.scss'
import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useLogout } from "@/shared/api/useLogout";

export const MainLayout = () => {
  const [vidgetOpened, setVidgetOpened] = useState(false);
  const loggedStatus = useAuthStore((state) => state.userIsLogged)
  const logout = useLogout()
  
  return (
    <>
      <AppHeader
        onToggleMp3={() => {
          if (vidgetOpened === false) {
            setVidgetOpened(true)
          } else { 
            setVidgetOpened(false)
          }
        }}
        onUnauthorize={logout}
      />
      {loggedStatus !== true && <MainPageAuthorization />}

      {vidgetOpened === true && <AudioMainpageVidget />}

      <div className={styles.mainSection}>
        <AppAside />
        <main className={styles.appWorkSpace}>
          <Outlet />
        </main>
      </div>
    </>
  );
};