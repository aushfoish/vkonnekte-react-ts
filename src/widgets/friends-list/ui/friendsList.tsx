import { FriendItem } from "@/entities/user"
import { useFetchFriends } from "@/entities/user/model/useFetchFriends"

export const FriendsList = () => {

    const {data = []} = useFetchFriends("c849ba0e-1a02-4d1b-8042-01d801e3c7b1")

    return (
        <div className="friends" style={{display: 'flex', flexDirection: 'row', flexWrap: "wrap", columnGap: "20px", paddingInline: 5, paddingBlock: 10}}>
            {data.map((friend) => (
                <FriendItem key={friend.user_id}friendId={friend.user_id} name={`${friend.firstname} ${friend.lastname}`} src={friend.avatar}/>
            ))}
        </div>
    )
}