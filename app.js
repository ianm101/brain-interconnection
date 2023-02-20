// Import the required modules
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const pg = require('pg');
const Sequelize = require('sequelize');

// Set up the app
const app = express();

// Configure the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to the Postgres database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  ssl: true
});

// Define the User model
const User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

// Define the Item model
const Item = sequelize.define('Item', {
  text: Sequelize.STRING,
  importance: Sequelize.BOOLEAN,
  urgency: Sequelize.BOOLEAN
});

// Define the relationships between the models
User.hasMany(Item);
Item.belongsTo(User);

// Set up the passport authentication strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up the routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + '/public/index.html');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('/items', (req, res) => {
  Item.findAll({
    where: {
      UserId: req.user.id
    }
  }).then(items => {
    res.send(items);
  });
});

app.post('/items', (req, res) => {
  const { text, importance, urgency } = req.body;
  Item.create({
    text,
    importance,
    urgency,
    UserId: req.user.id
  }).then(item => {
    res.send(item);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
