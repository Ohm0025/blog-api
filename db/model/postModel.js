const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 40,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

exports.Post = mongoose.model.Post || mongoose.model("Post", postSchema);
