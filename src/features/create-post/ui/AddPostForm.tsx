const GraffityModal = lazy(() =>
  import("@/features/create-graffity").then((module) => ({
    default: module.GraffityModal,
  })),
);
const ModalWindow = lazy(() =>
  import("@/shared/ui/ModalWindow/ModalWindow").then((module) => ({
    default: module.ModalWindow,
  })),
);
import { Input } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, useState } from "react";
import { Attachments } from "./Attachments";
import styles from "./CreatePost.module.scss";
import { useSendPost } from "@/entities/posts/model/posts/useSendPost";
import { useParams } from "react-router-dom";
import { PostSchema } from "@/shared/api/schemas/wallFormSchema";

export const AddPostForm = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [inputPost, setInputPost] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutate: sendPost, isPending } = useSendPost();
  const { userId } = useParams();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const result = PostSchema.safeParse({ inputPost });
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      if (userId) {
        sendPost(
          {
            content: inputPost,
            contentPicture: "",
            wallId: userId,
          },
          {
            onSuccess: () => {
              setInputPost("");
            },
          },
        );
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {modalOpened === true && (
          <ModalWindow
            classname="canvas"
            onCloseModal={() => setModalOpened(false)}
            children={
              <GraffityModal onCloseModal={() => setModalOpened(false)} />
            }
            id="canvas"
            label="Ваше граффити на стену Романа Саныча"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <ModalWindow
            classname={styles.warning}
            onCloseModal={() => setError(null)}
            children={<p className={styles.error}>{error}</p>}
            id="error-message"
            label="Ошибка при отправке поста"
          />
        )}
      </AnimatePresence>

      <motion.form
        className={styles.postForm}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Input
          containerClass={styles.postInput}
          classInput={styles.inputField}
          id="input-post"
          className="visuallyHidden"
          type="text"
          placeholder="Что у вас нового?"
          label="Введите новый пост"
          value={inputPost}
          onChange={(e) => setInputPost(e.target.value)}
        />
        <AnimatePresence>
          <Attachments
            isLoading={isPending}
            setCanvasOpen={() => {
              if (modalOpened === false) setModalOpened(true);
            }}
          />
        </AnimatePresence>
      </motion.form>
    </>
  );
};
