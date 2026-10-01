import { useState } from "react";
import style from "./AdminPostsTableItem.module.scss";
import type { PostCardProps } from "@/shared/api/schemas/userPostSchema";
import { useEditPost } from "@/entities/posts/model/useEditPost";

export const AdminPostsTableItem = (props: PostCardProps) => {
  const { id, content, date, username, userPictureSrc, imageContentSrc, onDelete } =
    props;

    const [onEdit, setOnEdit] = useState(false)
    const [newValue, setNewValue] = useState('')
    const {mutate: editPost} = useEditPost()
  return (
    <div className={style.adminPostsTableItem} key={id}>
      <div className={style.meta}>
        <div className={style.userinf}>
          <div className={style.username}>{username}</div>
          <a className={style.userpic} href={userPictureSrc} target="_blank">
            [userpic]
          </a>
        </div>
        <>
          {imageContentSrc && (
            <a className={style.imageSrc} href={imageContentSrc} target="_blank">
              [вложение]
            </a>
          )}
          {content && (<div className={style.postText}>{content}</div>)}
        </>
        <>
          {onEdit && (<input defaultValue={newValue} onChange={() => setNewValue}/>)}
        </>
        <div className={style.postDate}>{date}</div>
      </div>
      {!onEdit && (<div className={style.options}>
        <button className={style.option} onClick={() => setOnEdit(true)}>[Редактировать]</button>
        <button className={style.option} onClick={onDelete}>[Удалить]</button>
      </div>)}
      {onEdit && (<div className={style.options}>
        <button className={style.option} onClick={
          () => {
            editPost(id)
            setOnEdit(false)
          }
          }>✅</button>
        <button className={style.option} onClick={() => setOnEdit(false)}>❌</button>
      </div>)}
    </div>
  );
};
