const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
  {
    name: {
      type: String,
      reqired: true,
    },
    imageURL: {
      type: String,
      reqired: true,
    },
    songURL: {
      type: String,
      reqired: true,
    },
    album: {
      type: String,
    },
    artist: {
      type: String,
      reqired: true,
    },
    language: {
      type: String,
      reqired: true,
    },
    category: {
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

module.exports = mongoose.model("song", songSchema);
