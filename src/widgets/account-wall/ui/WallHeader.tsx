import { Micro_header } from "@/entities/posts";
import { AddPostForm } from "@/features/create-post/ui/AddPostForm";
import styles from "./AccountWall.module.scss";
import { postsHeaderLastSignCheck } from "@/entities/posts/lib/WallHeaderLastSignCheck";
import { useFetchPosts } from "@/entities/posts/model/usePosts";

interface WallHeaderProps {
  wallId: string
}

export const WallHeader = (props: WallHeaderProps) => {

const {wallId} = props

const { data: posts = []} = useFetchPosts(wallId)
  
  return (
    <div className={styles.wallForm}>
      <Micro_header children={postsHeaderLastSignCheck(posts)} />
      <AddPostForm />
    </div>
  );
};
