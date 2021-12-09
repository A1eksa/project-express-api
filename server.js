import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';
import techFundings from './data/tech_fundings.json';
import booksData from './data/books.json';

// const data = require('./data/tech_fundings.json');

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// const users = [
//   { id: 1, name: 'Alice', age: 33 },
//   { id: 2, name: 'Bob', age: 23 },
//   { id: 3, name: 'Chris', age: 3 },
//   { id: 4, name: 'Daniela', age: 67 },
// ];

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello');
});

// app.get('/books', (req, res) => {
//   res.json(booksData);
// });

app.get('/fundings', (req, res) => {
  res.json(techFundings);
});

app.get('/fundings/:id', (req, res) => {
  const { id } = req.params;
  const companyId = techFundings.find((company) => company.index === +id);
  if (!companyId) {
    res.status(404).send('No company found with that Id!');
  } else {
    res.json(companyId);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
