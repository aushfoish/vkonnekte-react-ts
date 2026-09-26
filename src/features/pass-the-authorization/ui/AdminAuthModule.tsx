import { Button, Input, Loader, Modal_button } from "@/shared/ui";
import styles from "./Auth.module.scss";
import { useState } from "react";
import { signAsAdmin } from "@/entities/user/model/signAsAdmin";

interface AdminAuthModule {
  onClose: () => void;
}

export const AdminAuthModule = (props: AdminAuthModule) => {
  const { onClose } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogining, setIsLogining] = useState(false);

  const handleSubmit = () => {
    setIsLogining(true);
    signAsAdmin(username, password);
    onClose();
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <div className={styles.inputsContainer}>
        <Input
          maxLength={25}
          id="username"
          placeholder="Введите логин"
          type="text"
          label="Введите логин"
          className={styles.authInputLabel}
          value={username}
          classInput={styles.authInput}
          onChange={handleUsernameChange}
          containerClass={styles.authInput}
        />

        {/* {error && (
          <ErrorMessage
            classname="isError"
            children={nameError}
            id="auth-error"
            role="alert"
          />
        )} */}

        <Input
          id="userpic"
          placeholder="Введите пароль"
          type="password"
          label="Введите пароль"
          value={password}
          className={styles.authInputLabel}
          classInput={styles.authInput}
          containerClass={styles.authInput}
          onChange={handlePasswordChange}
        />
        <div className={styles.authButtons}>
          <Button
            isLoading={isLogining}
            type="submit"
            className={styles.auth}
            children={isLogining ? <Loader /> : "Войти"}
            onClick={handleSubmit}
          />

          <Modal_button
            type="button"
            className={styles.option}
            onClick={() => {
              onClose();
            }}
            btnLabel="Отмена"
          />
        </div>
      </div>
    </form>
  );
};
