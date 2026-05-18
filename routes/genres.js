const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
  res.send(genres);
})

router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Could not find genre with given id');

  res.send(genre);
})

router.post('/', (req, res) => {
  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = req.body;
  genre.id = genres.length + 1;
  genres.push(genre);
  res.send(genre);
})

router.put('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Could not find genre with given id');

  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
})

router.delete('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Could not find genre with given id');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
})

module.exports = router;