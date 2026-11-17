
const ModalWindow = lazy(() =>
  import("@/shared/ui/ModalWindow/ModalWindow").then((module) => ({
    default: module.ModalWindow,
  })),
);
import { AudioButton, Input } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, useState } from "react";
import styles from "./CreatePost.module.scss";
import { useSendComment } from "@/entities/posts/model/useSendComment";
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
            children={<p className={styles.error}>{error}</p>
            }
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
              const textValue = e.target.value
              setText(textValue);
            }}
          />
          <AudioButton
            onClick={handleSubmit}
            children={
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.46653 0.836914L13.6296 6.99998L7.46653 13.163L6.29097 11.9875L11.2785 6.99998L6.29097 2.01248L7.46653 0.836914Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="#546B87"
                />
                <path
                  d="M0.816406 6.16873H12.5924V7.83123H0.816406V6.16873Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="#546B87"
                />
              </svg>
            }
            id='submit-commentary'
            ariaLabel="Отправить комментарий"
          />
        </div>

        <AnimatePresence></AnimatePresence>
      </motion.form>
    </>
  );
};
