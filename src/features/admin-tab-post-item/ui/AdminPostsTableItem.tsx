import { useState } from "react";
import style from "./AdminPostsTableItem.module.scss";
import type { PostCardProps } from "@/shared/api/schemas/userPostSchema";
import { useEditPost } from "@/entities/posts/model/useEditPost";
import { type EditState } from "@/features/admin-tab-post-item/schemas/EditPost";

export const AdminPostsTableItem = (props: PostCardProps) => {
  const {
    id,
    content,
    date,
    imageContentSrc,
    onDelete,
  } = props;
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

  return (
    <div className={style.adminPostsTableItem} key={id}>
      <div className={style.meta}>
        

        <>
          {editState.isEditing ? (
            <input
              value={editState.values.imageContentSrc ?? ""}
              onChange={(e) =>
                handleInput("imageContentSrc", e.currentTarget.value)
              }
            ></input>
          ) : (
            <a
              className={style.imageSrc}
              href={imageContentSrc}
              target="_blank"
            >
              [вложение]
            </a>
          )}
        </>

        <>
          {editState.isEditing ? (
            <input
              value={editState.values.content ?? ""}
              onChange={(e) => handleInput("content", e.currentTarget.value)}
            />
          ) : (
            <div className={style.postText}>{content}</div>
          )}
        </>

        <div className={style.postDate}>{date}</div>
      </div>

      {editState.isEditing ? (
        <div className={style.options}>
          <button
            className={style.option}
            onClick={() => {
              editPost({ id, ...editState.values });
              setEditState({ isEditing: false, values: {} });
            }}
          >
            ✅
          </button>
          <button
            className={style.option}
            onClick={() => setEditState({ isEditing: false, values: {} })}
          >
            ❌
          </button>
        </div>
      ) : (
        <div className={style.options}>
          <button className={style.option} onClick={() => edit()}>
            [Редактировать]
          </button>
          <button className={style.option} onClick={onDelete}>
            [Удалить]
          </button>
        </div>
      )}
    </div>
  );
};
