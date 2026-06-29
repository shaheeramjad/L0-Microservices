const express = require ('express');
const bodyParser = require ('body-parser');
const axios = require ('axios');

const app = express ();
app.use (bodyParser.json ());

app.post ('/events', async (req, res) => {
  const event = req.body;

  const targets = [
    'http://localhost:4000/events',
    'http://localhost:4001/events',
    'http://localhost:4002/events',
    'http://localhost:4003/events'
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


app.listen (4005, () => {
  console.log ('Event Bus listening on port 4005');
});