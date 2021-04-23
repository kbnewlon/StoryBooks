const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars')
const passport = require('passport')
const morgan = require('morgan')
const session = require('express-session')
const connectDB = require('./config/db');

//Load config
dotenv.config({ path: './config.env' });

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
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize)
app.use(passport.session)

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));