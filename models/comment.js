const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    content:{
        type: String,
        required: true
    },
    // comment belongs to a user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // many comments will be under this post
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;