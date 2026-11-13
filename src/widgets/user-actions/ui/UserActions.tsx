import { Follow } from "@/features/follow-to-user/ui/Follow"
// import { SendGift } from "@/features/send-gift/ui/SendGift"
// import { FollowersButton } from "@/entities/user/ui/FollowersButton/FollowersButton"
import styles from './UserActions.module.scss'

export const UserActions = () => {

  return (
    <div className={styles.userActions}>

      <Follow />

      {/* <FollowersButton /> */}

      {/* <SendGift /> */}

    </div>
  )
}