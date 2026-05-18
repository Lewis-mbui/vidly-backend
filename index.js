const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Horror" },
];

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(20)
  }).required();

  return schema.validate(genre);
}


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

app.post('/api/genres', (req, res) => {
  // validate the data
  // if not valid return 400
  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if valid
  // add it to list of genres
  // return the saved genre
  const genre = req.body;
  genre.id = genres.length + 1;
  genres.push(genre);
  res.send(genre);
})

app.put('/api/genres/:id', (req, res) => {
  // lookup the genre with given id
  // if doesn't exist return 404
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Could not find genre with given id');

  // if exists
  // validate
  // if not valid return 400
  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if valid update the genre
  // send the updated genre
  genre.name = req.body.name;
  res.send(genre);
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
})