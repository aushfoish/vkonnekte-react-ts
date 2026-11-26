import { AudioButton } from "@/shared/ui";
import styles from "./Follow-Button.module.scss";
import { useSubscribe } from "../lib/subscribe";
import { AdminAuth } from "@/widgets/admin-authorization/ui/AdminAuth";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/entities/user/model/useAuthStore";

export const EditProfile = () => {
  const { subscribe, auth } = useSubscribe();
  const { userId } = useParams();

  const currentUserId = useAuthStore((state) => state.currentUserId);
  const userIsLogged = useAuthStore((state) => state.userIsLogged);

  const userIsOwner = userId === currentUserId;

  if (userIsOwner && userIsLogged)
    return (
      <div className={`${styles.followButton}`}>
        <AudioButton
          title="Редактировать профиль"
          id="edit-profile"
          ariaLabel="открыть форму редактирования профиля"
          className={styles.follow}
          children={
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_564_36)">
                <path
                  d="M14.4605 0.164692C14.355 0.0592399 14.212 0 14.0628 0C13.9137 0 13.7706 0.0592399 13.6652 0.164692L11.8123 2.01757L15.9827 6.18794L17.8355 4.33619C17.8879 4.28394 17.9295 4.22187 17.9578 4.15353C17.9862 4.08519 18.0008 4.01193 18.0008 3.93794C18.0008 3.86395 17.9862 3.79069 17.9578 3.72235C17.9295 3.65402 17.8879 3.59194 17.8355 3.53969L14.4605 0.164692V0.164692ZM15.1873 6.98332L11.0169 2.81294L3.70441 10.1254H3.93728C4.08647 10.1254 4.22954 10.1847 4.33503 10.2902C4.44052 10.3957 4.49978 10.5388 4.49978 10.6879V11.2504H5.06228C5.21147 11.2504 5.35454 11.3097 5.46003 11.4152C5.56552 11.5207 5.62478 11.6638 5.62478 11.8129V12.3754H6.18728C6.33647 12.3754 6.47954 12.4347 6.58503 12.5402C6.69052 12.6457 6.74978 12.7888 6.74978 12.9379V13.5004H7.31228C7.46147 13.5004 7.60454 13.5597 7.71003 13.6652C7.81552 13.7707 7.87478 13.9138 7.87478 14.0629V14.2958L15.1873 6.98332V6.98332ZM6.78578 15.3848C6.76211 15.3219 6.74992 15.2552 6.74978 15.1879V14.6254H6.18728C6.0381 14.6254 5.89502 14.5662 5.78953 14.4607C5.68404 14.3552 5.62478 14.2121 5.62478 14.0629V13.5004H5.06228C4.9131 13.5004 4.77002 13.4412 4.66453 13.3357C4.55904 13.2302 4.49978 13.0871 4.49978 12.9379V12.3754H3.93728C3.7881 12.3754 3.64502 12.3162 3.53953 12.2107C3.43405 12.1052 3.37478 11.9621 3.37478 11.8129V11.2504H2.81228C2.74503 11.2503 2.67835 11.2381 2.61541 11.2144L2.41403 11.4147C2.36043 11.4687 2.31833 11.533 2.29028 11.6037L0.0402818 17.2287C-0.000635168 17.3309 -0.0106516 17.4429 0.0114743 17.5508C0.0336002 17.6586 0.0868953 17.7576 0.164753 17.8355C0.24261 17.9133 0.341605 17.9666 0.449466 17.9888C0.557327 18.0109 0.66931 18.0009 0.771532 17.9599L6.39653 15.7099C6.46725 15.6819 6.53155 15.6398 6.58553 15.5862L6.78578 15.3859V15.3848Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_564_36">
                  <rect width="18" height="18" fill="currentColor" />
                </clipPath>
              </defs>
            </svg>
          }
          onClick={subscribe}
        />
        {auth && <AdminAuth />}
      </div>
    );
};

// useEffect(() => {
//     const authCheck = useAuthStore.getState().adminAuthCheck
//     authCheck()
//   })
