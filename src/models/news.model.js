const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  { id: {
        type: Number,
        required: true
    },
    title: {
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

module.exports = mongoose.model("News", newsSchema);
