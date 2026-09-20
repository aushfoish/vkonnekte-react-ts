import { GraffityModal } from "@/features/create-graffity";
import { Input } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Attachments } from "./Attachments";
import { ModalWindow } from "@/shared/ui/ModalWindow/ModalWindow";
import styles from "./CreatePost.module.scss";
import { useSendPost } from "@/entities/posts/model/useSendPost";

export const AddPostForm = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [inputPost, setInputPost] = useState("");
  const { mutate: sendPost, isPending } = useSendPost();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputPost.trim()) {
      alert(
        "ты ни пост не чирканул, ни мемчик не забодяжил, ни граффити не намазал, но пост пытаешься отправить, ты ок вообще?",
      );
      return;
    }

    sendPost(
      {
        content: inputPost,
        contentPicture: "",
      },
      {
        onSuccess: () => {
          setInputPost("");
        },
      },
    );
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
