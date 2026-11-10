import styles from "./WallPost.module.scss";
interface PostAuthorProps {
  label: string;
}

export const PostAuthor = (props: PostAuthorProps) => {
  const { label } = props;

  return (
    <div className={styles.postHead}>
      <p className={styles.userName}>{label}</p>
    </div>
  );
};
