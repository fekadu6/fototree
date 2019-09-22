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




//get photo details api



router.get('/photodetail/:user_id/:photo_id', async (req, res, next) => {
  console.log("hi");

  let userID = req.param.user_id;
  let photoID = req.param.photo_id;

  User.find({ _id: userID, uploaded_photos: { $elemMatch: { _id: photoID } } })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });

});






module.exports = router;







   //<field>: {$elemMatch: {<query1>, <query2>, ... } } }
        //   if (!user) {
        //     return res.json({ message: 'SOmething..' })
        //   }


        //   user.find({ "uploaded_photos._id": photoID }).then((data) => {
        //     console.log(data);
        //     res.status(200).json(data);
        //   })
        //     .catch((error) => {
        //       console.log(error);
        //     })

        // });





