const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');

// Create a new Express app
const app = express();

// Set up the MongoDB session store
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/importance-urgency',
  collection: 'sessions'
});

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/importance-urgency', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log(err);
});

// Set up the Express app
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  store: store
}));

// Define the routes
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  // Check if the username and password are correct
  const username = req.body.username;
  const password = req.body.password;
  if (username === 'user' && password === 'password') {
    req.session.username = username;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

app.get('/dashboard', (req, res) => {
  // Redirect to login page if user is not logged in
  if (!req.session.username) {
    res.redirect('/');
  } else {
    res.render('dashboard');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
