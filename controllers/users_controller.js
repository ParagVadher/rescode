// module.exports.profile = function(req, res){
//     return res.end('<h1>is this entertaining? ayi ayi ya</h1>');
// };

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.login = function(req, res){
    return res.end('<h1>This is supposed to be a login page</h1>');
};