import { AccountWallPost } from "@/entities/posts";
import { motion } from "framer-motion";
import styles from "./AccountWall.module.scss";
import { useFetchPosts } from "@/entities/posts/model/usePosts";
import { useWallWebsocket } from "@/widgets/account-wall/model/useWallWebsocket";
import { SkeletonWall } from "@/shared/ui/SkeletonMainPage/SkeletonWall";
import { WallFetchError } from "@/widgets/account-wall/ui/WallFetchError";

interface WallContentProps {
  wallId: string;
}

export const WallContent = (props: WallContentProps) => {
  const { wallId } = props;
  const { data: posts = [], isLoading, isError, refetch } = useFetchPosts(wallId);

  useWallWebsocket(wallId);

  if (isLoading) {
    return <SkeletonWall />;
  }

  if (isError) {
      <WallFetchError refetch={refetch}/>
    }

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
  );
};
