import { CommentariesContent } from "@/widgets/account-wall/ui/CommentariesContent";

export const PostCommentaries = ({postId}: {postId: string}) => {

  return (
    <>
      <CommentariesContent postId={postId}/>
    </>
  );
};
