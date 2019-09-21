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

  await bcrypt
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
