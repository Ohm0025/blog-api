const { modifyMongoError } = require("../utils/apiError");
const createPost = require("../services/post.service/createPost");

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    let userId = req.userId;
    const newPost = await createPost({ title, content, userId });
    res.status(201).json({ post: newPost });
  } catch (err) {
    console.log(err);
    next(modifyMongoError(err));
  }
};
