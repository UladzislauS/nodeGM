import express from 'express';
import path from 'path';
import mockProducts from '../mockProducts';

const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join( __dirname, '../tpls/main.html'));
});

router.get('/login', function (req, res) {
    console.log('login');
    res.sendFile(path.join( __dirname, '../tpls/login.html'));
});

router.get('/error', function (req, res) {
    res.sendFile(path.join( __dirname, '../tpls/error.html'));
});

export default router;
