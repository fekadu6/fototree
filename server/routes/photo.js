const User = require("./../model/user");
const router = require("express").Router();
const ObjectID = require("mongodb").ObjectID;

//get all photos
router.get("/photos", (req, res) => {
    
    User.find({}, {email:1, fname:1, lname:1, profile_picture:1, uploaded_photos:1}).then(photos=> {
        if(!photos){
            return res.json({"message":"not found photo "})
        }
        res.json(photos);
    });
})

//get list of photos by user uploaded
router.get("/photos/:email", (req, res) => {
        console.log(req.params.email);
        User.find({email: req.params.email}, {email:1, fname:1, lname:1, profile_picture:1, uploaded_photos:1}).then(photos=> {
            if(!photos){
                return res.json({"message":"not found photo"})
            }
        
            res.json(photos);
        });
})

//upload photo
router.post("/photos",(req, res) => {
    let message = {};

    console.log(req.body.email);
    User.findOne({email: req.body.email}).then(user=> {
        if(!user){
            return res.json({"message":"not found photo"})
        }
        if(req.body.photo) user.uploaded_photos.push(req.body.photo);

        user.save((err) =>{
            if(err) messge = {"message":"Upload fail"};
            
            message = {"message":"Pushed photo successfully!"};
            res.json(message);
        })
        
    }).catch(e => {
        console.log("error",e);
    });
})

//get details of a specific photo
router.get("/photodetail/:email/:photo_id", async (req, res, next) => {
  console.log("photo detail fetch start");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.findOne(
    { email: email, "uploaded_photos._id": photoID },
    {
      _id: 0,
      fname: 1,
      lname: 1,
      profile_picture: 1,
      "uploaded_photos.$": 1
    },
    function(error, data) {
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
      };
      //console.log("filtered user:", filteredUser);
      res.json(filteredUser);
      console.log("photo detail fetch end");
    }
  );
});

//comment a photo
router.patch(
  "/photodetail/:email/:photo_id/:comment",
  async (req, res, next) => {
    console.log("photo detail commenting start");
    let email = req.params.email;
    let photoID = new ObjectID(req.params.photo_id);
    let comment = req.params.comment;
    console.log("comment: ", comment);
    let date = new Date(Date.now()).toLocaleString();
    console.log("date: ", date);
    User.updateOne(
      { email: email, "uploaded_photos._id": photoID },
      {
        $push: {
          "uploaded_photos.$.comments": { comment: comment, date: date }
        }
      },
      function(error, data) {
        if (error) {
          return res.json(error);
        }
        res.json("Comment is added.");
        console.log("photo detail commenting end");
      }
    );
  }
);

//like a photo
router.patch("/photodetail/:email/:photo_id", async (req, res, next) => {
  console.log("photo detail liking start");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.updateOne(
    { email: email, "uploaded_photos._id": photoID },
    { $inc: { "uploaded_photos.$.likes": 1 } },
    function(error, data) {
      if (error) {
        return res.json(error);
      }
      console.log("like is added.");
    }
  );
});

//delete a photo
router.patch("/photodelete/:email/:photo_id/", async (req, res, next) => {
  console.log("deleting photo started");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.updateOne(
    { email: email },
    { $pull: { uploaded_photos: { _id: photoID } } },
    function(error, data) {
      if (error) {
        return res.json(error);
      }
      console.log("photo is deleted.");
    }
  );
});

//update a photo
router.patch("/photoupdate/:email/:photo_id/", async (req, res, next) => {
  console.log("updating photo started");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);

  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let category = req.body.category;

  User.updateOne(
    { email: email, "uploaded_photos._id": photoID },
    {
      $set: {
        "uploaded_photos.$.title": title,
        "uploaded_photos.$.category": category,
        "uploaded_photos.$.description": description,
        "uploaded_photos.$.price": price
      }
    },
    function(error, data) {
      if (error) {
        return res.json(error);
      }
      console.log("photo is updated.");
    }
  );
});

module.exports = router;
