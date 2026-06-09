const express = require('express');
const app = express();


app.get('/posts', (req, res) => {
    res.send('List of posts');
});

app.post('/posts', (req, res) => {
    res.send('Create a new post');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});