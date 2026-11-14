import { useAuthStore } from '@/entities/user/model/useAuthStore';
import styles from './Header.module.scss'

interface AppHeaderProps {
  onToggleMp3: (isShowed: boolean) => void;
  onUnauthorize: () => void;
}

export const AppHeader = (props: AppHeaderProps) => {
  const { onToggleMp3, onUnauthorize } = props;

  const userLoggedCheck = useAuthStore((state) => state.currentUserId)

  
 
  
  return (
    <header className={styles.header}>
      <div className={styles.headerWidget}>
        <a>
          <span className={styles.headerBSign}>В</span>КОННЕКТЕ
        </a>
      </div>
      <nav className={styles.headerNav}>
        <ul className={styles.headerButtonsList}>
          <li className={styles.headerButtons} role="button" onClick={() => onToggleMp3(false)}>музыка</li>
          <li className={styles.headerButtons} role="button" onClick={() => onUnauthorize()}>{userLoggedCheck !== null ? "выйти" : "авторизоваться"}</li>
        </ul>
      </nav>
    </header>
  );
};
