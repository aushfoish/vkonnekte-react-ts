import { postsHeaderLastSignCheck } from "@/entities/posts/lib/WallHeaderLastSignCheck";
import { describe, expect, it } from "vitest";


const array1 = [
    {id: 1, content: "1", date: "1", username: "1", userPictureSrc: "1", imageContentSrc: "1", wall_id: "1", author_id: "1"}
]

const array3 = [
    {id: 1, content: "1", date: "1", username: "1", userPictureSrc: "1", imageContentSrc: "1", wall_id: "1", author_id: "1"},
    {id: 2, content: "1", date: "1", username: "1", userPictureSrc: "1", imageContentSrc: "1", wall_id: "1", author_id: "1"},
    {id: 3, content: "1", date: "1", username: "1", userPictureSrc: "1", imageContentSrc: "1", wall_id: "1", author_id: "1"}
]

const array5 = [
    {id: 1, content: "1", date: "1", username: "1", userPictureSrc: "1", imageContentSrc: "1", wall_id: "1", author_id: "1"},
    {id: 2, content: "1", date: "1", username: "1", userPictureSrc: "1", imageContentSrc: "1", wall_id: "1", author_id: "1"},
    {id: 3, content: "1", date: "1", username: "1", userPictureSrc: "1", imageContentSrc: "1", wall_id: "1", author_id: "1"},
    {id: 4, content: "1", date: "1", username: "1", userPictureSrc: "1", imageContentSrc: "1", wall_id: "1", author_id: "1"},
    {id: 5, content: "1", date: "1", username: "1", userPictureSrc: "1", imageContentSrc: "1", wall_id: "1", author_id: "1"},
]


describe("formatPostHeader", () => {
  it("Должен правильно просклонять слово 'пост'", () => {
    expect(postsHeaderLastSignCheck(array1)).toBe(`${array1.length} пост`);
    expect(postsHeaderLastSignCheck(array3)).toBe(`${array3.length} поста`);
    expect(postsHeaderLastSignCheck(array5)).toBe(`${array5.length} постов`);
  });

});