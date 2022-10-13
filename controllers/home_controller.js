const Post = require('../models/post')

module.exports.home = function(req, res){
    
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    //     });
    // });

        // populate the user of each post
        Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function(err, posts){
            return res.render('home', {
                title: "Rescode | Home",
                posts:  posts
            });
        })
};

module.exports.gamefeed = function(req, res){
    return res.end('<h1>should have played a game here, this runs from a statement in routes/index.js that fetches a homecontroller function directly</h1>');
};

