const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    
    try {

    let post = await Post.findById(req.body.post)

    if (post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
            });
                // handle error

                post.comments.push(comment);
                post.save();

                req.flash('success', 'Comment created successfully');
                res.redirect('/');
        }
    } catch (err) {
        req.flash('error', 'Error in creating post');
        return;
    }

}

module.exports.destroy = function(req, res){
    // delete the comment
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id || post.user.id == req.user.id){

            let postId = comment.post;

            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                req.flash('success', 'Comment deleted successfully');
                return res.redirect('back');
            });


        }else{
            return res.redirect('back');
        }
    });
}