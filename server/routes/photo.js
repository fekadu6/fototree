
const User = require("./../model/user");
const router = require('express').Router();



//get all photos
router.get("/photos", (req, res) => {
    
    User.find({}, {email:1, uploaded_photos:1}).then(photos=> {
        if(!photos){
            return res.json({"message":"not foudn "})
        }
        res.json({photos:photos});
    });
})

//get list of photos by user uploaded
router.get("/photos/:email", (req, res) => {
        console.log(req.param.email);
        User.find({email: req.params.email}, {uploaded_photos:1}).then(photos=> {
            if(!photos){
                return res.json({"message":"not found photo"})
            }
            const uploaded_photos = photos.map(p => p.uploaded_photos);
            res.json({photos:uploaded_photos});
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
            
            message = {"message":"Upload successfully!"};
            res.json(message);
        })
        
    }).catch(e => {
        console.log("error",e);
    });
})


module.exports = router;
