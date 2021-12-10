import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';
// import techFundings from './data/tech_fundings.json';
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
  const apiGuide = {
    Endpoints: [
      {
        '/books------------------------->': 'Get all books',
        '/books/id/--------------------->': 'Get book by Id',
        '/books/isbn/:isbn-------------->': 'Get book by isbn number',
        '/books/language_code/:spa------>': 'Get books in spanish language',
        '/books/language_code/:eng------>': 'Get books in english language',
        '/books/num_pages/:num_pages---->': 'Get books by number of pages',
      },
    ],
  };
  res.send(apiGuide);
});

// app.get('/books', (req, res) => {
//   res.json(booksData);
// });

app.get('/books', (req, res) => {
  res.json(booksData);
});

app.get('/books/id/:id', (req, res) => {
  const { id } = req.params;
  const bookId = booksData.find((item) => item.bookID === +id);
  if (!bookId) {
    res.status(404).send('No book found with that id');
  } else {
    res.json(bookId);
  }
});

app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  const isbnNr = booksData.find((item) => item.isbn === +isbn);
  if (!isbnNr) {
    res.status(404).send('No book found with that isbn number');
  } else {
    res.json(isbnNr);
  }
});

//endpoint for books in spanish
app.get('/books/language_code/:spa', (req, res) => {
  const spa = req.params.spa;
  const spaBooks = booksData.filter((item) => item.language_code === spa);
  if (!spaBooks) {
    res.status(404).send('No books found with spanish language');
  } else {
    res.json(spaBooks);
  }
});
//endpoint for books in english -made a paginated api here
app.get('/books/language_code/:eng', (req, res) => {
  const eng = req.params.eng;
  const engBooks = booksData.filter((item) => item.language_code === eng);
  if (!spaBooks) {
    res.status(404).send('No books found with english language');
  } else {
    res.json(engBooks);
  }
});

//endpoint by number of pages
app.get('/books/num_pages/:num_pages', (req, res) => {
  const { num_pages } = req.params;

  const numberOfPAges = booksData.filter(
    (item) => item.num_pages === +num_pages
  );
  if (!numberOfPAges >= 0) {
    res.status(404).send('No books found with 0 amount of pages');
  } else {
    res.json(numberOfPAges);
  }
});

// app.get('/books/language_code/:en-us', (req, res) => {
//   const us = req.params.us;
//   const usBooks = booksData.filter((item) => item.language_code === us);
//   if (!usBooks) {
//     res.status(404).send('No book found with english language');
//   } else {
//     res.json(usBooks);
//   }
// });

// app.get('/fundings', (req, res) => {
//   const { company } = req.query;

//   //stala na maks predavanju na 01:14

//   let techFundingsToSend = techFundings;

//   if (company) {
//     const filteredFundings = techFundings.filter(
//       (item) => item.Company.toLowerCase().indexOf(company.toLowerCase()) !== -1
//     );
//     res.json({
//       response: filteredFundings,
//       success: true,
//     });
//   }

//   res.json({
//     response: techFundings,
//     success: true, ///gives the whole list back
//   });
// });

// app.get('/fundings/id/:id', (req, res) => {
//   const { id } = req.params;
//   const companyId = techFundings.find((company) => company.index === +id);
//   if (!companyId) {
//     res.status(404).send('No company found with that Id!');
//   } else {
//     res.json(companyId);
//   }
// });

// app.get('/fundings/company/:company', (req, res) => {
//   const { company } = req.params;

//   const companyByName = techFundings.find((item) => item.Company === company);

//   if (!companyByName) {
//     res.status(404).json({
//       response: 'No company found with that name',
//       success: false,
//     });
//   } else {
//     res.status(200).json({
//       response: companyByName,
//       success: true,
//     });
//   }
// });

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
