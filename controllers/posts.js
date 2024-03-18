const express = require('express');
const router = express.Router();
const Post = require('../models/post');

/* GET: /api/posts => show all posts */
router.get('/', async (req, res, next) => {
    // use model to get all docs newest to oldest
    let posts = await Post.find().sort({ 'date': -1 });

    return res.json(posts).status(200);
});

module.exports = router;