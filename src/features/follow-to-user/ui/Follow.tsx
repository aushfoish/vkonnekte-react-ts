import { Button } from "@/shared/ui";
import styles from "./Follow-Button.module.scss";
import { useSubscribe } from "../lib/subscribe";
import { AdminAuth } from "@/widgets/admin-authorization/ui/AdminAuth";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/entities/user/model/useAuthStore";


export const Follow = () => {

  const { subscribe, auth } = useSubscribe();

  const {userId} = useParams()
  const currentUserId = useAuthStore((state) => state.currentUserId)

  const userIsLogged = useAuthStore((state) => state.userIsLogged)

  const userIsOwner = userId === currentUserId

  if (userIsOwner && userIsLogged)
  return (
    <div className={`${styles.followButton}`}>
      <Button
        className={`${styles.follow}`}
        children="Редактировать профиль"
        onClick={subscribe}
      />
      {auth && (<AdminAuth/>)}
    </div>
  );
};
