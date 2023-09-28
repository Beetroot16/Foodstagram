const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const POST = mongoose.model('POST');

// Route
router.get("/allPosts", requireLogin, (req, res) => {
    POST.find().sort({'_id':-1})
    .populate("postedBy", "_id username")
    .then((posts) => {
        res.json({ posts });
    }).catch(error => console.log(error));
});

router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    if (!body || !pic) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    });
    post.save()
        .then((result) => {
            console.log(result);
            return res.json({ post: result, message: "Successfully posted" });
        })
        .catch((error) => { 
            console.error(error);
            res.status(500).json({ error: "Failed to post" });
        });
});

module.exports = router;
