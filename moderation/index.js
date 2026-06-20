const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    console.log('Moderation received:', event);

    res.send({});
});

app.listen(4003, () => {
    console.log('Moderation service running on 4003');
});