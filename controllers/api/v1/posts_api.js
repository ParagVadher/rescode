const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){
    
    // populate the user of each post
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user', '-password') //hide password in get request
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.status(200).json({
        message: "List of posts",
        posts: posts
        
    })
}

module.exports.destroy = async function(req, res){
    
    try {

        let post = await Post.findById(req.params.id);
    
        // .id means converting the object id into string
        // console.log(req);
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.json(200, {
                message: "Post and Comments deleted"
            })

        }else{
            console.log('*********',post.user);
            console.log('*********',req.user);
            // console.log('***post.user: ', post.user);
            // console.log('***post:      ', post);
            // console.log('***req.user.id:', req.user.id);
            return res.status(401).json({
                message: "You cannot delete this post"
            });
        }
    } catch (err) {
        console.log('Error found: ', err);
        return res.status(500).json({
                message: "Internal server error"
            });
    }

}