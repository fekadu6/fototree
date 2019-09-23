const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./../model/user");
const getToken = require("./../middlewares/token-generator");

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

//add shopping cart items
router.post("/cart/add", async (req, res) => {
  const userId = req.body.userId;

  await User.findOne({ _id: userId })
    .then(user => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "User cannot be found. Try again" });
      }

      const newPhoto = {
        url: req.body.url,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
      };

      return User.updateOne(
        { _id: userId },
        { $push: { cart: newPhoto } }
      ).then(cart => {
        console.log(newPhoto);
        if (!cart) {
          return res
            .status(501)
            .json({ message: "Cart item could not be added." });
        }

        res
          .status(201)
          .json({ message: "Item is successfully added to the cart." });
      });
    })
    .catch(error => res.status(401).json(error));
});

//get shopping cart items by User Id
router.get("/cart/get/:userId", async (req, res) => {
  const userId = req.params.userId;

  await User.findOne({ _id: userId })
    .then(user => {
      console.log(user);

      if (!user) {
        return res
          .status(401)
          .json({ message: "User cannot be found. Try again" });
      }

      res.status(201).json({ message: "Fetching cart items", cart: user.cart });
    })
    .catch(error => res.status(401).json(error));
});

//delete shopping cart items by User Id
router.delete("/cart/delete/:userId/:cartItemId", async (req, res) => {
  const userId = req.params.userId;
  const cartItemId = req.params.cartItemId;

  let user;

  await User.updateOne(
    { _id: userId },
    { $pull: { cart: { _id: cartItemId } } }
  )
    .then(result => {
      if (!result) {
        return res
          .status(501)
          .json({ message: "Cart item could not be deleted." });
      }

      res.status(201).json({ message: "Cart item successfully deleted" });
    })
    .catch(error => res.status(401).json(error));
});

module.exports = router;
