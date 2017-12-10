import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session';
import morgan from 'morgan';
import initPassport from './config/passport';
import appRouter from './routers/app';
import authRouter from './routers/auth';
import productsRouter from './routers/products';
import tokenMiddleware from './middlewares/tokenMiddleware';
import cookieMiddleware from './middlewares/cookieMiddleware';
import queryMiddleware from './middlewares/queryMiddleware';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(tokenMiddleware);
app.use(cookieMiddleware);
app.use(queryMiddleware);
app.use(session({ secret: 'tssssssssssssssssssss' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initPassport();
app.use('/app', appRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);

export default app;
