import { useParams } from 'react-router-dom'
import { useSelectFirstname, useSelectLastname } from '../../model/useProfileData'
import styles from './AccountTitle.module.scss'
import { useAuthStore } from '@/entities/user/model/useAuthStore'

export const AccountTitle = () => {
    const {userId} = useParams()
    const currentUserId = useAuthStore((state) => state.currentUserId)
    const userIsOwner = userId === currentUserId

    const firstname = useSelectFirstname()
    const lastname = useSelectLastname()
    const fname = firstname || ''
    const lname = lastname || ''
    const combinedName = `${fname} ${lname}`.trim()

    const fullname = combinedName || "страница пользователя"

    return (
        <div className={styles.pageHeader}>
            <h2 className={styles.pageTitle}>{fullname}</h2>
            {userIsOwner && <p className={styles.ownerSign}>(это вы)</p>}
        </div>
          
    )
}

