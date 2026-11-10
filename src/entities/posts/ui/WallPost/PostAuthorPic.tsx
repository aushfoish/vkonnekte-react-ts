import styles from "./WallPost.module.scss";
interface postAuthorPic {
  src: string;
  alt: string;
}

export const PostAuthorPic = (props: postAuthorPic) => {
  const { src, alt } = props;

  return <img className={styles.userpicPost} src={src} alt={alt}></img>;
};
