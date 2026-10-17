import { useFetchPosts } from "@/entities/posts/model/usePosts";
import style from './AdminPostsTable.module.scss'
import { useDeletePost } from "@/entities/posts/model/useDeletePost";
import { AdminPostsTableItem } from "@/features/admin-tab-post-item";

export const AdminPostsTable = () => {
  const { data: posts = [] } = useFetchPosts();
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
          
        />
      ))}
    </div>
  );
};
