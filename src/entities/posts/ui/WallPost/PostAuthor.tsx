import { Link } from "react-router-dom";
import styles from "./WallPost.module.scss";
interface PostAuthorProps {
  label: string;
  authorId: string|null
}

export const PostAuthor = (props: PostAuthorProps) => {
  const { label, authorId } = props;

  return (
    <Link to={`/profile/${authorId}`} className={styles.postHead}>
      <p className={styles.userName}>{label}</p>
    </Link>
  );
};
