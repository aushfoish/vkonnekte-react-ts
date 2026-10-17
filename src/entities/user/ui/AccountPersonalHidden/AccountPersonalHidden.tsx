import styles from "./AccountPersonalHidden.module.scss";
import { motion } from "framer-motion";
import { ContactsInfo } from "./ContactsInfo";
import { HobbiesInfo } from "./HobbiesInfo";

interface AccountInfoProps {
  id: string;
}

export const AccountPersonalHidden = (props: AccountInfoProps) => {
  const { id } = props;

  return (
    <motion.div
      className={styles.userInfo}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      style={{ overflow: "hidden" }}
      id={id}
    >
      <ContactsInfo />

      <HobbiesInfo />
      
    </motion.div>
  );
};
