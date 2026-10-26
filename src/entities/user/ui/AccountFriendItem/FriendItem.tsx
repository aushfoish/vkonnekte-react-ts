import { Link } from 'react-router-dom'
import styles from './FriendItem.module.scss'
import placeholder from '@/shared/assets/avatar-placeholder.jpg'


interface FriendItemProps {
    name: string,
    src: string | null,
    friendId: string,
}

export const FriendItem = (props:FriendItemProps) => {

    const {
        name,
        src,
        friendId
    } = props

    return (
        <Link to={`/profile/${friendId}`} className={styles.friend}>
            <img src={src ? src : placeholder} alt={`фотография пользователя ${name}`}></img>
            <button className={styles.friendName} style={{maxHeight: 28, cursor: 'pointer', backgroundColor: 'transparent', borderStyle: 'none'}}>
            {name}
            </button>
        </Link>
    )
}

