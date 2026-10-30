import { AsideNavBtn } from "@/shared/ui";
import styles from './Aside.module.scss'
import { useAuthStore } from "@/entities/user/model/useAuthStore";

const NAV_ITEMS = [
  { id: "my-page", label: "Моя Страница" },
  { id: "my-audio", label: "Мои Аудиозаписи" },
];

export const AppAside = () => {
  const loggedUser = useAuthStore((state) => state.currentUserId)
  
  return (
    <aside className={styles.sideNavigation}>
      <nav className={styles.navigationMain}>
          {NAV_ITEMS.map((item) => {
          let path = item.id
          if (item.id === "my-page") {
            path = loggedUser ? `profile/${loggedUser}` : `profile/c849ba0e-1a02-4d1b-8042-01d801e3c7b1`
          }
          return (
           <AsideNavBtn
              className=""
              id={path}
              children={item.label}
              key={item.id}
            />)
          })}
      </nav>
    </aside>
  );
};
