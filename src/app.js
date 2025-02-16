const express = require('express');

const app = express();
const port = 7777;

app.get('/user', (req, res) =>
  res.send({
    firstName: 'Ashish',
    lastName: 'Vason',
  })
);

// regex

app.get('/ab?c', (req, res) => res.send('playing with routes')); // b is optional
app.get('/ab+c', (req, res) => res.send('playing with routes')); // b is as many as possible.
app.get('/ab*c', (req, res) => res.send('playing with routes mul'));
app.get('([A-Z])w+', (req, res) => res.send('playing with regex')); // regex

app.post('/user', (req, res) => res.send('user data saved Successfully.'));
app.patch('/user', (req, res) => res.send('user data updated Successfully.'));
app.delete('/user', (req, res) => res.send('user data deleted Successfully.'));

app.use('/test', (req, res) => res.send('Test port'));
app.use('/hello', (req, res) => res.send('Hello hello hellooo!'));
// app.use('/', (req, res) => res.send('Hello from the Home Page'));

app.listen(port, () => console.log('Server is listening at port', port));
