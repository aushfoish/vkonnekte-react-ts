import type { UserPosts } from "@/entities/posts/model/types";

export const postsHeaderLastSignCheck = (posts: UserPosts[] | undefined) => {
    if (posts !== null) {
      const arrayLengthLastsign = String(posts?.length).slice(-1);
      const forA = ["2", "3", "4"];
      const toA = forA.includes(arrayLengthLastsign);
      const forOv = ["5", "6", "7", "8", "9", "0"];
      const toOv = forOv.includes(arrayLengthLastsign);
      if (posts?.length === 0) {
        return `Стена пуста`;
      }

      if (toA) {
        return `${posts?.length} поста`;
      } else if (toOv) {
        return `${posts?.length} постов`;
      } else if (arrayLengthLastsign === "1") {
        return `${posts?.length} пост`;
      }
    }
  };