const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db1 = require('./config/mongoose.js');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { resolveInclude } = require('ejs');
const MongoStore = require('connect-mongo');
const { db } = require('./models/user.js');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: 'true',
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and script from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set the views
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'rescode',
    // TODO change teh secret before deployment in production mode
    secret: 'magichoungayaha',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        mongoURL = db1,
        autoRemove= 'disabled',
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

// start passport middleware's work
app.use(passport.initialize());
app.use(passport.session());

//remove this and see how the user data will not be accessible in the user_profile.ejs page. 
// that is because this function sort of makes sure that the locals variable is 
app.use(passport.setAuthenticatedUser);

// use flash to chatter using sessions
app.use(flash());

// use middleware in the config file and run the setFlash function 
app.use(customMware.setFlash);

//use express router - last line from index.js in routes brings it to you
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`The connection was unsuccessful: ${err}`);
        return;
    };
    
    console.log(`The connection was successful at port: ${port}`);
});