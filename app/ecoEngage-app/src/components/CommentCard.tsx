import React, { useState } from "react";
import {
  Alert,
  Box,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Comment } from "../models/Comment.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { environmentalTheme } from "../services/theme.ts";
import {
  deleteCommentById,
  updateCommentById,
} from "../services/comments-service.ts";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../store/comment-slice.ts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface CommentProps {
  comment: Comment;
  // isAuthor: boolean;
}

/**
 * Component for rendering a single comment card.
 */

const CommentCard: React.FC<CommentProps> = ({ comment }) => {
  const [commentContent, setCommentContent] = useState(comment.commentContent);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  // Function to handle saving a comment
  const handleCommentSaveClick = async () => {
    // const commentId = await getCommentsByPost(post.postId);

    if (!commentContent.trim()) {
      setIsError(true);
      setErrorMessage("Comment content cannot be empty.");
      setSnackbarOpen(true);
      return;
    }
    if (commentContent.length > 50) {
      setIsError(true);
      setErrorMessage("Comment content cannot exceed 200 characters.");
      setSnackbarOpen(true);
      return;
    }

    try {
      // Update the comment content
      const updatedComment = await updateCommentById(comment.id, {
        commentContent: commentContent,
      });

      if (updatedComment) {
        // This check ensures updatedComment is not null
        dispatch(updateComment(updatedComment));
      }
      setIsError(false);
      setErrorMessage("Comment updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to update the comment:", error);
      setIsError(true);
      setErrorMessage(
        "Failed to update the comment. You're not authorized to make any updates to this comment."
      );
      setSnackbarOpen(true);
    }
  };
  // Function to handle deleting a comment
  const handleCommentDeleteClick = async () => {
    console.log("Comment id to delete", comment.id);

    try {
      // Delete the comment
      await deleteCommentById(comment.id);
      dispatch(deleteComment(comment.id));
      setIsError(true);
      setErrorMessage("Comment deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to delete the comment:", error);
      setIsError(true);
      setErrorMessage(
        "Failed to delete the comment. You're not authorized to make any updates to this comment."
      );
      setSnackbarOpen(true);
    }
  };
  //Function to handle closing the snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 1, // Space between comments
        padding: 1, // Padding inside the comment box
        input: { color: environmentalTheme.palette.text.primary },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: environmentalTheme.palette.primary.main,
          },
          "&:hover fieldset": {
            borderColor: environmentalTheme.palette.primary.light,
          },
          "&.Mui-focused fieldset": {
            borderColor: environmentalTheme.palette.primary.main,
          },
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton>
          <AccountCircleIcon /> {/* Replace this with your desired icon */}
        </IconButton>
        <Typography>{comment.author}</Typography>
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextField
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
          fullWidth
          multiline
          rows={1}
          variant="outlined"
          size="small"
          sx={{ marginBottom: 1 }} // Space between the text field and the button row
        ></TextField>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleCommentSaveClick()} size="small">
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => handleCommentDeleteClick()} size="small">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Box>
      {/* Snackbar for feedback messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isError ? "error" : "success"}
        >
          {isError ? errorMessage : "Comment updated successfully!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommentCard;
