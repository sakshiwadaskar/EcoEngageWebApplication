import Post from '../model/post.js'


// //Creates a New PostCard
// export const create =async (post) => {
//     const newPost = new PSchema(post);
//     console.log(newPost);
//     return await newPost.save();
// }



/**
 * Adds a new PostCard to the database.
 * @param {object} newPostData - Data of the new PostCard to be added.
 * @returns {Promise<object>} - A promise that resolves to the added PostCard object.
 */
export const addPost_DB = async (newPostData) => {
  try {
    console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: addPost_DB ++++++++++++++++++++++++++++");

    console.log("New PostCard data passed to the method: ", newPostData);

    const newPost= new Post(newPostData);
    console.log("Newly Created PostCard object from DB: ", newPost);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");

    return await newPost.save();
  } catch (error) {
    console.error("Error in addPost_DB:", error);
    throw error;
  }
}


/**
 * Updates an existing PostCard in the database.
 * @param {string} id - ID of the PostCard to be updated.
 * @param {object} updatedPostData - Updated data for the PostCard.
 * @returns {Promise<object>} - A promise that resolves to the updated PostCard object.
 */
export const updatePost_DB = async (id, updatedPostData) => {
  try {
    console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: updatePost_DB ++++++++++++++++++++++++++++");
    console.log("updatedPostData passed to the method: ", id);
    console.log("updatedPostData passed to the method: ", updatedPostData);

    const updatedPost = await Post.findByIdAndUpdate(id, updatedPostData, { new: true }).exec();
    console.log("Updated PostCard object from DB: ", updatedPost);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");

    return updatedPost;
  } catch (error) {
    console.error("Error in updatePost_DB:", error);
    throw error;
  }
}


/**
 * Deletes an PostCard from the database.
 * @param {string} id - ID of the PostCard to be deleted.
 * @returns {Promise<object>} - A promise that resolves to the deleted PostCard object.
 */
export const deletePost_DB = async (id) => {
  try {
    console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: deletePost_DB  ++++++++++++++++++++++++++++");
    console.log("Id of the PostCard to be deleted passed to the method: ", id);

    const deletedPost = await Post.findByIdAndDelete(id).exec();
    console.log("Deleted PostCard object from DB: ", deletedPost);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");

    return deletedPost;
  } catch (error) {
    console.error("Error in deletePost_DB:", error);
    throw error;
  }
}



/**
 * Retrieves a PostCard from the database by its ID.
 * @param {string} id - ID of the PostCard to retrieve.
 * @returns {Promise<object>} - A promise that resolves to the retrieved PostCard object.
 */
export const getPostById_DB = async (id) => {
  console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: getPostById_DB  ++++++++++++++++++++++++++++");
  console.log("Id of the PostCard to be retrived passed to the method: ", id);

  const particularPost = await Post.findById(id).exec();
  console.log("Particule PostCard object from DB: ", particularPost);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");

  return particularPost;
}



// Fetch the Posts From The author

/**
 * Retrieves posts from the database by the logged-in user's ID.
 * @param {string} loggedInUserId - ID of the logged-in user.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of PostCard objects.
 */
export const getPostsByLoggedInUser_DB = async (loggedInUserId) => {
  try {
    const posts = await Post.find({ authorId: loggedInUserId }).exec();
    return posts;
  } catch (error) {
    console.error("Error in getPostsByLoggedInUser_DB:", error);
    throw error;
  }
}

/**
 * Fetches all posts from the database.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of PostCard objects.
 */
export const fetchAllPosts_DB = async () => {
  try {
    const posts = await Post.find().exec();
    return posts;
  } catch (error) {
    console.error("Error in fetchAllPosts_DB:", error);
    throw error;
  }
};


