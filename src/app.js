import express from 'express';
import bodyParser from 'body-parser';
import cookieMiddleware from './middlewares/cookieMiddleware';
import queryMiddleware from './middlewares/queryMiddleware';
import mockProducts from './mockProducts';
import mockUsers from './mockUsers';

const app = express();

app.use(bodyParser.json());
app.use(cookieMiddleware);
app.use(queryMiddleware);

app.get('/api/users', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(mockUsers, null, 4));
});

app.get('/api/products', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(mockProducts, null, 4));
});

app.get('/api/products/:id', function (req, res) {
    const product = mockProducts.find((prod) => {
        return prod.id === +req.params.id;
    });
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(product, null, 4));
});

app.get('/api/products/:id/reviews', function (req, res) {
    const product = mockProducts.find((prod) => {
        return prod.id === +req.params.id;
    });
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(product.reviews.toString());
});

app.post('/api/products', function (req, res) {
    const product = {
        id: req.body.id,
        reviews: req.body.reviews
    };
    mockProducts.push(product);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(product, null, 4));
});

export default app;
