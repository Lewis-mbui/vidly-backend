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

app.get('/api/genres/:id', (req, res) => {
  // lookup genre with given id
  // if doesn't exist return 404
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Could not find genre with given id');

  // return the genre
  res.send(genre);
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
})