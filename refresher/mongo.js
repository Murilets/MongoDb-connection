const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGO_URL;

const createProduct = async (req, res, next) => {
       const newProduct = {
           name: req.body.name,
           price: req.body.price
       };
        
       //here just tells MongoDB and mongo client which server we want to connect
       const client = new MongoClient(url);

       // try catch for connection to database
       try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('products').insertOne(newProduct);
       } catch (error) {
            return res.json({ message: 'Could not connect to database' });
         };
         client.close();
         res.json(newProduct); 
}

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url);

    let products;

    try {
      await client.connect();
      const db = client.db();
      products = await db.collection('products').find().toArray();
    } catch (error) {
        return res.json({ message: 'Could not retrieve products' });
    }
    client.close();
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;