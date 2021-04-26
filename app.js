const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const MongoDbStore = require('connect-mongo')
const connectDB = require('./config/db');

//left off at 1:10:35
//https://youtu.be/SBvmnHTQIPY


//Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport)

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Handlebars Middleware
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');


// Sessions Middleware
app.use(
  session({
      secret: 'story book',
      resave: false,
      saveUninitialized: false,
      store: MongoDbStore.create({
          mongoUrl: process.env.MONGO_URI
      })
  })
);


// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));