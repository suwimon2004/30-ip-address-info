const express = require('express');
const app = express();
app.use(express.json());

app.get('/ip/my-ip', (req, res) => {
    res.json({ ip: req.ip });
});

app.post('/ip/validate', (req, res) => {
    res.json({ valid: true });
});

app.post('/ip/type', (req, res) => {
    res.json({ type: 'IPv4' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
