import React from "react";
import { PostAuthor } from "./PostAuthor";
import { PostAuthorPic } from "./PostAuthorPic";
import { PostText } from "./PostText";
import { PostShareAndDate } from "./PostShareDate";
import styles from "./WallPost.module.scss";

export interface AccountWallPostProps {
  id: number;
  label: string;
  date: string;
  imgSrc: string;
  userPicSrc: string;
  text: string;
  alt: string;
}

export const AccountWallPost = React.memo((props: AccountWallPostProps) => {
  const { id, label, text, date, imgSrc, userPicSrc, alt } = props;

  return (
    <div className={styles.postGenuinely} id={String(id)}>
      <PostAuthorPic src={userPicSrc} alt={`Фотография пользователя ${alt}`} />

      <div className={styles.contentPost}>
        <PostAuthor label={label} />

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
