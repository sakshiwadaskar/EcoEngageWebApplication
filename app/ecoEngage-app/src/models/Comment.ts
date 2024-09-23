export interface Comment{
    id: string,
    author: string | null,
    authorId: string | undefined,
    commentContent: string,
    postId: string
}
