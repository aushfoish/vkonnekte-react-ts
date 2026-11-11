import styles from "./WallPost.module.scss";
interface PostTextProps {
  text: string;
  id: number;
}

export const PostText = (props: PostTextProps) => {
  const { text, id } = props;
  return (
    <div className={styles.textContent} id={String(id)}>
      <p className={styles.userContent}>{text}</p>
    </div>
  );
};
