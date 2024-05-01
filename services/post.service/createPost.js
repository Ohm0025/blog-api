const { Post } = require("../../db/model/postModel");
const { User } = require("../../db/model/userModel");

const createPost = async ({ title, content, userId }) => {
  const newPost = new Post({ title, content, userId });
  const result = await newPost.save();

  const postUser = await User.findById({ _id: newPost.userId });
  postUser.posts.push(newPost);
  await postUser.save();

  return result;
};

module.exports = createPost;
