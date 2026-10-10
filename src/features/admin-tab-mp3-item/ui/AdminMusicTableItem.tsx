import type { FullMusicItemSchemaProps } from "@/shared/api/schemas/musicItemSchema";
import styles from "./AdminMusicTableItem.module.scss";

export const AdminMusicTableItem = (props: FullMusicItemSchemaProps) => {
  const { id, band, title, src, duration, onDelete, onEdit } = props;

  return (
    <div className={styles.adminMusicTableItem} key={id}>
      <div className={styles.meta}>
        <div className={styles.band}>{band}</div>
        <div className={styles.title}>{title}</div>
        <a className="src" href={src}>
          [ссылка]
        </a>
        <div className="duration">{duration}</div>
      </div>
      <div className={styles.options}>
        <button className={styles.option} onClick={onEdit}>
          [Редактировать]
        </button>
        <button className={styles.option} onClick={onDelete}>
          [Удалить]
        </button>
      </div>
    </div>
  );
};
