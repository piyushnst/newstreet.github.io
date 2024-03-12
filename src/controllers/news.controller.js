const News = require("../models/news.model");

const createNews = async (req, res) => {
  try {
    //check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    const { title, description } = req.body;
    const imageUrl = req.file.path;

    //create a new product instance
    const newNews = new News({
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
    if (news.length === 0) {
      return res.status(200).json({
        message: "No news found!",
      });
    }
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const newsItem = await News.findOne({ _id: id });

    if (!newsItem) {
      return res.status(404).json({ message: "News item not found" });
    }

    res.status(200).json(newsItem);
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    res.status(500).json({ message: "Failed to fetch news by ID" });
  }
};

module.exports = { createNews, getNews, getNewsById };
