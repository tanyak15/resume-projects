const router = require("express").Router();

// our Artists model
const artist = require("../models/artist");

router.post("/save", async (req, res) => {
  const newArtist = artist({
    name: req.body.name,
    imageURL: req.body.imageURL,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });

  try {
    const saveArtist = await newArtist.save();
    return res.status(200).send({ success: true, artist: saveArtist });
  } catch (err) {
    return res.status(400).send({ success: false, msgg: err });
  }
});

// // get request to collect single artist info

router.get("/getOne/:id", async (req, res) => {
  //   return res.json(req.params.id);

  //?It is giving us the data from mongodb
  const filter = { _id: req.params.id };

  const data = await artist.findOne(filter);
  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// // get all info which is matching the artist

router.get("/getAll", async (req, res) => {
  const options = {
    // sorting acc. tothe created on time
    sort: { createdAt: 1 },
  };

  const data = await artist.find({}, {}, options);
  if (data) {
    return res.status(200).send({ success: true, data: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await artist.deleteOne(filter);
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
    const result = await artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );
    return res.status(200).send({ artist: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
