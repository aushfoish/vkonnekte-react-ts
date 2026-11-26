import React, { useState } from "react";
import { PostAuthor } from "./PostAuthor";
import { PostAuthorPic } from "./PostAuthorPic";
import { PostText } from "./PostText";
import { PostShareAndDate } from "./PostShareDate";
import styles from "./WallPost.module.scss";
import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useParams } from "react-router-dom";
import { AudioButton } from "@/shared/ui";
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
          editImageValue={(e) =>
            handleInput("imageContentSrc", e.currentTarget.value)
          }
          onSubmitEvent={() => handleSubmit()}
        />
      </>
    );

  if (editState.isEditing === false)
    return (
      <div className={styles.postGenuinely} id={String(id)}>
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
            <div className={styles.options}>
              {postIsMine && (
                <AudioButton
                  className={styles.edit}
                  onClick={() => edit()}
                  children={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_570_51)">
                        <path
                          d="M12.8538 0.146393C12.76 0.0526577 12.6329 0 12.5003 0C12.3677 0 12.2406 0.0526577 12.1468 0.146393L10.4998 1.79339L14.2068 5.50039L15.8538 3.85439C15.9004 3.80795 15.9373 3.75277 15.9625 3.69203C15.9877 3.63128 16.0007 3.56616 16.0007 3.50039C16.0007 3.43463 15.9877 3.3695 15.9625 3.30876C15.9373 3.24801 15.9004 3.19284 15.8538 3.14639L12.8538 0.146393V0.146393ZM13.4998 6.20739L9.79281 2.50039L3.29281 9.00039H3.49981C3.63241 9.00039 3.75959 9.05307 3.85336 9.14684C3.94713 9.24061 3.99981 9.36778 3.99981 9.50039V10.0004H4.49981C4.63241 10.0004 4.75959 10.0531 4.85336 10.1468C4.94713 10.2406 4.99981 10.3678 4.99981 10.5004V11.0004H5.49981C5.63241 11.0004 5.75959 11.0531 5.85336 11.1468C5.94713 11.2406 5.99981 11.3678 5.99981 11.5004V12.0004H6.49981C6.63241 12.0004 6.75959 12.0531 6.85336 12.1468C6.94713 12.2406 6.99981 12.3678 6.99981 12.5004V12.7074L13.4998 6.20739V6.20739ZM6.03181 13.6754C6.01076 13.6194 5.99993 13.5602 5.99981 13.5004V13.0004H5.49981C5.3672 13.0004 5.24002 12.9477 5.14625 12.8539C5.05248 12.7602 4.99981 12.633 4.99981 12.5004V12.0004H4.49981C4.3672 12.0004 4.24002 11.9477 4.14625 11.8539C4.05248 11.7602 3.99981 11.633 3.99981 11.5004V11.0004H3.49981C3.3672 11.0004 3.24002 10.9477 3.14625 10.8539C3.05248 10.7602 2.99981 10.633 2.99981 10.5004V10.0004H2.49981C2.44003 10.0003 2.38075 9.98946 2.32481 9.96839L2.14581 10.1464C2.09816 10.1944 2.06073 10.2515 2.03581 10.3144L0.0358061 15.3144C-0.000564594 15.4053 -0.0094681 15.5048 0.0101994 15.6007C0.0298668 15.6966 0.0772403 15.7845 0.146447 15.8538C0.215653 15.923 0.303649 15.9703 0.399526 15.99C0.495402 16.0097 0.594942 16.0008 0.685806 15.9644L5.68581 13.9644C5.74867 13.9395 5.80582 13.902 5.85381 13.8544L6.03181 13.6764V13.6754Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_570_51">
                          <rect width="16" height="16" fill="currentColor" />
                        </clipPath>
                      </defs>
                    </svg>
                  }
                  id="edit-post"
                  ariaLabel="Редактировать пост"
                  title="Редактировать пост"
                />
              )}
              {(postIsMine || wallIsMine) && (
                <AudioButton
                  className={styles.delete}
                  onClick={onDelete}
                  children={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 1C2.23478 1 1.98043 1.10536 1.79289 1.29289C1.60536 1.48043 1.5 1.73478 1.5 2V3C1.5 3.26522 1.60536 3.51957 1.79289 3.70711C1.98043 3.89464 2.23478 4 2.5 4H3V13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15H11C11.5304 15 12.0391 14.7893 12.4142 14.4142C12.7893 14.0391 13 13.5304 13 13V4H13.5C13.7652 4 14.0196 3.89464 14.2071 3.70711C14.3946 3.51957 14.5 3.26522 14.5 3V2C14.5 1.73478 14.3946 1.48043 14.2071 1.29289C14.0196 1.10536 13.7652 1 13.5 1H10C10 0.734784 9.89464 0.48043 9.70711 0.292893C9.51957 0.105357 9.26522 0 9 0L7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1H2.5ZM5.5 5C5.63261 5 5.75979 5.05268 5.85355 5.14645C5.94732 5.24021 6 5.36739 6 5.5V12.5C6 12.6326 5.94732 12.7598 5.85355 12.8536C5.75979 12.9473 5.63261 13 5.5 13C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V5.5C5 5.36739 5.05268 5.24021 5.14645 5.14645C5.24021 5.05268 5.36739 5 5.5 5V5ZM8 5C8.13261 5 8.25979 5.05268 8.35355 5.14645C8.44732 5.24021 8.5 5.36739 8.5 5.5V12.5C8.5 12.6326 8.44732 12.7598 8.35355 12.8536C8.25979 12.9473 8.13261 13 8 13C7.86739 13 7.74021 12.9473 7.64645 12.8536C7.55268 12.7598 7.5 12.6326 7.5 12.5V5.5C7.5 5.36739 7.55268 5.24021 7.64645 5.14645C7.74021 5.05268 7.86739 5 8 5V5ZM11 5.5V12.5C11 12.6326 10.9473 12.7598 10.8536 12.8536C10.7598 12.9473 10.6326 13 10.5 13C10.3674 13 10.2402 12.9473 10.1464 12.8536C10.0527 12.7598 10 12.6326 10 12.5V5.5C10 5.36739 10.0527 5.24021 10.1464 5.14645C10.2402 5.05268 10.3674 5 10.5 5C10.6326 5 10.7598 5.05268 10.8536 5.14645C10.9473 5.24021 11 5.36739 11 5.5V5.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                  id="delete-post"
                  ariaLabel="Удалить пост"
                  title="Удалить пост"
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
