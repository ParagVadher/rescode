const nodeMailer = require('../config/nodemailer');

// eporting a method directly
exports.newComment = (comment) => {
    console.log('inside newComment mailer: ', comment);

    nodeMailer.transporter.sendMail({
        from: 'paragv0twitch@gmail.com',
        to: comment.user.email,
        subject: 'Comment published!',
        html: '<h1> Your comment has now been published</h1>'
    }, (err, info)=> {
        if(err){ console.log('Error in sending email', err); return;}
        
        console.log('Message Sent: ',info);
        return;
    });
}