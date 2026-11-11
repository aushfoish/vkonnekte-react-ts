import { useFetchPosts } from "@/entities/posts/model/usePosts";
import style from './AdminPostsTable.module.scss'
import { useDeletePost } from "@/entities/posts/model/useDeletePost";
import { AdminPostsTableItem } from "@/features/admin-tab-post-item";
import { useAuthStore } from "@/entities/user/model/useAuthStore";

export const AdminPostsTable = () => {
  const loggining = useAuthStore((state) => state.isUserLoggining)
  const currentUserId = useAuthStore((state) => state.currentUserId)
  
  const { data: posts = [] } = useFetchPosts(currentUserId);
  const {mutate: deletePost} = useDeletePost()
  if (loggining)
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h3>Загружаю список постов...</h3>
      </div>
    )


  if (currentUserId !== null)
  return (
    <div className={style.postsTable}>
      {posts.map((post) => (
        <AdminPostsTableItem
          key={post.id}
          id={post.id}
          content={post.content}
          date={post.date}
          imageContentSrc={post.imageContentSrc}
          onDelete={() => deletePost(post.id)}
          author_id={post.author_id}
          wall_id={post.wall_id}
          author={(
            {
              firstname: post.author.firstname,
              lastname: post.author.lastname,
              avatar: post.author.avatar
            }
          )}
        />
      ))}
    </div>
  );
};
