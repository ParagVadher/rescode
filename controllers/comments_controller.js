// const Comment=require('../models/comment');
// const Post = require('../models/post');

// module.exports.create = function(req, res){
//     Post.findById(req.body.post, function(err, post){
//         if(err){console.log('some error in finding contact'); return;}

//         if(post){
//             Comment.create({
                
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.body._id

//             },function(err ,comment){
                
//                 // handle error - if(err){console.log('some error in creating contact'); return;}
                
//                 post.comment.push(comment);
//                 post.save();

//                 return res.redirect('/');
//             });
//         }
//     })
// }

const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}

module.exports.destroy = function(req, res){
    // delete the comment
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id || post.user.id == req.user.id){

            let postId = comment.post;

            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            });


        }else{
            return res.redirect('back');
        }
    });
}