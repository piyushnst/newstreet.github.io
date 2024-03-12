const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  { title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    designation: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
