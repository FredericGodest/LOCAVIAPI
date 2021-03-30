// Import package.json data
const _package = require('./package.json')
// Import db config
if(process.env.NODE_ENV !== "production"){ const dbConfig = require('./db.config.js'); }
// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import CORS
let cors = require("cors");
// Import helmet
var helmet = require('helmet');
// Import Express session
var session = require('express-session')
// Import Connect Mongo session
var MongoStore = require('connect-mongo')(session);
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes");

// Connect to Mongoose and set connection variable
mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {process.stdout.write(" LOCAVI database : "); console.log('\x1b[32m%s\x1b[0m', `connected`)})
        .catch((err) => console.log('\x1b[31m', 'Error connecting db', err));

var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection, autoRemove: 'interval', autoRemoveInterval: 3600  });

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.enable('trust proxy', 1);
//use sessions for tracking logins
// const cookieConfig = (
//  (process.env.NODE_ENV === "production")?
//      {sameSite:'Lax',
//      secure: true,
//      httpOnly: true,
//      path: '/',
//      maxAge: 86400000}
//   :
//      {path: '/',
//      maxAge: 86400000}
// )
// app.use(session({
//   key: "LOC_session",
//   secret: process.env.SESS_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   store: sessionStore,
//   rolling: true,
//   proxy:true,
//   cookie: cookieConfig
// }));

// Setup server port
var port = process.env.PORT || 8080;

// Setup CORS Options
var corsOptions = {
  // credentials: true,
  origin: [
    'https://locavirestapi.herokuapp.com',
    'http://localhost:3000'
  ],
  // exposedHeaders: ['set-cookie']
};
// Configure CORS
app.use(cors(corsOptions))
//Use helmet
app.use(helmet());

// Use Api routes in the App
app.use('/', apiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Error 404 - Not found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app
