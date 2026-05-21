const Post = require("../models/Post");

const getUserId = (req) => req.user.id || req.user.userId;

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "firstName lastName username email")
      .populate("replies.author", "firstName lastName username email")
      .sort({ createdAt: -1 });

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    if (!req.body.content || !req.body.content.trim()) {
      return res.status(400).json({ message: "Post content is required." });
    }

    const post = await Post.create({
      content: req.body.content,
      author: getUserId(req),
    });

    const populatedPost = await Post.findById(post._id)
      .populate("author", "firstName lastName username email")
      .populate("replies.author", "firstName lastName username email");

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createReply = async (req, res) => {
  try {
    if (!req.body.content || !req.body.content.trim()) {
      return res.status(400).json({ message: "Reply content is required." });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    post.replies.push({
      content: req.body.content,
      author: getUserId(req),
    });

    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate("author", "firstName lastName username email")
      .populate("replies.author", "firstName lastName username email");

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.author.toString() !== getUserId(req)) {
      return res.status(403).json({
        message: "You can only delete your own post.",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReply = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const reply = post.replies.id(req.params.replyId);

    if (!reply) {
      return res.status(404).json({ message: "Reply not found." });
    }

    if (reply.author.toString() !== getUserId(req)) {
      return res.status(403).json({
        message: "You can only delete your own reply.",
      });
    }

    post.replies.pull(req.params.replyId);
    await post.save();

    const updatedPost = await Post.findById(req.params.postId)
      .populate("author", "firstName lastName username email")
      .populate("replies.author", "firstName lastName username email");

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  createReply,
  deletePost,
  deleteReply,
};