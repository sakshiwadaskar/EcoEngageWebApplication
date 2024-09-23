import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { environmentalTheme } from "../services/theme";
import EditIcon from "@mui/icons-material/Edit";
import LandingBar from "../components/LandingBar.tsx";
import PostCard from "../components/PostCard.tsx";
import { getAllPosts } from "../store/post-slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { createPostThunk, getPostsThunk } from "../store/thunks/postThunks.ts";
import useFetchUser from "../hooks/fetch-user-hook.ts";

/**
 * Component for displaying all posts.
 */

const FeedPage: React.FC = () => {
  // Redux dispatch hook
  const dispatch = useDispatch<AppDispatch>();

  // Fetch User
  const user = useFetchUser();

  // Translation hook
  const { t } = useTranslation("common");

  // State for handling mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  // State for handling errors
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Additional state for handling the "Create PostCard" text field visibility
  const [showPostField, setShowPostField] = useState(false);

  // Check for mobile view
  const isMobile = useMediaQuery(environmentalTheme.breakpoints.down("sm"));

  // State for post title and content
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null); // State to store the selected image file

  // State for post ID
  const [id, setPostId] = useState("");

  // Width of the drawer to handle responsiveness.
  const drawerWidth = useMediaQuery(environmentalTheme.breakpoints.up("sm"))
    ? 280
    : `100%`;

  //displaying all the posts from redux store
  const posts = useSelector(getAllPosts());

  // useEffect for fetching posts
  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Handles the submission of a new post.
   * Validates post content and length before submission.
   * Creates a new post object and dispatches the action to add it to the store.
   */
  const handlePostSubmit = async () => {
    // Check if post content is empty
    if (!content.trim()) {
      setIsError(true);
      setErrorMessage("Post content cannot be empty.");
      setSnackbarOpen(true);
      return;
    }

    // Check if post content exceeds maximum length
    if (content.length > 200) {
      // Example max length check
      setIsError(true);
      setErrorMessage("Post content cannot exceed 200 characters.");
      setSnackbarOpen(true);
      return;
    }

    // Retrieve token from local storage
    const token = localStorage.getItem("token") || ""; // Fallback to empty string if null
    const newCreatedPostFormData = new FormData(); // Create FormData object
    newCreatedPostFormData.append("id", id);
    newCreatedPostFormData.append(
      "author",
      `${user?.firstName} ${user?.lastName}`
    );
    newCreatedPostFormData.append("title", title); // Append title
    newCreatedPostFormData.append("content", content); // Append content
    newCreatedPostFormData.append("image", image as Blob); // Append image

    localStorage.setItem("token", token);

    // Pass FormData object to createPostThunk
    dispatch(createPostThunk(newCreatedPostFormData));

    // Call the function to add a new post
    if (newCreatedPostFormData) {
      console.log("Post created successfully:", newCreatedPostFormData);
      setErrorMessage("Post created successfully:");
      setSnackbarOpen(true);

      // Optionally clear the form
      setTitle("");
      setContent("");
      setPostId("");
      setImage(null);
      setIsError(false);
      setErrorMessage("");
    } else {
      setIsError(true);
      setErrorMessage("Failed to create the post.");
      setSnackbarOpen(true);
    }
  };

  /**
   * Handles the closing of the snackbar.
   */
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  /**
   * Handles the setting of the image.
   */

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <ThemeProvider theme={environmentalTheme}>
      {/* Apply base styles */}
      <CssBaseline />
      {/* Render the landing bar */}
      <LandingBar />
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Render the drawer */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: environmentalTheme.palette.background.default,
              color: environmentalTheme.palette.text.primary,
              "& .MuiTypography-root": {
                color: environmentalTheme.palette.text.primary,
              },
            },
          }}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        >
          {/* Drawer header */}
          <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
            EcoEngage Portal 🌿
          </Typography>
          <List>
            {/* Button to toggle post creation field */}
            <ListItem onClick={() => setShowPostField(!showPostField)}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Create PostCard" />
            </ListItem>
            {/* Collapse component for post creation field */}
            <Collapse in={showPostField}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  gap: 2, // Use theme spacing for consistent gaps
                }}
              >
                {/* Input field for post title */}
                <TextField
                  error={isError}
                  helperText={isError ? errorMessage : ""}
                  sx={{
                    width: "100%",
                    marginBottom: 2,
                    "& .MuiInputBase-input": {
                      color: environmentalTheme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: environmentalTheme.palette.secondary.main, // Use secondary color for a subtle contrast
                      },
                      "&:hover fieldset": {
                        borderColor: environmentalTheme.palette.primary.light,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: environmentalTheme.palette.primary.main, // Highlight color on focus
                      },
                    },
                  }}
                  variant="outlined"
                  label={t("addTitle")}
                  placeholder={t("whatsOnyourmind")}
                  multiline
                  rows={3}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {/* Input field for post content */}
                <TextField
                  error={isError}
                  helperText={isError ? errorMessage : ""}
                  sx={{
                    width: "100%",
                    marginBottom: 2,
                    "& .MuiInputBase-input": {
                      color: environmentalTheme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: environmentalTheme.palette.secondary.main, // Use secondary color for a subtle contrast
                      },
                      "&:hover fieldset": {
                        borderColor: environmentalTheme.palette.primary.light,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: environmentalTheme.palette.primary.main, // Highlight color on focus
                      },
                    },
                  }}
                  variant="outlined"
                  label={t("addContent")}
                  placeholder={t("startaPost") + " 📸"}
                  multiline
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange} // Call handleImageChange when file selected
                />
                <Button
                  onClick={handlePostSubmit}
                  color="primary"
                  sx={{
                    marginTop: 1,
                    alignSelf: "center", // Center the button
                    backgroundColor: environmentalTheme.palette.primary.main,
                    color: environmentalTheme.palette.text.primary,
                    ":hover": {
                      backgroundColor: environmentalTheme.palette.primary.light,
                    },
                    textTransform: "none",
                    fontSize: "1rem", // Ensure text size is readable
                    size: "small",
                  }}
                >
                  {t("Create Post!")}
                </Button>
              </Box>
            </Collapse>
          </List>
        </Drawer>

        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            padding: 0,
            margin: 0,
            width: "100%",
            height: "auto", // Adjust based on content
          }}
        >
          <Paper
            elevation={3}
            sx={{
              margin: 4, // Use theme spacing
              backgroundColor: environmentalTheme.palette.background.paper,
              padding: 3, // Use theme spacing
              width: "auto", // Adjust based on content
              boxSizing: "border-box",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                margin: "20px 0",
                color: environmentalTheme.palette.text.primary,
              }}
            >
              Explore your feed... 🕺🏼
            </Typography>

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
                {isError ? errorMessage : "Post submitted successfully!"}
              </Alert>
            </Snackbar>
            {posts.map((post) => (
              // key={post.postId} style={{marginTop: "10px"}}>
              <PostCard key={post.id} post={post} />
            ))}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FeedPage;
