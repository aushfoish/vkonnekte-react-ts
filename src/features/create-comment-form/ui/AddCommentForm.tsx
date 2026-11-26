const ModalWindow = lazy(() =>
  import("@/shared/ui/ModalWindow/ModalWindow").then((module) => ({
    default: module.ModalWindow,
  })),
);
import { AudioButton, Input } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, useState } from "react";
import styles from "./CreatePost.module.scss";
import { useSendComment } from "@/entities/posts/model/comments/useSendComment";
import { CommentSchema } from "@/shared/api/schemas/commentFormSchema";

interface AddCommentForm {
  postId: number;
}

export const AddCommentForm = (props: AddCommentForm) => {
  const { postId } = props;
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const { mutate: sendComm } = useSendComment(postId);

  const handleSubmit = (e?: React.SubmitEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const result = CommentSchema.safeParse({ text });
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      {
        sendComm(
          {
            content: text,
            postId: postId,
          },
          {
            onSuccess: () => {
              setText("");
            },
          },
        );
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {error && (
          <ModalWindow
            onCloseModal={() => setError(null)}
            children={<p className={styles.error}>{error}</p>}
            id="error-message"
            label="Ошибка при отправке комментария"
          />
        )}
      </AnimatePresence>

      <motion.form
        className={styles.postForm}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={styles.inputContainer}>
          <Input
            containerClass={styles.postInput}
            classInput={styles.inputField}
            id="input-commentary"
            className="visuallyHidden"
            type="text"
            placeholder="Прокомментируйте пост..."
            label="Напишите комментарий к посту"
            value={text}
            onChange={(e) => {
              const textValue = e.target.value;
              setText(textValue);
            }}
          />
          <AudioButton
            title="Отправить комментарий"
            className={styles.send}
            onClick={handleSubmit}
            children={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8934 7.09588L14.8884 7.09369L1.54219 1.55807C1.42993 1.51108 1.30778 1.49265 1.18666 1.50443C1.06554 1.51621 0.949225 1.55783 0.848125 1.62557C0.741311 1.69556 0.653573 1.791 0.592805 1.90332C0.532037 2.01564 0.500145 2.1413 0.5 2.269V5.80932C0.50006 5.98389 0.561019 6.15298 0.67237 6.28744C0.783722 6.42189 0.938491 6.51329 1.11 6.54588L8.38906 7.89182C8.41767 7.89724 8.44348 7.91248 8.46205 7.9349C8.48062 7.95732 8.49078 7.98552 8.49078 8.01463C8.49078 8.04374 8.48062 8.07194 8.46205 8.09436C8.44348 8.11678 8.41767 8.13202 8.38906 8.13744L1.11031 9.48338C0.938851 9.51588 0.784092 9.60716 0.67269 9.74149C0.561288 9.87583 0.500219 10.0448 0.5 10.2193V13.7603C0.499917 13.8822 0.530111 14.0023 0.587871 14.1096C0.645632 14.217 0.729152 14.3084 0.830938 14.3756C0.953375 14.4569 1.09706 14.5004 1.24406 14.5006C1.34626 14.5005 1.4474 14.48 1.54156 14.4403L14.8875 8.93619L14.8934 8.93338C15.0731 8.85618 15.2262 8.728 15.3337 8.5647C15.4413 8.40141 15.4986 8.21016 15.4986 8.01463C15.4986 7.8191 15.4413 7.62785 15.3337 7.46456C15.2262 7.30126 15.0731 7.17308 14.8934 7.09588V7.09588Z"
                  fill="currentColor"
                />
              </svg>
            }
            id="submit-commentary"
            ariaLabel="Отправить комментарий"
          />
        </div>

        <AnimatePresence></AnimatePresence>
      </motion.form>
    </>
  );
};
