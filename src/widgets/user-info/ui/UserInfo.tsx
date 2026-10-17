import { useId, useState } from "react";
import {

  useSelectContacts,
  useSelectPersonal,
} from "../../../entities/user/model/useFetchPage";
import { AnimatePresence } from "framer-motion";
import {
  AccountBio,
  AccountGallery,
  AccountPersonal,
  AccountPersonalHidden,
} from "@/entities/user";
import { AccountWall } from "@/widgets/account-wall";
import { AccountPersonalSpoilerButton } from "@/shared/ui/AccountSpoilerBtn";
import styles from './UserInfo.module.scss'

export const UserInfo = () => {
  const personalInfo = useSelectPersonal();
  const contactsInfo = useSelectContacts();
  const isHiddenInfoExists =
    (personalInfo) ||
    (contactsInfo);
  const [isOpen, setIsOpen] = useState(false);
  const infoID = useId();

  return (
    <div className={styles.userInfo}>
      <AccountBio />

      <AccountPersonal />

      {isHiddenInfoExists && (
        <AccountPersonalSpoilerButton
          isOpen={isOpen}
          children={
            isOpen
              ? "Скрыть подробную информацию"
              : "Показать подробную информацию"
          }
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
            } else if (isOpen) {
              setIsOpen(false);
            }
          }}
          ariaControls={infoID}
        />
      )}

      <AnimatePresence>
        {isOpen === true && <AccountPersonalHidden id={infoID} />}
      </AnimatePresence>

      <AccountGallery />

      <AccountWall />
    </div>
  );
};
