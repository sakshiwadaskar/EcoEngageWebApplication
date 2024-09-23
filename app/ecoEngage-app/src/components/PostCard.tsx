import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Collapse,
  Grid,
} from "@mui/material";
import { environmentalTheme } from "../services/theme.ts"; // Adjust the path as necessary
import { ThemeProvider } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Post } from "../models/Post.ts";
import Typography from "@mui/material/Typography";
import {
  deletePost,
  getPosts,
  toggleLikeUnlike,
  updatePost,
} from "../services/posts-service.ts";
import CommentCard from "./CommentCard.tsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import useFetchUser from "../hooks/fetch-user-hook.ts";
import { loadPosts } from "../store/post-slice.ts";
import { createCommentThunk } from "../store/thunks/commentThunks.ts";
import { Comment } from "../models/Comment.ts";
import { t } from "i18next";

/**
 * Interface for defining props for the PostCard component.
 */
interface PostProps {
  post: Post;
}

/**
 * Component for rendering a single post card.
 */

const PostCard: React.FC<PostProps> = ({ post }) => {
  // State for handling comment-related errors and snackbar
  const [isErrorComment, setIsErrorComment] = useState(false);
  const [errorMessageComment, setErrorMessageComment] = useState("");
  const [snackbarOpenComment, setSnackbarOpenComment] = useState(false);

  // State for handling post-related errors and snackbar
  const [isErrorPost, setIsErrorPost] = useState(false);
  const [errorMessagePost, setErrorMessagePost] = useState("");
  const [snackbarOpenPost, setSnackbarOpenPost] = useState(false);

  // State for managing post content and title
  const [postContent, setPostContent] = useState(post.content);
  const [postTitle, setPostTitle] = useState(post.title);

  // State for managing new comment text
  const [newCommentText, setNewCommentText] = useState("");

  // Redux dispatch hook
  const dispatch = useDispatch<AppDispatch>();

  // Fetching user data
  const user = useFetchUser();

  // State for managing like-related functionality
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const [expanded, setExpanded] = useState(false);

  /**
   * handles, expand and collapse view functionality for better look and feel.
   */

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /**
   * Handles the addition of a new comment to the post.
   * Validates comment content and length before submission.
   */
  const handleAddComment = async () => {
    // Check if comment content is empty
    if (!newCommentText.trim()) {
      setIsErrorComment(true);
      setErrorMessageComment("Comment content cannot be empty");
      setSnackbarOpenComment(false);
      return;
    }
    // Check if comment content exceeds maximum length
    if (newCommentText.length > 100) {
      // Example max length check
      setIsErrorComment(true);
      setErrorMessageComment("Comment content cannot exceed 200 characters.");
      setSnackbarOpenComment(true);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("user not logged In.");
      return;
    }

    // Create a new comment object
    const newComment: Comment = {
      id: "",
      author: `${user?.firstName} ${user?.lastName}`,
      authorId: user?.userId,
      commentContent: newCommentText,
      postId: post.id,
    };

    // Dispatch action to create a new comment
    const createdComment = await dispatch(
      createCommentThunk([post.id, newComment])
    );

    if (createdComment) {
      console.log("Comment created successfully:", createdComment);
      // Optionally clear the form
      setNewCommentText("");
      setIsErrorComment(false);
      setSnackbarOpenComment(true);
    } else {
      setIsErrorComment(true);
      setErrorMessageComment("Failed to create the comment.");
      setSnackbarOpenComment(true);
    }
  };

  //----------------------------------------------------------------------Post Section----------------------------------------

  /**
   * Handles the click event for saving a post.
   * Validates post content and title before submission.
   */
  const handlePostSaveClick = async () => {
    console.log("post object:", post);
    console.log("post iddd.........", post.id);

    try {
      // Check if post content or title is empty
      if (!postContent.trim() || !postTitle.trim()) {
        setIsErrorPost(true);
        setErrorMessagePost("Post content cannot be empty.");
        setSnackbarOpenPost(true);
        return;
      }
      // Check if post content exceeds maximum length
      if (postContent.length > 200) {
        setIsErrorPost(true);
        setErrorMessagePost("Post content cannot exceed 200 characters.");
        setSnackbarOpenPost(true);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setIsErrorPost(true);
        setErrorMessagePost("You must be logged in to update a post.");
        setSnackbarOpenPost(true);

        return;
      }

      const updatedPost = { title: postTitle, content: postContent };
      const result = await updatePost(post.id, updatedPost, token);
      if (result) {
        console.log("Post updated successfully:", result);
        setSnackbarOpenPost(true);
        // Refresh or redirect here if needed
      }
    } catch (error) {
      console.error("Failed to update the post:", error);
      setIsErrorPost(true);
      setErrorMessagePost(
        "Failed to update the post. You're not authorized to make any updates to this post."
      );
      setSnackbarOpenPost(true);
    }
  };

  /**
   * Handles the click event for deleting a post.
   */
  const handlePostDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setIsErrorPost(true);
      setErrorMessagePost("You must be logged in to delete a post.");
      setSnackbarOpenPost(true);
      return;
    }

    try {
      await deletePost(post.id, token);
      console.log("Post deleted successfully");
      setIsErrorPost(false);
      setErrorMessagePost("Post deleted successfully!");
      setSnackbarOpenPost(true);
      const posts = await getPosts(); // Refreshing the posts list.
      dispatch(loadPosts(posts));
    } catch (error) {
      console.error("Failed to delete the post:", error);
      setIsErrorPost(true);
      setErrorMessagePost(
        "Failed to delete the post. You're not authorized to make any updates to this post."
      );
      setSnackbarOpenPost(true);
    }
  };

  /**
   * Handles the closing of the post-related snackbar.
   */
  const handleCloseSnackbarPost = () => {
    setSnackbarOpenPost(false);
  };

  /**
   * Handles the closing of the comment-related snackbar.
   */
  const handleCloseSnackbarComment = () => {
    setSnackbarOpenPost(false);
  };

  //-------------------------------------------------------------Toggle like unlike to a post---------------------------------------

  useEffect(() => {
    // Check if the current user has liked the post
    setIsLiked(post.likes.includes(user?.userId || ""));
  }, [post.likes, user?.userId]);

  /**
   * Handles the toggling of like/unlike for a post.
   * Updates the like count based on the current state.
   */
  const handleToggleLike = async () => {
    const token = localStorage.getItem("token"); // Fallback to empty string if null
    console.log("token......", token);
    if (!token) {
      setIsErrorPost(true);
      setErrorMessagePost("You must be logged in to update a post.");
      setSnackbarOpenPost(true);
      return;
    }
    try {
      await toggleLikeUnlike(post.id, token);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1); // Update like count based on current state
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <ThemeProvider theme={environmentalTheme}>
      {/* Card Component */}
      <Card
        sx={{
          // Styling for the card
          marginBottom: 2,
          backgroundColor: environmentalTheme.palette.primary.dark,
          color: environmentalTheme.palette.text.primary,
          borderRadius: "16px",
          overflow: "hidden",
          minWidth: 300, // Minimum width of the card
          maxWidth: "100%", // Maximum width of the card
          width: "auto", // To Allow the card to grow based on content, up to maxWidth
          transition: "box-shadow 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: `0 0 26px rgba(76, 175, 80, 0.6)`,
          },
        }}
      >
        {/* Card Content */}
        <CardContent sx={{ width: "100%" }}>
          {/* Post Author */}
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "6" }}
          >
            <IconButton>
              <AccountCircleIcon /> {/* Replace this with your desired icon */}
            </IconButton>
            <Typography>{post.author}</Typography>
          </Box>

          {/* Image upload option and Text Field for Post Title */}
          <Grid container spacing={2}>
            {post.image && (
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <img
                  src={post.image}
                  alt="Uploaded"
                  style={{ maxWidth: "140%", maxHeight: "400px" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = "";
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                error={isErrorPost}
                helperText={isErrorPost ? errorMessagePost : ""}
                label={t("titleInputLabel")}
                multiline
                rows={1}
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: environmentalTheme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={isErrorPost}
                helperText={isErrorPost ? errorMessagePost : ""}
                label="Content"
                multiline
                rows={3}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: environmentalTheme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* IconButton for Like/Unlike */}
          <IconButton onClick={handleToggleLike} color="error">
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          {/* Display Like Count */}
          <span>{likeCount} likes</span>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* IconButton for Post Save */}
            <IconButton onClick={() => handlePostSaveClick()}>
              <SaveIcon />
            </IconButton>
            {/* IconButton for Post Delete */}
            <IconButton onClick={() => handlePostDeleteClick()}>
              <DeleteIcon />
            </IconButton>
          </Box>

          <IconButton onClick={handleExpandClick}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {/* Nested Card Content for Comments */}
            <CardContent>
              {/*Render comments */}
              {post.comments?.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}

              <Box sx={{ marginTop: 2, display: "flex" }}>
                {/* Text Field for Adding a Comment */}
                <TextField
                  error={isErrorComment}
                  helperText={isErrorComment ? errorMessageComment : ""}
                  label="Add a comment..."
                  multiline
                  rows={1}
                  fullWidth
                  variant="outlined"
                  value={newCommentText}
                  size="small"
                  onChange={(e) => setNewCommentText(e.target.value)}
                  sx={{
                    marginLeft: 2,
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
                />
                {/* Button for Adding a Comment */}
                <Button
                  onClick={handleAddComment}
                  variant="contained"
                  size="small"
                  sx={{
                    marginLeft: 1,
                    alignSelf: "center",
                    backgroundColor: environmentalTheme.palette.primary.main,
                    color: environmentalTheme.palette.text.primary,
                    ":hover": {
                      backgroundColor: environmentalTheme.palette.primary.light,
                    },
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Add Comment
                </Button>
              </Box>
            </CardContent>
          </Collapse>
        </CardContent>
        {/* Snackbar for feedback messages - Post */}
        <Snackbar
          open={snackbarOpenPost}
          autoHideDuration={6000}
          onClose={handleCloseSnackbarPost}
        >
          <Alert
            onClose={handleCloseSnackbarPost}
            severity={isErrorPost ? "error" : "success"}
          >
            {isErrorPost ? errorMessagePost : "Post updated successfully!"}
          </Alert>
        </Snackbar>
        {/* Snackbar for feedback messages - Comment */}
        <Snackbar
          open={snackbarOpenComment}
          autoHideDuration={6000}
          onClose={handleCloseSnackbarComment}
        >
          <Alert
            onClose={handleCloseSnackbarComment}
            severity={isErrorComment ? "error" : "success"}
          >
            {isErrorComment
              ? errorMessageComment
              : "Comment created successfully!"}
          </Alert>
        </Snackbar>
      </Card>
    </ThemeProvider>
  );
};

export default PostCard;
