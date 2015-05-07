var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var app = express();

passport.use(new LocalStrategy(function(username, password, done) {
    // pretend this is calling a database
    if (username === 'jason' && password === 'secret') {
        done(null, {
            username: username
            // pretend this data came from the database
        });
    } else {
        done(null, null);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    // pretend DB work goes here...
    done(null, {
        username: username
    });
});

app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({ secret: process.env.SESSION_SECRET || 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 1337;

app.set('view engine', 'ejs');

function ensureAuthenticated(req, res, next) {
    console.log(req.isAuthenticated());
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

app.get('/login', function(req, res) {
    res.render('login');
});

// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (user) {
            req.logIn(user, function(err) {
                res.redirect('/');
            });
        } else {
            res.render('login', { error: 'Access Denied!' });
        }
    })(req, res, next);
});

app.get('/', ensureAuthenticated, function(req, res) {
    console.log(req.user);
    res.render('index');
});

app.listen(port, function() {
    console.log('http://127.0.0.1:%d', port);
});
