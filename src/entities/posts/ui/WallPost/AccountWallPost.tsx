import React from "react";
import { PostAuthor } from "./PostAuthor";
import { PostAuthorPic } from "./PostAuthorPic";
import { PostText } from "./PostText";
import { PostShareAndDate } from "./PostShareDate";
import styles from "./WallPost.module.scss";
import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/ui";

export interface AccountWallPostProps {
  id: number;
  label: string;
  date: string;
  imgSrc: string;
  userPicSrc: string;
  text: string;
  alt: string;
  deletePost: () => void
}

export const AccountWallPost = React.memo((props: AccountWallPostProps) => {
  const { id, label, text, date, imgSrc, userPicSrc, alt, deletePost } = props;

  const currentUserId = useAuthStore((state) => state.currentUserId)
  const {userId} = useParams()

  const wallIsMine = currentUserId === userId

  return (
    <div className={styles.postGenuinely} id={String(id)}>
      <PostAuthorPic src={userPicSrc} alt={`Фотография пользователя ${alt}`} />

      <div className={styles.contentPost}>
        <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
          <PostAuthor label={label} />
          {wallIsMine && deletePost && (<Button className={styles.option} onClick={deletePost} children="Удалить пост"/>)}
        </div>
        

        {text && <PostText text={text} id={id} />}

        {imgSrc && (
          <img
            className={styles.contentPicture}
            src={imgSrc}
            alt={`Графическое изображение, опубликованное пользователем ${alt}`}
          ></img>
        )}

        <PostShareAndDate date={date} />
      </div>
    </div>
  );
});

AccountWallPost.displayName = "post-genuinely";
