const About = require("../models/about.model");

const createAbout = async (req, res) => {
  try {
    //check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }
    
    const {  title, link, designation, description} = req.body;
    const imageUrl = req.file.path;

    //create a new product instance
    const newAbout = new About({
      title,
      link,
      designation,
      imageUrl,
      description,
      
    });

    const savedAbout = await newAbout.save();

    res.status(201).json({
      message: "About created successfully",
      About: savedAbout,
    });
  } catch (error) {
    console.error("Error creating AboutUs", error.message);
    res.status(500).json({
      message: `Failed to create AboutUs ${error.message}`,
      error: error.message,
    });
  }
};
const getAbout = async (req, res) => {
  try {
    const about = await About.find({}); // Fetch all news
    res.status(200).json(about);
  } catch (error) {
    console.error("Error fetching about:", error);
    res.status(500).json({ message: "Failed to fetch aboutUs" });
  }
};



module.exports = { createAbout, getAbout};
