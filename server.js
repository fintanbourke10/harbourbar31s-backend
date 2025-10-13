const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
// Allow requests from the frontend (adjust origin to match your deployed frontend URL)
app.use(cors({ origin: 'https://harbourbar31s-backend.onrender.com' }));

const users = {
  fintan: 'fintanpass',
  macken: 'mackenpass',
  richard: 'richardpass',
  johnny: 'johnnypass',
  'peter baby': 'peterpass',
  jody: 'jodypass',
  brent: 'brentpass',
  aaron: 'aaronpass',
  paddy: 'paddypass'
};

let loggedInUser = null;
let comments = [];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const lowerUsername = username.toLowerCase();

  if (!users.hasOwnProperty(lowerUsername)) {
    return res.status(403).json({ message: `Access denied, ${username}! Only board members can log in. 💦` });
  }

  if (users[lowerUsername] === password) {
    loggedInUser = lowerUsername;
    res.json({ message: 'Login successful!', user: lowerUsername });
  } else {
    res.status(401).json({ message: 'Incorrect password. 💦' });
  }
});

app.get('/logout', (req, res) => {
  loggedInUser = null;
  res.json({ message: 'Logged out successfully' });
});

app.get('/status', (req, res) => {
  res.json({ loggedIn: loggedInUser !== null, user: loggedInUser });
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  if (!loggedInUser) {
    return res.status(403).json({ message: 'You must be logged in to post a comment. 💦' });
  }
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Comment cannot be empty. 💦' });
  }
  const newComment = {
    id: Date.now(),
    author: loggedInUser,
    text,
    timestamp: new Date().toISOString()
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});