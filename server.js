import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';
import booksData from './data/books.json';

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
// Start defining your routes here
app.get('/', (req, res) => {
  const apiGuide = {
    Endpoints: [
      {
        '/books?page=1&limit=10--------->': 'Get first 10 books',
        '/books?title=title------------->': 'Get books by title',
        '/books?author=author----------->': 'Get books by author',
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

//endpoint that gives you all books but paginated-limit 10 per page
app.get('/books', (req, res) => {
  const { title, author } = req.query;

  let booksToShow = booksData;

  if (title) {
    booksToShow = booksToShow.filter(
      (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
  }
  if (author) {
    booksToShow = booksToShow.filter(
      (item) => item.authors.toLowerCase().indexOf(author.toLowerCase()) !== -1
    );
  }

  res.json({
    response: booksToShow,
    success: true,
  });

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  console.log({ limit });
  console.log(req.query);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.next = {
    page: page + 1,
    limit: limit,
  };

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.results = booksData.slice(startIndex, endIndex);
  console.log(results);
  res.json(results);
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
//endpoint for books in english
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

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
