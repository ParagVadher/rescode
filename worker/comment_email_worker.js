// const queue = require('../config/kue');
// const commentsMailer = require('../mailers/comments_mailer');

// queue.process('email', function(job, done){
//     console.log('email mailer is working', job.data);
//     commentsMailer.newComment(job.data);
//     done();
// });

const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails', function(job, done){
    console.log('emails worker is processing a job ', job.data);
    //job.data contains whole info of the comment
    commentsMailer.newComment(job.data);

    done();
});