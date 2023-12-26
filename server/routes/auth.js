const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/user");

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(505).json({ message: "UnAuthorized" });
    } else {
      //*   checking user exists or not
      const userExists = await user.findOne({ user_id: decodeValue.user_id });
      if (!userExists) {
        //* Creating a new user
        newUserData(decodeValue, req, res);
      } else {
        //* Updating a user
        updateNewUserData(decodeValue, req, res);
        // return res.send("Need to update");
      }
    }
  } catch (err) {
    return res.status(505).json({ message: err });
  }
});

//? Creating a function to store info in db
const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

const updateNewUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };

  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

router.get("/getUsers", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };
  try {
    const data = await user.find({}, {}, options);
    if (data) {
      console.log(data);
      return res.status(200).send({ success: true, data: data });
    } else {
      return res.status(400).send({ success: false, msg: "Data not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/updateRole/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const role = req.body.data.role;
  try {
    const result = await user.findByIdAndUpdate(filter._id, { role: role });

    return res.status(200).send({ user: result });
  } catch (err) {
    return res.status(400).send({ success: false, msg: err });
  }
});

router.delete("/deleteUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  // try {
  const result = await user.deleteOne(filter);
  console.log("🤐🤐", result);

  if (result.deletedCount === 1) {
    return res.status(200).send({ success: true, msg: "User Removed" });
  } else {
    res.status(500).send({ success: false, msg: "User Not Found" });
  }
  // } catch (err) {
  //   console.log(err);
  // }
});

module.exports = router;
