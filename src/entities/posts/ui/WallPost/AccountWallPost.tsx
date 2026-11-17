import React from "react";
import { PostAuthor } from "./PostAuthor";
import { PostAuthorPic } from "./PostAuthorPic";
import { PostText } from "./PostText";
import { PostShareAndDate } from "./PostShareDate";
import styles from "./WallPost.module.scss";
import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/ui";
import placeholder from "@/shared/assets/1aa4cedee524828a8ac40cb77adfa233.jpg";

import type { PostCardProps } from "@/shared/api/schemas/userPostSchema";
import { CommentsBlock } from "@/widgets/comments-block";

export const AccountWallPost = React.memo((props: PostCardProps) => {
  const { id, author_id, content, imageContentSrc, author, date, onDelete } =
    props;

  const currentUserId = useAuthStore((state) => state.currentUserId);
  const { userId } = useParams();

  const wallIsMine = currentUserId === userId;

  return (
    <div className={styles.postGenuinely} id={String(id)}>
      <PostAuthorPic
        authorId={author_id}
        src={author.avatar ? author.avatar : placeholder}
        alt={`Фотография пользователя ${author.firstname} ${author.lastname}`}
      />

      <div className={styles.contentPost}>
        <div className={styles.postOptions}
        >
          <PostAuthor
            label={`${author.firstname} ${author.lastname}`}
            authorId={author_id}
          />
          {wallIsMine && onDelete && (
            <Button
              className={styles.option}
              onClick={onDelete}
              children="Удалить пост"
            />
          )}
        </div>

        {content && <PostText text={content} id={id} />}

        {imageContentSrc && (
          <img
            className={styles.contentPicture}
            src={imageContentSrc}
            alt={`Графическое изображение, опубликованное пользователем ${author.firstname} ${author.lastname}`}
          ></img>
        )}

        <PostShareAndDate date={date} />
        <CommentsBlock id={id} className={styles.commentSection} />
        
      </div>
    </div>
  );
});

AccountWallPost.displayName = "post-genuinely";
