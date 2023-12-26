const mongoose = require("mongoose");

const albumSchema = mongoose.Schema(
  {
    name: {
      type: String,
      reqired: true,
    },
    imageURL: {
      type: String,
      reqired: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("album", albumSchema);
