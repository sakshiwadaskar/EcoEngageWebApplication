// models/CommentCard.js
import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";


export const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: false,
        },
        author: {
            type: String,
        },
        authorId: {
            type: String,
        },
        timeStamp: {
            type: Date,
            default: Date.now,
        },
        commentContent: {
            type: String,
            required: true,
        },
    },
    schemaConfig
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;