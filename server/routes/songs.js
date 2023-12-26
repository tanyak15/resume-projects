const router = require("express").Router();

// our Song model
const song = require("../models/song");

router.post("/save", async (req, res) => {
  const newSong = song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songURL: req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
    instagram: req.body.instagram,
  });

  try {
    const saveSong = await newSong.save();
    return res.status(200).send({ success: true, song: saveSong });
  } catch (err) {
    return res.status(400).send({ success: false, msgg: err });
  }
});

router.get("/getOne/:id", async (req, res) => {
  //   return res.json(req.params.id);
  const filter = { _id: req.params.id };

  const data = await song.findOne(filter);
  if (data) {
    return res.status(200).send({ success: true, song: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});
router.get("/getAll", async (req, res) => {
  const options = {
    // sorting acc. tothe created on time
    sort: { createdAt: 1 },
  };

  const data = await song.find({}, {}, options);
  if (data) {
    return res.status(200).send({ success: true, data: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await song.deleteOne(filter);
  if (result) {
    res
      .status(200)
      .send({ success: true, msg: "Data Deleted successfully", data: result });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

router.put("/update/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
        instagram: req.body.instagram,
      },
      options
    );
    return res.status(200).send({ song: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
