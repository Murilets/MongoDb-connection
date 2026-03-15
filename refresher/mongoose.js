require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Could not connect to database');
});

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
    const result = await createdProduct.save();
    res.json(result);
};
exports.createProduct = createProduct;