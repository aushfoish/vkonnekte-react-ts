const GraffityModal = lazy(() => import('@/features/create-graffity').then(module => ({default: module.GraffityModal})))
const ModalWindow = lazy(() => import('@/shared/ui/ModalWindow/ModalWindow').then(module => ({default: module.ModalWindow})))
import { Input } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, useState } from "react";
import styles from "./CreatePost.module.scss";
import { useSendComment } from "@/entities/posts/model/useSendComment";

interface AddCommentForm {
  postId: number
}

export const AddCommentForm = (props: AddCommentForm) => {
  const {postId} = props
  const [modalOpened, setModalOpened] = useState(false);
  const [inputPost, setInputPost] = useState("");
  const { mutate: sendComm } = useSendComment(postId);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputPost.trim()) {
      alert(
        "ты пустоту отправил, друг",
      );
      return;
    }

    if (postId) 
    {sendComm(
      {
        content: inputPost,
        postId: postId
      },
      {
        onSuccess: () => {
          setInputPost("");
        },
      },
    );
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
          
        </AnimatePresence>
      </motion.form>
    </>
  );
};
