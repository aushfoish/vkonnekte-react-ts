import { PostAuthor } from "@/entities/posts/ui/WallPost/PostAuthor";
import { PostAuthorPic } from "@/entities/posts/ui/WallPost/PostAuthorPic";
import { PostShareAndDate } from "@/entities/posts/ui/WallPost/PostShareDate";
import { PostText } from "@/entities/posts/ui/WallPost/PostText";
import placeholder from "@/shared/assets/1aa4cedee524828a8ac40cb77adfa233.jpg";
import styles from "./WallPost.module.scss";
import type { PostCommProps } from "@/shared/api/schemas/postCommSchema";
import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { Button } from "@/shared/ui";


export const PostComment = (props: PostCommProps) => {
  const {
    author_id, author, content, date,id, onDelete
  } = props;
  const authorizedUserId = useAuthStore((state) => state.currentUserId)
  const commIsMine = authorizedUserId === author_id

  return (
    <div className={styles.postGenuinely} id={String(id)}>
      <PostAuthorPic
        authorId={author_id}
        src={author.avatar_mini_50 ? author.avatar_mini_50 : placeholder}
        alt={`Фотография пользователя ${author.firstname} ${author.lastname}`}
      />

      <div className={styles.contentPost}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <PostAuthor
            label={`${author.firstname} ${author.lastname}`}
            authorId={author_id}
          />
          {commIsMine && (
            <Button
              className={styles.option}
              onClick={onDelete}
              children="Удалить пост"
            />
          )}
        </div>

        {content && <PostText text={content} id={id} />}

        {/* {imageContentSrc && (
          <img
            className={styles.contentPicture}
            src={imageContentSrc}
            alt={`Графическое изображение, опубликованное пользователем ${author.firstname} ${author.lastname}`}
          ></img>
        )} */}

        <PostShareAndDate date={date} />
      </div>
    </div>
  );
};
