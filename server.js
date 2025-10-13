const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});