const express = require('express');

const app = express();
const port = 7777;

app.get('/user', (req, res) =>
  res.send({
    firstName: 'Ashish',
    lastName: 'Vason',
  })
);

app.use(
  '/test',
  (req, res, next) => {
    // res.send('Response!!');
    next();
  },
  (req, res, next) => {
    console.log('route handler 2');
    // res.send('Response 2nd');
    next();
  },
  (req, res, next) => {
    console.log('route handler 3');
    // res.send('Response 3rd');
    next();
  },
  (req, res, next) => {
    console.log('route handler 4');
    res.send('Response 4th');
    // next();
  }
);
// app.use('/', (req, res) => res.send('Hello from the Home Page'));

app.listen(port, () => console.log('Server is listening at port', port));
