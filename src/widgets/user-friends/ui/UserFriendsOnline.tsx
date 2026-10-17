
import { Micro_header } from "@/entities/posts";
// import { FriendsWindowFriends } from "@/entities/user";
import styles from './userFriends.module.scss'
// import { useFetchProfile } from "@/entities/user/model/useFetchProfile";

export const UserFriendsOnline = () => {
  // const {friendsCount} = useFetchProfile();
  return (
    <div className={styles.friendsBlock}>
      <Micro_header children="Друзья" count={`${25} друзей`} />

      {/* <FriendsWindowFriends /> */}
    </div>
  );
};
