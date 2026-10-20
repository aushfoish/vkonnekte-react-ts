import { useSelectFirstname, useSelectLastname } from '../../model/useProfileData'
import styles from './AccountTitle.module.scss'

export const AccountTitle = () => {

    const firstname = useSelectFirstname()
    const lastname = useSelectLastname()
    const fname = firstname || ''
    const lname = lastname || ''
    const combinedName = `${fname} ${lname}`.trim()

    const fullname = combinedName || "страница пользователя"

    return (
          <h2 className={styles.pageTitle}>{fullname}</h2>
    )
}

