
const User = require("./../model/user");
const router = require('express').Router();



//get list of photos
router.get("/photos", (req, res) => {
    
    User.find({}).then(users=> {
        if(!users){
            return res.json({})
        }
        console.log("users:",users);
        const photos = users.map(u => u.uploaded_photos);
        console.log("Photo:",photos);
        res.send(users);
    });
})

//get list of photos by user uploaded
router.get("/photos/:user_id", (req, res) => {

})

//upload photo
router.post("/photos",(req, res) => {
    
    console.log(req.body);
    User.findById(req.body.user_id, (err, foundUser) => {

        console.log("foundUser", foundUser);
        if(req.body) foundUser.uploaded_photos.push(req.body.photo);

        foundUser.save((err) =>{
            if(err) res.json({"message":"Upload fail"});
            res.json({"message":"Upload successfully!"});
        })
    }).catch(err => {
        res.json({"message":"User is not found!"})
    });
})

router.patch("/photos/:id", (req, res) => {

})

router.delete("/photos/:id", (req, res) => {

})



module.exports = router;


router.post('/update-resume', function(req, res) {
    

});