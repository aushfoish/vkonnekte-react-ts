import styles from './PersonalItem.module.scss'

interface PersonalInfoProps {
  children: React.ReactNode;
  label: string;
}

export const PersonalInfo = (props: PersonalInfoProps) => {
  const { children, label,} = props;

  return (
    <dl className={styles.infoRow}>
      <dt className={styles.label}>
        {label}
      </dt>
      <dd className={styles.content}>
        {children}
      </dd>
    </dl>
  );
};
