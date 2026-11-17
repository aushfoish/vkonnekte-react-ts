import { motion } from "framer-motion";
import styles from "./AccountWall.module.scss";
// import { useFetchPosts } from "@/entities/posts/model/usePosts";
// import { useWallWebsocket } from "@/widgets/account-wall/model/useWallWebsocket";
// import { SkeletonWall } from "@/shared/ui/SkeletonMainPage/SkeletonWall";
// import { WallFetchError } from "@/widgets/account-wall/ui/WallFetchError";
// import { useDeletePost } from "@/entities/posts/model/useDeletePost";
import { useFetchComments } from "@/entities/posts/model/useComment";
import { PostComment } from "@/entities/posts/ui/WallPost/PostComment";

interface props {
  id: number
}

export const CommentariesContent = (props: props) => {
  const { id } = props;
//   const { data = [], isLoading, isError, refetch } = useFetchComments(postId);
  const { data = [] } = useFetchComments(id);
//   const { mutate: deletePost } = useDeletePost();

//   useWallWebsocket(wallId);

//   if (isLoading) {
//     return <SkeletonWall />;
//   }

//   if (isError) {
//     <WallFetchError refetch={refetch} />;
//   }
  if (data.length > 0)
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
          <PostComment
            // onDelete={() => deletePost(post.id)}
            id={post.id}
            content={post.content}
            date={post.date}
            author_id={post.author_id}
            author={post.author}
          />
        </motion.div>
      ))}
    </div>
  );
};