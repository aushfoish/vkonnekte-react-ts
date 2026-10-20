import styles from './FollowersButton.module.scss'
import { nameDeclension } from "@/entities/user/lib/nameDeclesion"
import { Button } from "@/shared/ui"
import { useSelectFirstname } from '../../model/useProfileData'

export const FollowersButton = () => {

    const firstname = useSelectFirstname()
    const name = firstname || "пользователь"

    return (
        <Button className={styles.followersButton}>
                <p className={styles.followers}>{`Подписота ${nameDeclension(name)}`}</p>
                <p className={styles.followers} id="followers-counter">25</p>
        </Button>
    )
}