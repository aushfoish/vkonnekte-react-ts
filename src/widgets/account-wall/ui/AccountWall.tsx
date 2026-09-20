import { postsHeaderLastSignCheck } from "@/entities/posts/lib/WallHeaderLastSignCheck";
import { AddPostForm } from "@/features/create-post/ui/AddPostForm";
import { Micro_header } from "@/entities/posts";
import styles from "./AccountWall.module.scss";
import { useFetchPosts } from "@/entities/posts/model/usePosts";
import { SkeletonWall } from "@/shared/ui/SkeletonMainPage/SkeletonWall";
import { Button, ContainerPlaceholder } from "@/shared/ui";
import { WallContent } from "@/widgets/account-wall/ui/WallContent";

export const AccountWall = () => {

  const { data: posts = [], isLoading, isError, refetch } = useFetchPosts();

  if (isLoading) {
    return <SkeletonWall />;
  }

  if (isError) {
    return (
      <div className={styles.wallContent}>
        <ContainerPlaceholder label="Стена не найдена, тут тебе не 2007" />
        <Button className="refetch" children="И всё же.." onClick={refetch} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.wallForm}>
        <Micro_header children={postsHeaderLastSignCheck(posts)} />
        <AddPostForm />
      </div>

      <WallContent />
    </>
  );
};
