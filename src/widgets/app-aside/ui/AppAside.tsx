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
            path = loggedUser ? `profile/${loggedUser}` : "login"
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
