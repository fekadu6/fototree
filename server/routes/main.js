const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./../model/user");
const router = express.Router();

const SALT = 12;

//signin api

//create account api
router.post("/signup", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const profilePic = req.body.profile_picture;
  const paymentMethod = req.body.payment_method;

  bcrypt
    .hash(password, SALT)
    .then(hashedPassword => {
      const newUser = {
        fname: fname,
        lname: lname,
        email: email,
        password: hashedPassword,
        profile_picture: profilePic,
        payment_method: paymentMethod
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

module.exports = router;
