import express from 'express';
import mockProducts from '../mockProducts';

const router = express.Router();

router.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(mockProducts, null, 4));
});

router.get('/:id', function (req, res) {
    const product = mockProducts.find((prod) => {
        return prod.id === +req.params.id;
    });
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(product, null, 4));
});

router.get('/:id/reviews', function (req, res) {
    const product = mockProducts.find((prod) => {
        return prod.id === +req.params.id;
    });
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(product.reviews.toString());
});

router.post('/', function (req, res) {
    const product = {
        id: req.body.id,
        reviews: req.body.reviews
    };
    mockProducts.push(product);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(product, null, 4));
});

export default router;
