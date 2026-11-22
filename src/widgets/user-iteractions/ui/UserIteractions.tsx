// import { UserFriends } from "@/widgets/user-friends/ui/UserFriends";
import { UserPicture } from "@/entities/user";
import { UserActions } from "@/widgets/user-actions";
import styles from './UserIteractions.module.scss'

export const UserIteractions = () => {
  return (
    <div className={styles.userIteractions}>
      <UserPicture />

      <UserActions />

      {/* <UserFriends /> */}
    </div>
  );
};
