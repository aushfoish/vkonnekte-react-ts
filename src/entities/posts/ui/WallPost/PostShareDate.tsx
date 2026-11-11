import styles from "./WallPost.module.scss";
interface PostShareAndDateProps {
  date: string;
}

export const PostShareAndDate = (props: PostShareAndDateProps) => {
  const { date } = props;

  return (
    <div className={styles.likeShareDate}>
      <div className={styles.dateTime}>
        <p className={styles.time}>{date}</p>
      </div>

      <div className={styles.likeShareContainer}>
        <div className={styles.like}>поделиться</div>

        <div className={styles.like}>Мне нравится</div>
      </div>
    </div>
  );
};
