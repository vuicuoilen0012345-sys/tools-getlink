const express = require('express');
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');
const path = require('path');

const app = express();
const TOKEN = process.env.TOKEN || '65102|kfRrIll31vnTOGBemtqyZsMYTnww52QKOUSpSBwsu49Lttx2';

app.use(cors());
app.use(express.json());

// API routes
app.post('/get-uid-from-link', async (req, res) => {
    const { link } = req.body;
    if (!link) return res.json({ success: false, message: 'Vui lòng nhập link Facebook.' });
    try {
        const data = qs.stringify({ token: TOKEN, link });
        const response = await axios.post('https://hacklike17.com/api/get_link_uid', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        res.json(response.data);
    } catch (error) {
        res.json({ success: false, message: 'Lỗi khi gọi API.' });
    }
});

app.post('/get-uid-from-username', async (req, res) => {
    const { username } = req.body;
    if (!username) return res.json({ success: false, message: 'Vui lòng nhập username.' });
    try {
        const data = qs.stringify({ token: TOKEN, username });
        const response = await axios.post('https://hacklike17.com/api/get-uid', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        res.json(response.data);
    } catch (error) {
        res.json({ success: false, message: 'Lỗi khi gọi API.' });
    }
});

app.post('/get-tiktok-original', async (req, res) => {
    const { link } = req.body;
    if (!link) return res.json({ success: false, message: 'Vui lòng nhập link TikTok rút gọn.' });
    try {
        const data = qs.stringify({ token: TOKEN, link });
        const response = await axios.post('https://hacklike17.com/api/get-tiktok-info', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        res.json(response.data);
    } catch (error) {
        res.json({ success: false, message: 'Lỗi khi gọi API.' });
    }
});

// Phục vụ file tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Route gốc trả về index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export cho Vercel
module.exports = app;