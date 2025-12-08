const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users/:userid/profile', (req, res) => {
  const userId = req.params.userid;
  const name = req.query.name;
  const age = req.query.age;
  res.send(`User ID: ${userId}, Name: ${name}, Age: ${age}`);
  
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
