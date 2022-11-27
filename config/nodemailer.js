const ejs = require('ejs');
const nodemailer = require('nodemailer');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail.com',
    host: 'smtp.gmail.com',
    port: '587',
    secure: 'false',
    auth: {
        user: 'paragv0twitch@gmail.com',
        pass: 'nbujtcfucjwbuscb'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data,
    function(err, template){
        if (err) {console.log('Error while rendering template'); return}

        mailHTML = template;
    });

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}