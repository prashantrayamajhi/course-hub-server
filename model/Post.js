const mongoose = require("mongoose");
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurifier(new JSDOM().window);
const marked = require("marked");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      allowNull: false,
      trim: true,
    },

    content: {
      type: String,
      allowNull: false,
      trim: true,
    },

    img: {
      type: String,
      allowNull: false,
      trim: true,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.pre("validate", function (next) {
  const post = this;
  if (post.content) {
    post.sanitizedHTML = dompurify.sanitize(marked(post.content));
  }
  next();
});

const Post = mongoose.model("Token", PostSchema);

module.exports = Post;
