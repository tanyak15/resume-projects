const router = require("express").Router();

// our album model
const album = require("../models/album");

router.post("/save", async (req, res) => {
  const newAlbum = album({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });

  try {
    const saveAlbum = await newAlbum.save();
    return res.status(200).send({ success: true, album: saveAlbum });
  } catch (err) {
    return res.status(400).send({ success: false, msgg: err });
  }
});

// // get request to collect single album info

router.get("/getOne/:id", async (req, res) => {
  //   return res.json(req.params.id);

  //?It is giving us the data from mongodb
  const filter = { _id: req.params.id };

  const data = await album.findOne(filter);
  if (data) {
    return res.status(200).send({ success: true, album: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// // get all info which is matching the album

router.get("/getAll", async (req, res) => {
  const options = {
    // sorting acc. tothe created on time
    sort: { createdAt: 1 },
  };

  const data = await album.find({}, {}, options);
  if (data) {
    return res.status(200).send({ success: true, data: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await album.deleteOne(filter);
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
    const result = await album.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
      },
      options
    );
    return res.status(200).send({ album: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
