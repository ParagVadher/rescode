const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){

        try {
            // populate the user of each post
            let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
            
            let users = await User.find({});
                    
            return res.render('home', {
                title: "Rescode | Home",
                posts: posts,
                all_users: users
            });

        } catch (err) {
            console.log('Error aa gaya: ', err);
            return;
        }
};

module.exports.gamefeed = function(req, res){
    return res.end('<h1>should have played a game here, this runs from a statement in routes/index.js that fetches a homecontroller function directly</h1>');
};

