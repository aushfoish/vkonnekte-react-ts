import React, { useState } from "react";
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
import type { EditState } from "@/features/admin-tab-post-item/schemas/EditPost";
import { useEditPost } from "@/entities/posts/model/posts/useEditPost";
import { WallPostEdit } from "@/entities/posts/ui/WallPost/WallPostEdit";

export const AccountWallPost = React.memo((props: PostCardProps) => {
  const { id, author_id, content, imageContentSrc, author, date, onDelete } =
    props;

  const { mutate: editPost } = useEditPost();

  const [editState, setEditState] = useState<EditState>({
    isEditing: false,
    values: {},
  });

  const edit = () => {
    setEditState({
      isEditing: true,
      values: { content, imageContentSrc },
    });
  };

  const handleInput = (field: keyof EditState["values"], value: string) => {
    setEditState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
    }));
  };

  const handleSubmit = () => {
    editPost({ id, ...editState.values });
    setEditState({ isEditing: false, values: {} });
  };

  const currentUserId = useAuthStore((state) => state.currentUserId);
  const { userId } = useParams();

  const wallIsMine = currentUserId === userId;
  const postIsMine = currentUserId === author_id;

  if (editState.isEditing === true)
    return (
      <>
        <WallPostEdit
          author_id={author_id}
          author={author}
          id={id}
          onEditStateChange={() =>
            setEditState({ isEditing: false, values: {} })
          }
          imageContentSrc={editState.values.imageContentSrc ?? ""}
          content={editState.values.content ?? ""}
          editContentValue={(e) =>
            handleInput("content", e.currentTarget.value)
          }
          editImageValue={(e) => handleInput("imageContentSrc", e.currentTarget.value)}
          onSubmitEvent={() => handleSubmit()}
        />
      </>
    );

  if (editState.isEditing === false)
    return (
      <div className={styles.postGenuinely} id={String(id)}>
        <PostAuthorPic
          authorId={author_id}
          src={author.avatar ? author.avatar : placeholder}
          alt={`Фотография пользователя ${author.firstname} ${author.lastname}`}
        />

        <div className={styles.contentPost}>
          <div className={styles.postOptions}>
            <PostAuthor
              label={`${author.firstname} ${author.lastname}`}
              authorId={author_id}
            />
            <div>
              {(postIsMine || wallIsMine) && (
                <Button
                  className={styles.option}
                  onClick={onDelete}
                  children="Удалить пост"
                />
              )}
              {postIsMine && (
                <Button
                  className={styles.option}
                  onClick={() => edit()}
                  children="редактировать"
                />
              )}
            </div>
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
