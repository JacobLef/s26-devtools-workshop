require('dotenv').config();
const express = require("express")
const app = express()
const users = []
const port = process.env.APP_PORT;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

app.get('/', (req, res) => {
  res.send("Hello users: :) " + users)
});

// ========== Post ==========
app.post('/', (req, res) => {
  if (!req.body || !req.body.name) {
    res.status(400).send("Missing a name in the request body!");
    return;
  }
  users.push(req.body.name);
  res.send(`User with name ${req.body.name} has been created`);
});

// ========= Write your own post request here to do whatever you want ========
const messages = [];

app.post('/messages', (req, res) => {
  const { user, text } = req.body;

  if (!user || !text) {
    return res.status(400).json({ error: "User and text are required!" });
  }

  const newMessage = { user, text, timestamp: new Date() };
  messages.push(newMessage);

  res.status(201).json({
    message: "Message sent successfully!",
    data: newMessage
  });
});

app.get('/messages', (req, res) => {
  res.json(messages);
});