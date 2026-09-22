import { Button } from "@/shared/ui";
import { AudioButton } from "@/shared/ui/IconBtn";
import { motion } from "framer-motion";
import styles from './CreatePost.module.scss'

interface AttachmentsProps {
  setCanvasOpen: () => void;
  isLoading: boolean
}
export const Attachments = (props: AttachmentsProps) => {
  const { setCanvasOpen, isLoading } = props;


  return (
    <motion.div
      className={styles.postAttachmentsButtons}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      style={{ overflow: "hidden" }}
    >
      <Button type="submit" className={styles.post} isLoading={isLoading} children="Опубликовать" />
      <fieldset className={styles.postAttachments} aria-label="Вложения к посту">
        <AudioButton
          type="button"
          id="canvas"
          children={
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.27116 12.8337C4.78408 12.8337 3.58366 14.062 3.58366 15.5837C3.58366 16.7845 2.54449 17.417 1.79199 17.417C2.61616 18.5353 4.02262 19.2503 5.37533 19.2503C7.35512 19.2503 8.95866 17.6095 8.95866 15.5837C8.95866 14.062 7.75824 12.8337 6.27116 12.8337ZM18.553 4.24451L17.3526 3.01617C17.0032 2.65867 16.4389 2.65867 16.0895 3.01617L8.06283 11.2295L10.5264 13.7503L18.553 5.53701C18.9024 5.17951 18.9024 4.60201 18.553 4.24451V4.24451Z"
                fill="currentColor"
              />
            </svg>
          }
          onClick={setCanvasOpen}
          ariaLabel="Открыть холст для рисования"
        />
        <AudioButton
          type="button"
          id="picture"
          children={
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.25 17.0208V4.47917C19.25 3.49375 18.425 2.6875 17.4167 2.6875H4.58333C3.575 2.6875 2.75 3.49375 2.75 4.47917V17.0208C2.75 18.0062 3.575 18.8125 4.58333 18.8125H17.4167C18.425 18.8125 19.25 18.0062 19.25 17.0208ZM7.79167 12.0937L10.0833 14.7902L13.2917 10.75L17.4167 16.125H4.58333L7.79167 12.0937Z"
                fill="currentColor"
              />
            </svg>
          }
          ariaLabel="Отправить фотографию к посту"
        />
      </fieldset>
    </motion.div>
  );
};
