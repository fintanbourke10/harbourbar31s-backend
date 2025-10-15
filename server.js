const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;

app.use((req, res, next) => {
    console.log('Request origin:', req.get('origin'));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(cors({
    origin: 'https://harbourbar31s-backend.onrender.com',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory storage (replace with database in production)
let users = {
    fintan: { password: 'fintanpass' },
    macken: { password: 'mackenpass' },
    richard: { password: 'richardpass' },
    johnny: { password: 'johnnypass' },
    peterbaby: { password: 'peterpass' },
    jody: { password: 'jodypass' }
};
let currentUser = null;
let comments = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username);
    if (users[username] && users[username].password === password) {
        currentUser = username;
        res.json({ success: true, message: 'Logged in successfully', user: username });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

app.get('/logout', (req, res) => {
    console.log('Logout attempt by:', currentUser);
    currentUser = null;
    res.json({ success: true, message: 'Logged out successfully' });
});

app.get('/status', (req, res) => {
    res.json({ loggedIn: !!currentUser, user: currentUser });
});

app.get('/comments', (req, res) => {
    console.log('GET /comments - currentUser:', currentUser);
    if (!currentUser) {
        return res.status(403).json({ success: false, message: 'You must be logged in' });
    }
    res.json(comments);
});

app.post('/comments', (req, res) => {
    console.log('POST /comments by:', currentUser);
    if (!currentUser) {
        return res.status(403).json({ success: false, message: 'You must be logged in' });
    }
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ success: false, message: 'Comment cannot be empty' });
    }
    const newComment = {
        id: Date.now(),
        author: currentUser,
        text: text.trim(),
        timestamp: new Date().toISOString()
    };
    comments.push(newComment);
    res.json({ success: true, message: 'Comment added', comment: newComment });
});

app.delete('/comments', (req, res) => {
    console.log('DELETE /comments by:', currentUser);
    if (!currentUser) {
        return res.status(403).json({ success: false, message: 'You must be logged in' });
    }
    comments = []; // Clear all comments
    res.json({ success: true, message: 'All comments deleted' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});