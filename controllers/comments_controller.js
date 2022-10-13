const Comment=require('../models/comments');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){console.log('some error in finding contact'); return;}

        if(post){
            Comment.create({
                
                content: req.body.content,
                post: req.body.post,
                user: req.body._id

            },function(err,comment){
                
                if(err){console.log('some error in creating contact'); return;}
                
                post.comment.push(comment);
                post.save();

                return res.redirect('/');
            });
        }
    })
}