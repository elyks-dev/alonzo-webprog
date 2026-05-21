const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const {
  getArticles,
  getMyArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/articles");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get("/", getArticles);

router.get("/mine", requireAuth, getMyArticles);

router.post("/", requireAuth, upload.array("images", 5), createArticle);

router.put("/:id", requireAuth, upload.array("images", 5), updateArticle);

router.delete("/:id", requireAuth, deleteArticle);

module.exports = router;