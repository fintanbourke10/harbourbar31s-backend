const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/time', (req, res) => {
    const now = new Date();
    const istTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    res.json({ time: istTime });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});