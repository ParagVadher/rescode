module.exports.index = function(req, res){
    return res.status(200).json({
        message: 'A list of posts',
        posts: []
    })
}
