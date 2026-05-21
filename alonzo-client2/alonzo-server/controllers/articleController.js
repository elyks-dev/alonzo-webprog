const Article = require("../models/Article");

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "firstName lastName username email")
      .sort({ createdAt: -1 });

    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id })
      .populate("author", "firstName lastName username email")
      .sort({ createdAt: -1 });

    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const uploadedImages = req.files
      ? req.files.map((file) => `/uploads/articles/${file.filename}`)
      : [];

    if (uploadedImages.length === 0) {
      return res.status(400).json({
        message: "At least one image is required.",
      });
    }

    const contentArray = req.body.content
      .split("\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const article = await Article.create({
      name: req.body.name,
      title: req.body.title,
      image: uploadedImages[0],
      images: uploadedImages,
      content: contentArray,
      author: req.user.id,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only edit your own articles.",
      });
    }

    const uploadedImages = req.files
      ? req.files.map((file) => `/uploads/articles/${file.filename}`)
      : [];

    const keptImages = req.body.keptImages
      ? JSON.parse(req.body.keptImages)
      : article.images || [];

    const finalImages = [...keptImages, ...uploadedImages];

    if (finalImages.length === 0) {
      return res.status(400).json({
        message: "At least one image is required.",
      });
    }

    const updateData = {
      name: req.body.name,
      title: req.body.title,
      image: finalImages[0],
      images: finalImages,
      content: req.body.content
        .split("\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    };

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own articles.",
      });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getMyArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};