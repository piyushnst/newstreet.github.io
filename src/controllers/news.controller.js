const News = require("../models/news.model");

const createNews = async (req, res) => {
  try {
    //check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }
    
    const { id, title, description } = req.body;
    const imageUrl = req.file.path;

    //create a new product instance
    const newNews = new News({
      id,
      title,
      description,
      imageUrl,
    });

    const savedNews = await newNews.save();

    res.status(201).json({
      message: "News created successfully",
      News: savedNews,
    });
  } catch (error) {
    console.error("Error creating News", error.message);
    res.status(500).json({
      message: `Failed to create News ${error.message}`,
      error: error.message,
    });
  }
};
const getNews = async (req, res) => {
  try {
    const news = await News.find({}); // Fetch all news
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

module.exports = { createNews, getNews };
