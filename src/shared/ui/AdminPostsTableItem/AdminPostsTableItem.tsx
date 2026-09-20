import type { UserPosts } from "@/entities/posts/model/types";
import style from "./AdminPostsTableItem.module.scss";

export const AdminPostsTableItem = (props: UserPosts) => {
  const { id, content, date, username, userPictureSrc, imageContentSrc } =
    props;
  return (
    <div className={style.adminPostsTableItem} key={id}>
      <div className={style.meta}>
        <div className={style.userinf}>
          <div className={style.username}>{username}</div>
          <a className={style.userpic} href={userPictureSrc} target="_blank">
            [userpic]
          </a>
        </div>

        {imageContentSrc && (
          <a className={style.imageSrc} href={imageContentSrc} target="_blank">
            [вложение]
          </a>
        )}
        {content && <div className={style.postText}>{content}</div>}
        <div className={style.postDate}>{date}</div>
      </div>
      <div className={style.options}>
        <button className={style.option}>[Редактировать]</button>
        <button className={style.option}>[Удалить]</button>
      </div>
    </div>
  );
};
