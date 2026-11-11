import { Link } from "react-router-dom";
import styles from "./WallPost.module.scss";
interface postAuthorPic {
  src: string;
  alt: string;
  authorId: string|null
}

export const PostAuthorPic = (props: postAuthorPic) => {
  const { src, alt, authorId } = props;

  return <Link to={`/profile/${authorId}`}><img className={styles.userpicPost} src={src} alt={alt}></img></Link>
};
