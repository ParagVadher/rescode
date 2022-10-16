const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){

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

            User.find({}, function(err, users){
                
                return res.render('home', {
                    title: "Rescode | Home",
                    posts: posts,
                    all_users: users
                });
            });

        });
};

module.exports.gamefeed = function(req, res){
    return res.end('<h1>should have played a game here, this runs from a statement in routes/index.js that fetches a homecontroller function directly</h1>');
};

