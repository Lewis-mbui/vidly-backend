const express = require('express');
const app = express();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Horror" },
];


app.get('/', (req, res) => {
  res.send('Welcome to vidly!');
})

app.get('/api/genres', (req, res) => {
  res.send(genres);
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
})