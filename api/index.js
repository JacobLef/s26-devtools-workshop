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

// ========= Write your own request here to do whatever you want ========
app.post('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id < 0 || id >= users.length) {
    req.status(404).send("User not found");
    return;
  }

  if (!req.body || !req.body.name) {
    res.status(400).send("Missing a name in the request body.");
    return;
  }

  users[id] = req.body.name;
  res.send(`User at index ${id} updated to ${req.body.name}`);
});

// ======= Delete request ======
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id < 0 || id >= users.length) {
    res.status(404).send("Users not found!");
    return;
  }
  const deletedUser = users.splice(id, 1);
  res.send(`User ${deletedUser} has been deleted.`);
});
