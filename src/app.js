const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');

const app = express();
const port = 7777;

// using Middleware.

// Middleware works for all admin routes.
app.use('/admin', adminAuth);

app.get('/user/getData', userAuth, (req, res) => {
  res.send('User data viewed.');
});

app.post('/user/login', userAuth, (req, res) => {
  res.send('User logged in');
});

app.get('/admin/getData', (req, res) => {
  res.send('Admin data viewed!');
});

app.post('/admin/sendData', (req, res) => {
  res.send('Admin data sent!');
});

app.listen(port, () => console.log('Server is listening at port', port));
