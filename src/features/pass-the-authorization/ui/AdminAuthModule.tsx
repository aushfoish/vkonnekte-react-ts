import { Button, ErrorMessage, Input, Loader } from "@/shared/ui";
import styles from "./Auth.module.scss";
import { useState } from "react";
import { signAsAdmin } from "@/entities/user/model/signAsAdmin";
import { useAuthStore } from "@/entities/user/model/useAuthStore";

// interface AdminAuthModule {
//   onClose: () => void;
// }

export const AdminAuthModule = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const anonymous = useAuthStore((state) => state.anonymous);
  const isLogining = useAuthStore((state) => state.isUserLoggining)
  const isError = useAuthStore((state) => state.authError)
  
  const handleSubmit = () => {
    signAsAdmin(username, password);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    useAuthStore.setState({authError: false})
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    useAuthStore.setState({authError: false})
    setPassword(e.currentTarget.value);
  };


  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h3 className={styles.authHeader}>Войдите в свой профиль</h3>
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

        {isError && (
          <ErrorMessage
            classname="isError"
            children="Неправильный логин или пароль"
            id="auth-error"
            role="alert"
          />
        )}

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

          {/* <Modal_button
            type="button"
            className={styles.option}
            onClick={() => {
              onClose();
            }}
            btnLabel="Регистрация"
          /> */}
          {/* <Modal_button
            type="button"
            className={styles.option}
            onClick={() => {
              anonymous();
            }}
            btnLabel='Режим "Гостя"'
          /> */}
        </div>
      </div>
    </form>
  );
};
