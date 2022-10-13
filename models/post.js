const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include comment array here
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports=Post;