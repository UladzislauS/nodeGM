import passport from 'passport';
import Strategy from 'passport-local';
import jwt from 'jsonwebtoken';
import mockUsers from '../mockUsers';

export default function init() {
    passport.serializeUser(function(data, done) {
        done(null, data.login);
    });

    passport.deserializeUser(function(login, done) {
        const user = mockUsers.find((user) => user.login === login);
        done(null, user);
    });

    passport.use(new Strategy({
            usernameField : 'login',
            passwordField : 'password',
            passReqToCallback : true
        }, function(req, username, password, done) {
            const user = mockUsers.find((user) => user.login === username);

            if (user && user.password === password) {
                const userData = {
                    email: user.email,
                    login: user.login
                };

                return done(null, userData);
            } else {
                return done(null, false, { message: 'Incorrect username.' });
            }
        }
    ));
}
