const mongoose = require("mongoose");

const artistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      reqired: true,
    },
    imageURL: {
      type: String,
      reqired: true,
    },
    twitter: {
      type: String,
      reqired: true,
    },
    instagram: {
      type: String,
      reqired: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("artist", artistSchema);
