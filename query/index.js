const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const event = req.body;

    switch (event.type) {
        case 'PostCreated':
            posts[event.data.id] = {
                id: event.data.id,
                title: event.data.title,
                comments: []
            };
            break;
        case 'CommentCreated':
            posts[event.data.postId].comments.push({
                id: event.data.id,
                content: event.data.content,
                status: event.data.status
            });
            break;
        case 'CommentUpdated':
            const comments = posts[event.data.postId].comments;
            const comment = comments.find(comment => comment.id === event.data.id);
            comment.status = event.data.status;
            comment.content = event.data.content;
            break;
    }

    res.send({});
});

app.listen(4002, () => {
    console.log('Query service listening on port 4002');
});
