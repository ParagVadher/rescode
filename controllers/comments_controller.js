const Comment = require('../models/comment');
const Post = require('../models/post');
const queue = require('../config/kue');
const commentEmailWorker = require('../worker/comment_email_worker');

module.exports.create = async function(req, res)
{
    try
    {
        let post = await Post.findById(req.body.post);
        if(post)
        {
            let comment = await Comment.create
            (
                {
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                }
            );
            post.comments.push(comment);
            post.save();

            comment = await Comment.findById(comment._id).populate('user','name email');

            let job = queue.create('email', comment).save(function(err){
                if(err){
                    console.log('error on sending email to the queue: ', err);
                    return;
                }
                console.log('job enqueued', job.data);
            });
            
            console.log('Is this xhr?: ', req.xhr);
            if (req.xhr)
            {

                return res.status(200).json
                ({
                    data: 
                    {
                        comment: comment
                    },
                    message: "Comment created"
                });
            }

            req.flash('success', 'Comment Added');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res)
{
    try
    {
        let comment = await Comment.findById(req.params.id);
        let post = await Post.findById(comment.post);
        if(comment.user == req.user.id ||  post.user == req.user.id)
        {
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            // send the comment id which was deleted back to the views
            if (req.xhr)
            {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                });
            }
                
            req.flash('success', 'Comment Removed');
            return res.redirect('back');
        }
        else
        {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        req.flash('error', err);
        return;
    }
}