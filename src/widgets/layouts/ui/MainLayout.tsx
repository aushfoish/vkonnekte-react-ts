import { AudioMainpageVidget } from "@/pages/music/ui/AudioMainpageVidget";
import { AppAside } from "@/widgets/app-aside";
import { AppHeader } from "@/widgets/app-header";
import { MainPageAuthorization } from "@/widgets/authorization-window";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from './MainLayout.module.scss'

export const MainLayout = () => {
  const [vidgetOpened, setVidgetOpened] = useState(false);
  
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
        onUnauthorize={() => {
          localStorage.removeItem("userdata");
          window.location.reload();
        }}
      />
      <MainPageAuthorization />

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