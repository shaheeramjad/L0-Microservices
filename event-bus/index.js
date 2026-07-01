const express = require ('express');
const bodyParser = require ('body-parser');
const axios = require ('axios');

const app = express ();
app.use (bodyParser.json ());

const events = [];

app.post ('/events', async (req, res) => {
  const event = req.body;

  events.push (event);

  const targets = [
    'http://posts-clusterip-srv:4000/events',
    'http://comments-srv:4001/events',
    'http://query-srv:4002/events',
    'http://moderation-srv:4003/events'
  ];

  await Promise.all(targets.map(async (url) => {
    try {
      await axios.post(url, event);
    } catch (err) {
      console.log(`Event Bus forward failed for ${url}: ${err.message}`);
    }
  }));

  res.send ({ status: 'OK' });
}); 

app.get ('/events', (req, res) => {
  res.send (events);
});


app.listen (4005, () => {
  console.log ('Event Bus listening on port 4005');
});