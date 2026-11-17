import { AddCommentForm } from "@/features/create-comment-form/ui/AddCommentForm"
import { CommentariesContent } from "@/widgets/account-wall/ui/CommentariesContent"

interface commentsBlockProps {
    className: string,
    id: number
}

export const CommentsBlock = (props: commentsBlockProps) => {
    const {
        className, id
    } = props
    return (
        <div className={className}>
          <CommentariesContent id={id} />
          <AddCommentForm postId={id}/>
        </div>
    )
}