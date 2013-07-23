var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes'),
    authentication = require('./authentication'),
    passport = require('passport'),
    Backbone = require('backbone-dynamodb');
  
// Configure backbonejs-dynamo
// Have to do this since his default names arent the ones that EB provides (weird)
Backbone.DynamoDB.setup(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_KEY, 'us-east-1');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.set("view options", { layout: "layouts/default.hbs" });
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('BigDeil!!'));
app.use(express.session({secret: 'SmallOne1!'}));

app.use(passport.initialize());
app.use(passport.session()); // express session must be before this

app.use(app.router); // this must be after everyauth
app.use(express.static(path.join(__dirname, 'public')));

// Init routes
routes(app, passport);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

passport.use(authentication.local);
passport.use(authentication.facebook);
passport.use(authentication.google);

passport.serializeUser(function (user, done) {
  console.log("serialize: " + user);
  done(null, user.get('email'));
});

passport.deserializeUser(function (id, done) {
  console.log("deserialize: " + id);
  var err = null;
  done(err, { email: id });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
