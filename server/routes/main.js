const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./../model/user");
const getToken = require("./../middlewares/token-generator");
const ObjectID = require('mongodb').ObjectID

const router = express.Router();
const SALT = 12;

let token;

//signin api
router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;

  await User.findOne({ email: email })
    .then(_user => {
      if (!_user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      user = _user;

      return bcrypt.compare(password, user.password);
    })
    .then(result => {
      if (!result) {
        //console.log({ message: "Unsuccessful log in attempt" });

        return res.json({ message: "Unsuccessful login attempt" });
      }

      token = getToken(user.email, user._id);
      //console.log("Token", token, user._id);

      res.status(200).json({ token: token });
    })
    .catch(err => res.json({ error: err }));
});

//create account api
router.post("/signup", async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const profilePic = req.body.profile_picture;
  const paymentMethod = req.body.payment_method;
  const uploaded_photos = req.body.uploaded_photos;

  await bcrypt
    .hash(password, SALT)
    .then(hashedPassword => {
      const newUser = {
        fname: fname,
        lname: lname,
        email: email,
        password: hashedPassword,
        profile_picture: profilePic,
        payment_method: paymentMethod,
        uploaded_photos: uploaded_photos
      };

      const user = new User(newUser);
      console.log("uploaded photo:", newUser);

      user
        .save()
        .then(response => {
          res
            .status(200)
            .json({ message: "Successfully registered a new user" });
        })
        .catch(error => res.json({ message: error }));
    })
    .catch(error => res.json({ message: error }));
});

//get photos api




//get details of a specific photo
router.get('/photodetail/:email/:photo_id', async (req, res, next) => {
  console.log("photo detail fetch start");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.findOne({ "email": email, "uploaded_photos._id": photoID },
    {
      "_id": 0, "fname": 1, "lname": 1,
      "profile_picture": 1, "uploaded_photos.$": 1,
    },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      //console.log("comment: ", data.uploaded_photos[0].comments[0]);
      let filteredUser = {
        profile_picture: data.profile_picture,
        fname: data.fname,
        lname: data.lname,
        photo_url: data.uploaded_photos[0].url,
        photo_likes: data.uploaded_photos[0].likes,
        photo_price: data.uploaded_photos[0].price,
        photo_description: data.uploaded_photos[0].description,
        photo_title: data.uploaded_photos[0].title,
        photo_comments: data.uploaded_photos[0].comments,
        photo_category: data.uploaded_photos[0].category
      }
      //console.log("filtered user:", filteredUser);
      res.json(filteredUser);
      console.log("photo detail fetch end");
    });
});

//add a comment to a specific photo
router.patch('/photodetail/:email/:photo_id/:comment', async (req, res, next) => {
  console.log("photo detail commenting start");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  let comment = req.params.comment;
  console.log("comment: ", comment);
  let date = new Date(Date.now()).toLocaleString();
  console.log("date: ", date);
  User.updateOne({ "email": email, "uploaded_photos._id": photoID },
    { "$push": { "uploaded_photos.$.comments": { "comment": comment, "date": date } } },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      res.json("Comment is added.");
      console.log("photo detail commenting end");
    });
});

//add a like to a specific photo
router.patch('/photodetail/:email/:photo_id', async (req, res, next) => {
  console.log("photo detail liking start");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.updateOne({ "email": email, "uploaded_photos._id": photoID },
    { "$inc": { "uploaded_photos.$.likes": 1 } },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      console.log("like is added.")
    })
});

//delete a certain photo
router.patch('/photodelete/:email/:photo_id/', async (req, res, next) => {
  console.log("deleting photo started");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.updateOne({ "email": email },
    { "$pull": { "uploaded_photos": { "_id": photoID } } },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      console.log("photo is deleted.")
    })
});

//update a certain photo
router.patch('/photoupdate/:email/:photo_id/', async (req, res, next) => {
  console.log("updating photo started");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);

  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let category = req.body.category;

  User.updateOne({ "email": email, "uploaded_photos._id": photoID },
    {
      "$set": {
        "uploaded_photos.$.title": title, "uploaded_photos.$.category": category,
        "uploaded_photos.$.description": description, "uploaded_photos.$.price": price
      }
    },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      console.log("photo is updated.")
    })
})


module.exports = router;
