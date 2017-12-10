import express from 'express';
import bodyParser from 'body-parser';
import cookieMiddleware from './middlewares/cookieMiddleware';
import { User, Product } from './models';
import queryMiddleware from './middlewares/queryMiddleware';
import mockProducts from './mockProducts';
import mockUsers from './mockUsers';

const app = express();

app.use(bodyParser.json());
app.use(cookieMiddleware);
app.use(queryMiddleware);

app.get('/api/users', function (req, res) {
    User.all()
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(400).send(error));
});

app.get('/api/products', function (req, res) {
    Product
        .all()
        .then((products) => res.status(200).send(products))
        .catch((error) => res.status(400).send(error));
    }
);

app.get('/api/products/:id', function (req, res) {
    Product
        .findById(req.params.id)
        .then((product) => {
            if (!product) {
                res.status(404).send({message: 'Product not found'});
            }
            res.status(200).send(product);
        })
        .catch((error) => res.status(400).send(error));
});

app.get('/api/products/:id/reviews', function (req, res) {
    Product
        .findById(req.params.id)
        .then((product) => {
            if (!product) {
                res.status(404).send({message: 'Product not found'});
            }
            res.status(200).send(product.reviews);
        })
        .catch((error) => res.status(400).send(error));
});

app.post('/api/products', function (req, res) {
    const product = {
        id: req.body.id,
        productId: req.body.id,
        reviews: req.body.reviews
    };
    Product
        .create(product)
        .then((product) => res.status(200).send(product))
        .catch((error) => res.status(400).send(error));
});

export default app;
