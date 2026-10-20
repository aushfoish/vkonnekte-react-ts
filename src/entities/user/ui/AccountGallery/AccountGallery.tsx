import styles from './AccountGallery.module.scss'
import { Micro_header } from "@/entities/posts";

import { GalleryItem } from "@/shared/ui/GalleryImgItem/GalleryItem";
import { nameDeclension } from "@/entities/user/lib/nameDeclesion";
import { useSelectFirstname } from '../../model/useProfileData';

export const AccountGallery = () => {
  const firstName = useSelectFirstname()
  const pageOwnerDeclensed =
    firstName !== undefined ? nameDeclension(firstName) : "пользователь";
  const nyanCatArray = [
    {
      id: 1,
      key: `фотография ${pageOwnerDeclensed}`,
      value:
        "https://tyekwqioulapfagzpswr.supabase.co/storage/v1/object/sign/gallery/image%20151.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NGYwMzFmOS03NGY0LTQ3NzgtODkyZi1mNDE1ODgzZjgzZWIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJnYWxsZXJ5L2ltYWdlIDE1MS5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg1NzM5ODEyLCJleHAiOjE4MTcyNzU4MTJ9.V4JJtjiK7-LAvxJRB1WTOMqlCkh5Ehmb2vg2kOtVi04",
    },
    {
      id: 2,
      key: `фотография ${pageOwnerDeclensed}`,
      value:
        "https://tyekwqioulapfagzpswr.supabase.co/storage/v1/object/sign/gallery/image%20152.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NGYwMzFmOS03NGY0LTQ3NzgtODkyZi1mNDE1ODgzZjgzZWIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJnYWxsZXJ5L2ltYWdlIDE1Mi5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg1NzM5ODQyLCJleHAiOjE4MTcyNzU4NDJ9.g4T_5z71felBhrvB5oQksPYjFuSD_YzNgSDLHwjLWns",
    },
    {
      id: 3,
      key: `фотография ${pageOwnerDeclensed}`,
      value:
        "https://tyekwqioulapfagzpswr.supabase.co/storage/v1/object/sign/gallery/image%20153.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NGYwMzFmOS03NGY0LTQ3NzgtODkyZi1mNDE1ODgzZjgzZWIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJnYWxsZXJ5L2ltYWdlIDE1My5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg1NzM5ODUzLCJleHAiOjE4MTcyNzU4NTN9.dI1_Le6ysJHcUkI1inUqXJwypBGhNiR1uF4OMbBV7W0",
    },
    {
      id: 4,
      key: `фотография ${pageOwnerDeclensed}`,
      value:
        "https://tyekwqioulapfagzpswr.supabase.co/storage/v1/object/sign/gallery/image%20154.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NGYwMzFmOS03NGY0LTQ3NzgtODkyZi1mNDE1ODgzZjgzZWIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJnYWxsZXJ5L2ltYWdlIDE1NC5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg1NzM5ODY1LCJleHAiOjE4MTcyNzU4NjV9.WEvgKpNQBPmRm0g1_aXLXS9ysi-rY8wVK5pVKpSwhIc",
    },
  ];
  return (
    <div className={styles.gallery}>
      <Micro_header children={`${nyanCatArray.length} фотографии`} />

      <div className={styles.imageRow}>
        {nyanCatArray.map((img) => (
          <GalleryItem
            key={img.id}
            id={`${img.id}`}
            alt={img.key}
            src={img.value}
          />
        ))}
      </div>
    </div>
  );
};
