const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const crypto = require("crypto");

const port = 3000;

const uuid = () => crypto.randomBytes(16).toString("hex");

app.use(cookieParser());

const sessions = {};

app.get('/', (req, res) => {
  const sessionId = req.cookies['session-id'];
  if (sessions[sessionId]) {
    sessions[sessionId].visits++;
    res.send(`Session ${sessionId}\nVisits: ${sessions[sessionId].visits}`);
  } else {
    const id = uuid(); 
    sessions[id] = { visits: 1 };
    res.cookie('session-id', id, { maxAge: 600000 });
    res.send(`Welcome to session ${id}!`)
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
