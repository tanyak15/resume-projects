const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");

const cors = require("cors");
app.use(cors({ origin: true }));
app.use(express.json());

// server side
app.get("/", (req, res) => {
  return res.json("hey there...");
});

// user authintication route
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

//// Artist Routes
const artistsRoutes = require("./routes/artist");
app.use("/api/artist/", artistsRoutes);

//// Albums Routes
const albumRoutes = require("./routes/albums");
app.use("/api/album/", albumRoutes);

//// Songs Routes
const songRoutes = require("./routes/songs");
app.use("/api/song/", songRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });
// client side
app.listen(4000, () => {
  console.log("Listining to port 4000");
});
