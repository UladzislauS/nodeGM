import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from '../config/config';
import cookieMiddleware from './middlewares/cookieMiddleware';
import queryMiddleware from './middlewares/queryMiddleware';
import City from './models/City';
import Product from './models/Product';
import User from './models/User';

const app = express();

mongoose.connect(config.dbUrl);

app.use(bodyParser.json());
app.use(cookieMiddleware);
app.use(queryMiddleware);

app.get('/api/users', function (req, res) {
    User.find(function(err, cities) {
        if (err) {
            res.send(err);
        }

        res.json(cities);
    });
});

app.delete('/api/users/:id', function(req, res) {
    User.remove({ _id: req.params.id }, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

app.delete('/api/cities/:id', function(req, res) {
    City.remove({ _id: req.params.id }, function(err, city) {
        if (err) {
            res.send(err);
        }
        res.json(city);
    });
});

app.post('/api/cities', function (req, res) {
    const city = new City();
    city.name = req.body.name;
    city.country = req.body.country;
    city.capital = req.body.capital;
    city.location = req.body.location;
    city.lastModifiedDate = new Date();

    city.save(function(err) {
        if (err) {
            res.send(err);
        }

        res.json(city);
    });
});

app.get('/api/cities', function(req, res) {
    City.find(function(err, cities) {
        if (err) {
            res.send(err);
        }

        res.json(cities);
    });
});

app.delete('/api/cities/:id', function(req, res) {
    City.remove({ _id: req.params.id }, function(err, city) {
        if (err) {
            res.send(err);
        }
        res.json(city);
    });
});

app.put('/api/cities/:id', function(req, res) {
    City.findById(req.params.id, function(err, city) {
        if (err) {
            res.send(err);
        }
        city.name = req.params.name;
        city.country = req.params.country;
        city.capital = req.params.capital;
        city.location = req.params.location;
        city.lastModifiedDate = new Date();

        city.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json(city);
        });
    });
});

app.get('/api/products', function (req, res) {
    Product.find(function(err, products) {
        if (err) {
            res.send(err);
        }

        res.json(products);
    });
});

app.get('/api/products/:id', function (req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            res.send(err);
        }

        product.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    });
});

app.get('/api/products/:id/reviews', function (req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            res.send(err);
        }

        product.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json(product.reviews);
        });
    });
});

app.post('/api/products', function (req, res) {
    const product = new Product();
    product.title = req.body.title;
    product.reviews = req.body.reviews;
    product.lastModifiedDate = new Date();

    product.save(function(err) {
        if (err) {
            res.send(err);
        }

        res.json(product);
    });
});

app.delete('/api/products/:id', function(req, res) {
    Product.remove({ _id: req.params.id }, function(err, product) {
        if (err) {
            res.send(err);
        }

        res.json(product);
    });
});

export default app;
