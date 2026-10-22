import { useFetchPosts } from "@/entities/posts/model/usePosts";
import style from './AdminPostsTable.module.scss'
import { useDeletePost } from "@/entities/posts/model/useDeletePost";
import { AdminPostsTableItem } from "@/features/admin-tab-post-item";
import { useAuthStore } from "@/entities/user/model/useAuthStore";

export const AdminPostsTable = () => {
  const currentUserId = useAuthStore((state) => state.currentUserId)
  const { data: posts = [] } = useFetchPosts(currentUserId);
  const {mutate: deletePost} = useDeletePost()
  
  return (
    <div className={style.postsTable}>
      {posts.map((post) => (
        <AdminPostsTableItem
          key={post.id}
          id={post.id}
          content={post.content}
          date={post.date}
          username={post.username}
          userPictureSrc={post.userPictureSrc}
          imageContentSrc={post.imageContentSrc}
          onDelete={() => deletePost(post.id)}
          author_id={post.author_id}
          wall_id={post.wall_id}
        />
      ))}
    </div>
  );
};
