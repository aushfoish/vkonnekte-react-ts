import type { FullMusicItemSchemaProps } from "@/shared/api/schemas/musicItemSchema";
import styles from "./AdminMusicTableItem.module.scss";
import type { Mp3EditState } from "@/features/admin-tab-mp3-item/schemas/editTrack";
import { useState } from "react";
import { useEditTrack } from "@/entities/mp3-player/model/useEditTrack";

export const AdminMusicTableItem = (props: FullMusicItemSchemaProps) => {
  const { id, band, title, src, duration, onDelete } = props;
  const {mutate: editTrack} = useEditTrack()
  const [editState, setEditState] = useState<Mp3EditState>({
      isEditing: false,
      values: {},
    });

  const edit = () => {
    setEditState({
      isEditing: true,
      values: {title, band, src}
    })
  }

  const handleInput = (field: keyof Mp3EditState["values"], value: string) => {
    setEditState((prev) => ({
      ...prev,
      values: {...prev.values, [field]: value}
    }))
  }

  return (
    <div className={styles.adminMusicTableItem} key={id}>
      <div className={styles.meta}>

        {editState.isEditing 
          ? (<input value={editState.values.band} onChange={(e) => handleInput("band", e.currentTarget.value)}></input>) 
          : (<div className={styles.band}>{band}</div>)
        }

        {editState.isEditing
          ? (<input value={editState.values.title} onChange={(e) => handleInput("title", e.currentTarget.value)}></input>) 
          : <div className={styles.title}>{title}</div>
        }

        {editState.isEditing 
          ? (<input value={editState.values.src} onChange={(e) => handleInput("src", e.currentTarget.value)}></input>) 
          : <a className="src" href={src}>[ссылка]</a>
        }

        <div className="duration">{duration}</div>
        
      </div>
      {editState.isEditing ? (
        <div className={styles.options}>
          <button
            className={styles.option}
            onClick={() => {
              editTrack({ id, ...editState.values });
              setEditState({ isEditing: false, values: {} });
            }}
          >
            ✅
          </button>
          <button
            className={styles.option}
            onClick={() => setEditState({ isEditing: false, values: {} })}
          >
            ❌
          </button>
        </div>
      ) : (
        <div className={styles.options}>
          <button className={styles.option} onClick={() => edit()}>
            [Редактировать]
          </button>
          <button className={styles.option} onClick={onDelete}>
            [Удалить]
          </button>
        </div>
      )}
    </div>
  );
};
