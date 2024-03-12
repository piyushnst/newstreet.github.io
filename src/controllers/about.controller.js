const About = require("../models/about.model");

const createAbout = async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }
    
    const {  title, link, designation, description} = req.body;
    const imageUrl = req.file.path;

    
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
    const about = await About.find({}); 
    res.status(200).json(about);
  } catch (error) {
    console.error("Error fetching about:", error);
    res.status(500).json({ message: "Failed to fetch aboutUs" });
  }
};
const updateAbout = async (req, res) => {
    try {
      const aboutId = req.params.id;
      const { title, designation , description, link } = req.body;
      
      const aboutUpdates = {
        title,
        description,
        link,
        designation,
      };
  
      
      if (req.file) {
        
        aboutUpdates.imageUrl = req.file.path;
      }
  
      const updatedAbout = await About.findByIdAndUpdate(
        aboutId,
        aboutUpdates,
        { new: true }
      );
  
      if (!updatedAbout) {
        return res.status(404).json({ message: "About not found" });
      }
  
      res.status(200).json({
        message: "About updated successfully",
        about: updatedAbout,
      });
    } catch (error) {
      console.error(`Error in updating about: ${error.message}`);
      res.status(500).json({
        message: `Error in updating about: ${error.message}`,
      });
    }
  };
  
  const deleteAbout = async (req, res) => {
    try {
      const aboutId = req.params.id;
  
      const about = await About.findById(aboutId);
      if (!about) {
        return res.status(404).json({ message: "About not found" });
      }
  
      await About.findByIdAndDelete(aboutId);
  
      res.status(200).json({ message: "About deleted successfully" });
    } catch (error) {
      console.error(`Error in deleting about: ${error.message}`);
      res.status(500).json({
        message: `Error in deleting about: ${error.message}`,
      });
    }
  };
  
  


module.exports = { createAbout, getAbout, updateAbout, deleteAbout};
