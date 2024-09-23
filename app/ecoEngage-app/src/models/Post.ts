import { Comment } from "./Comment";
export interface Post {
  id: string; // Assuming postId will be a string representation of MongoDB ObjectId
  title: string;
  content: string;
  author: string;
  creationDate?: Date | string; // Can be a Date object or string.
  image?: string; // The question mark makes this property optional
  comments?: [Comment] | undefined; // Array of string ids referring to CommentCard documents
  likes: string[]; // Array of user IDs who liked the post
}
