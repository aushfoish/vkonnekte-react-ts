import { useAuthStore } from "@/entities/user/model/useAuthStore";
import styles from './CurrentUserWidget.module.scss'

export const CurrentUserWidget = () => {
  const currentUserName = useAuthStore((state) => state.userName);
  const currentUserPic = useAuthStore((state) => state.userPic);
  const userIsLogged = useAuthStore((state) => state.userIsLogged);

  if (userIsLogged)
  return (
    <div className={styles.currentUser}>
      <img
        className={styles.headerUserpic}
        src={currentUserPic}
        alt={`Это ваша фотография: ${currentUserName}`}
      ></img>
      <div className={styles.headerUsername}>
        <p className={styles.headerUsername}>{currentUserName}</p>
        {userIsLogged && <p className={styles.headerSubscriptio}>(это вы)</p>}
      </div>
    </div>
  );
};
