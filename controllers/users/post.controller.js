const Post = require("./../../model/Post");

exports.createPost = async (req, res) => {
  let { title, content, img, private } = req.body;
  if (!title || title.trim().length <= 0) {
    return res.status(400).send({ err: "Title cannot be empty" });
  }
  if (!content || content.trim().length <= 0) {
    return res.status(400).send({ err: "Content cannot be empty" });
  }
  if (!img || img.trim().length <= 0) {
    return res.status(400).send({ err: "Image cannot be empty" });
  }

  try {
    const post = new Post({
      title,
      content,
      img,
      private,
      user: req.user._id,
    });
    const data = await post.save();
    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
