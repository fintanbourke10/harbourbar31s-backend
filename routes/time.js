const express = require('express');
const router = express.Router();

router.get('/time', (req, res) => {
    const now = new Date();
    const istTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    res.json({ time: istTime });
});

module.exports = router;