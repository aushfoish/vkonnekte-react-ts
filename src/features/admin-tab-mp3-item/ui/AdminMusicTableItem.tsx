import type { FullMusicItemSchema } from '@/shared/api/schemas/musicItemSchema';
import styles from './AdminMusicTableItem.module.scss'

export const AdminMusicTableItem = (props: FullMusicItemSchema) => {
  const { id, band, title, src, duration } = props;

  return (
  <div className={styles.adminMusicTableItem} key={id}>
    <div className={styles.meta}>
        <div className={styles.band}>{band}</div>
        <div className={styles.title}>{title}</div>
        <a className="src" href={src}>[ссылка]</a>
        <div className="duration">{duration}</div>
    </div>
    <div className={styles.options}>
        <button className={styles.option}>[Редактировать]</button>
        <button className={styles.option}>[Удалить]</button>
    </div>
  </div>
    );
};
