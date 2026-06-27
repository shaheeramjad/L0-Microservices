const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    res.send({});
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    });

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {

    console.log('Event Received',req.body.type);
    // const event = req.body;

    // switch (event.type) {
    //     case 'CommentCreated':
    //         const post = posts[event.data.postId];
    //         if (post) {
    //             post.comments = post.comments || [];
    //             post.comments.push({
    //                 id: event.data.id,
    //                 content: event.data.content,
    //                 status: event.data.status
    //             });
    //         }
    //         break;
    //     case 'CommentUpdated':
    //         const postToUpdate = posts[event.data.postId];
    //         if (postToUpdate && postToUpdate.comments) {
    //             const comment = postToUpdate.comments.find(comment => comment.id === event.data.id);
    //             if (comment) {
    //                 comment.status = event.data.status;
    //                 comment.content = event.data.content;
    //             }
    //         }
    //         break;
    // }

     res.send({});
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});