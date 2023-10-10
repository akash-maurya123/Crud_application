const express = require("express");
const users = require("../models/userSchema");
const router = express.Router();

// router.get("/",(req,res) =>{
//     console.log("connect");
// });

// register user

router.post("/Register", async (req, res) => {
  const { name, email, age, mobile, work, address, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !address || !desc) {
    res.status(422).json("plz fill the data");
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("this is user is already present");
    } else {
      const adduser = new users({
        name,
        email,
        age,
        mobile,
        work,
        address,
        desc,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// get userData

router.get("/getdata", async (req, res) => {
  try {
    const userData = await users.find();
    res.status(201).json(userData);
    console.log(userData);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get individual user

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update user data

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateuser);
    req.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user

router.delete("/deletuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletuser = await users.findByIdAndDelete({ _id: id });
    console.log(deletuser);
    res.status(201).json(deletuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, mobile } = req.body;

  if (!email || !mobile) {
    res.status(422).json({ error: "Please provide both email and mobile" });
    return;
  }

  try {
    const user = await users.findOne({ email, mobile });

    if (!user) {
      res.status(401).json({ error: "Invalid information" });
      // Unauthorized
      return;
    }

    // You can add additional checks here if needed

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
