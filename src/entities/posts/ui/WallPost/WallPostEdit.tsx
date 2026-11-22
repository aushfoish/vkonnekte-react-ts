import React from "react";
import styles from "./WallPost.module.scss";
import placeholder from "@/shared/assets/1aa4cedee524828a8ac40cb77adfa233.jpg";

import type { EditCardProps } from "@/shared/api/schemas/userPostSchema";
import { PostAuthorPic } from "@/entities/posts/ui/WallPost/PostAuthorPic";
import { PostAuthor } from "@/entities/posts/ui/WallPost/PostAuthor";
import { Button } from "@/shared/ui";

export const WallPostEdit = React.memo((props: EditCardProps) => {
  const {
    author_id,
    author,
    id,
    onEditStateChange,
    editContentValue,
    editImageValue,
    onSubmitEvent,
    imageContentSrc,
    content,
  } = props;

  return (
    <div
      className={styles.postGenuinely}
      id={String(id)}
      onSubmit={onSubmitEvent}
    >
      <PostAuthorPic
        authorId={author_id}
        src={author.avatar_mini_50 ? author.avatar_mini_50 : placeholder}
        alt={`Фотография пользователя ${author.firstname} ${author.lastname}`}
      />

      <div className={styles.contentPost}>
        <div className={styles.postOptions}>
          <PostAuthor
            label={`${author.firstname} ${author.lastname}`}
            authorId={author_id}
          />

          <Button
            className={styles.option}
            onClick={onEditStateChange}
            children="Закрыть форму редактирования"
          />
        </div>

        <textarea value={content} onChange={editContentValue}></textarea>

        <textarea value={imageContentSrc} onChange={editImageValue}></textarea>

        <Button onClick={onSubmitEvent} children="Сохранить" />
      </div>
    </div>
  );
});

WallPostEdit.displayName = "post-genuinely";
