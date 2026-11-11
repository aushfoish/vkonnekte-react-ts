import { AccountWallPost } from "@/entities/posts";
import { motion } from "framer-motion";
import styles from "./AccountWall.module.scss";
import { useFetchPosts } from "@/entities/posts/model/usePosts";
import { useWallWebsocket } from "@/widgets/account-wall/model/useWallWebsocket";
import { SkeletonWall } from "@/shared/ui/SkeletonMainPage/SkeletonWall";
import { WallFetchError } from "@/widgets/account-wall/ui/WallFetchError";
import { useDeletePost } from "@/entities/posts/model/useDeletePost";

interface WallContentProps {
  wallId: string;
}

export const WallContent = (props: WallContentProps) => {
  const { wallId } = props;
  const { data = [], isLoading, isError, refetch } = useFetchPosts(wallId);
  const { mutate: deletePost } = useDeletePost();

  useWallWebsocket(wallId);

  if (isLoading) {
    return <SkeletonWall />;
  }

  if (isError) {
    <WallFetchError refetch={refetch} />;
  }

  return (
    <div className={styles.wallContent}>
      {data.map((post) => (
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
            onDelete={() => deletePost(post.id)}
            id={post.id}
            content={post.content}
            date={post.date}
            imageContentSrc={post.imageContentSrc}
            author_id={post.author_id}
            wall_id={post.wall_id}
            author={post.author}
          />
        </motion.div>
      ))}
    </div>
  );
};
