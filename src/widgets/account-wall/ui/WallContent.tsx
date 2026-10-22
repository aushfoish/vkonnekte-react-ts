import { AccountWallPost } from "@/entities/posts"
import { motion } from "framer-motion";
import styles from './AccountWall.module.scss'
import { useFetchPosts } from "@/entities/posts/model/usePosts";
import { useWallWebsocket } from "@/widgets/account-wall/model/useWallWebsocket";
import { useAuthStore } from "@/entities/user/model/useAuthStore";

export const WallContent = () => {
    const currentUserId = useAuthStore((state) => state.currentUserId)
    useWallWebsocket(currentUserId)
    
      const { data: posts = []} = useFetchPosts(currentUserId);

    return (
        <div className={styles.wallContent}>
        {posts.map((post) => (
          <motion.div
            layout
            key={post.id}
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
            }}
          >
            <AccountWallPost
              alt={post.username}
              userPicSrc={post.userPictureSrc}
              id={post.id}
              text={post.content}
              label={post.username}
              date={post.date}
              imgSrc={post.imageContentSrc}
            />
          </motion.div>
        ))}
      </div>
    )
}