import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/', passport.authenticate('local', { failureFlash: true }));

export default router;
