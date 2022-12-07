const nodeMailer = require('../config/nodemailer');

// eporting a method directly
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'paragv0twitch@gmail.com',
        to: comment.user.email,
        subject: 'Comment published!',
        html: htmlString
    }, (err, info)=> {
        if(err){ console.log('Error in sending email', err); return;}
        
        console.log('Message Sent: ',info);
        console.log('comment is here', comment);
        return;
    });
}