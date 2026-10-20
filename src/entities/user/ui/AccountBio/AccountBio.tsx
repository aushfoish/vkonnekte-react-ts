import { useSelectBio, useSelectFirstname, useSelectLastname } from '../../model/useProfileData'
import styles from './AccountBio.module.scss'

export const AccountBio = () => {

    const firstname = useSelectFirstname()
    const lastname = useSelectLastname()
    const bioSelector = useSelectBio()

    const fname = firstname || ''
    const lname = lastname || ''
    const combinedName = `${fname} ${lname}`.trim()

    const fullname = combinedName || "пользователь этой страницы"
    const bio = bioSelector || "является полным бездарем"
    

    
    return (
        
        <div className={styles.userName}>
              <h2 className={styles.accountName}>{fullname}</h2>
              <p className={styles.bio}>{bio}</p>
        </div>
        
        
    )
}

