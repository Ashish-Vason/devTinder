const express = require('express');

const app = express();
const port = 7777;

app.use('/test', (req, res) => res.send('Test port'));
app.use('/hello', (req, res) => res.send('Hello hello hellooo!'));
app.use('/', (req, res) => res.send('Hello from the Home Page'));

app.listen(port, () => console.log('Server is listening at', port));
