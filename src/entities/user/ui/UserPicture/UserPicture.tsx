import { useSelectAvatar, useSelectFirstname, useSelectLastname } from '../../model/useProfileData'
import styles from './UserPicture.module.scss'
import placeholder from "@/shared/assets/currentuser-placeholders-array/exited.png"


export const UserPicture = () => {

    const avatar = useSelectAvatar()
    const firstname = useSelectFirstname()
    const lastname = useSelectLastname()

    const fname = firstname || ''
    const lname = lastname || ''
    const combinedName = `${fname} ${lname}`.trim()
    const fullname = combinedName || "этой страницы"

    const userpic = avatar || placeholder

    return (
        <div className={styles.userPicture}>
              <img alt={`фотография пользователя ${fullname}`} className={styles.profilePicture} src={userpic}></img>
        </div>
    )
}

