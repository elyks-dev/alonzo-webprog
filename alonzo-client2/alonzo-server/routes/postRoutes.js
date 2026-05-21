const express = require("express");
const jwt = require("jsonwebtoken");

const {
  getPosts,
  createPost,
  createReply,
  deletePost,
  deleteReply,
} = require("../controllers/postController");

const router = express.Router();

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

router.get("/", getPosts);
router.post("/", requireAuth, createPost);
router.post("/:id/replies", requireAuth, createReply);
router.delete("/:id", requireAuth, deletePost);
router.delete("/:postId/replies/:replyId", requireAuth, deleteReply);

module.exports = router;