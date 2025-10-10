const express = require('express');
const app = express();
const port = 3000; // You may need to adjust this based on your hosting

app.use(express.static('public')); // Serve static files from a public folder

app.get('/api/time', (req, res) => {
    const now = new Date();
    const istTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    res.json({ time: istTime });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});