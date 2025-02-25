const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const verificationRoutes = require('./routes/verificationRoutes');
const productKeyRoutes = require('./routes/productKeyRoutes');

app.use('/', verificationRoutes);
app.use('/', productKeyRoutes);

app.get('/', (req, res) => {
    res.json({ status: 1, message: 'Welcome to the server' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});