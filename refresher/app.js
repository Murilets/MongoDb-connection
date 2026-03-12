const express = require('express');
const bodyParser = require('body-parser');
const mongoDb = require('./mongo');

const app = express();

app.use(bodyParser.json());

app.post('/products', mongoDb.createProduct);

app.get('/products', mongoDb.getProducts);

app.listen(3000);  