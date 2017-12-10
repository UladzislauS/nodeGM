import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import mockUsers from '../mockUsers';

const router = express.Router();

router.post('/', (req, res) => {
    const user = mockUsers.find((user) => user.login === req.body.login);

    if (user && user.password === req.body.password) {
        const userData = {
            email: user.email,
            login: user.login
        };
        const token = jwt.sign(user, 'tsssss');

        res.json({ user: userData, token });
    } else {
        res.code(404).end('Incorrect username.');
    }
});

router.post('/passport', passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/app/error'
}));

export default router;
