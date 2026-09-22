import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { Button, ErrorMessage, Input, Loader, Modal_button } from "@/shared/ui";
import { useEffect, useState } from "react";
import { handleFileReader } from "@/shared/lib/file/useFileReader";
import styles from "./Auth.module.scss";

interface AuthorizationModuleProps {
  onClose: () => void;
}

export const AuthorizationModule = (props: AuthorizationModuleProps) => {
  const { onClose } = props;

  const [username, setUsername] = useState("");
  const [userpic, setUserpic] = useState("");
  const [picUploading, setPicUploading] = useState(false);
  const [nameError, setNameError] = useState(
    'Добавьте имя и фото, или выберите вариант "Не регистрироваться"',
  );
  const [error, setError] = useState(false);

  const authorization = useAuthStore((state) => state.authorization);
  const authCheck = useAuthStore((state) => state.authCheck);
  const anonymous = useAuthStore((state) => state.anonymous);

  useEffect(() => {
    const loginData = localStorage.getItem("userdata");
    if (loginData) {
      authCheck();
      onClose();
    }
  }, [authCheck, onClose]);

  const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPicUploading(true);
    const userpicUrl = await handleFileReader(e, "jpg", 40, 40);
    if (typeof userpicUrl === "string") {
      setUserpic(userpicUrl);
      if (error) setError(false);
    } else if (userpicUrl === false) {
      setError(true)
      setNameError('Недопустимый формат или размер. Допустимы только jpg/png файлы не более 2 мб')
      setPicUploading(false);
      setUserpic('')
    }
    setPicUploading(false);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
    if (error) {
      setError(false);
      setNameError('Добавьте имя и фото, или выберите вариант "Не регистрироваться"')
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputsCheck = username !== "" && userpic !== "";
    if (inputsCheck === false) {
      setError(true);
    } else if (inputsCheck === true) {
      authorization(username, userpic);
      console.log("шнурки в стакане", username, userpic);
      onClose();
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <div className={styles.inputsContainer}>
        <Input
          maxLength={25}
          id="username"
          placeholder="введите ваше имя.."
          type="text"
          label="Введите имя"
          className={styles.authInputLabel}
          value={username}
          classInput={styles.authInput}
          onChange={handleUsernameChange}
          containerClass={styles.authInput}
          aria-invalid={!!nameError}
          aria-describedby={nameError ? "auth-error" : undefined}
        />

        {error && (
          <ErrorMessage
            classname="isError"
            children={nameError}
            id="auth-error"
            role="alert"
          />
        )}

        <Input
          id="userpic"
          placeholder="добавьте ваше фото.."
          type="file"
          label="Добавьте ваше фото"
          className={styles.authInputLabel}
          classInput={styles.authInput}
          containerClass={styles.authInput}
          onChange={onUploadFile}
          accept="image/*"
        />
        <div className={styles.authButtons}>
          <Button
            isLoading={picUploading}
            type="submit"
            className={styles.auth}
            children={picUploading ? <Loader /> : "Зарегистрироваться"}
          />

          <Modal_button
            type="button"
            className={styles.option}
            onClick={() => {
              anonymous();
              onClose();
            }}
            btnLabel="Не регистрироваться"
          />
        </div>
      </div>
    </form>
  );
};
