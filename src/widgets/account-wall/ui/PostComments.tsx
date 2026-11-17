import { CommentariesContent } from "@/widgets/account-wall/ui/CommentariesContent";

export const PostCommentaries = ({postId}: {postId: number}) => {

  return (
    <>
      <CommentariesContent id={postId}/>
    </>
  );
};
