import passport from 'passport';
import Strategy from 'passport-local';
import jwt from 'jsonwebtoken';
import mockUsers from '../mockUsers';

export default function init() {
    console.log('config local');
    passport.serializeUser(function(data, done) {
        console.log('ser', data.user.login);
        done(null, JSON.stringify(data.user.login));
    });

    passport.deserializeUser(function(login, done) {
        console.log('dser', login);
        const user = mockUsers.find((user) => user.login === login);
        done(null, user);
    });

    passport.use(new Strategy({
            usernameField : 'login',
            passwordField : 'password'
        }, function(username, password, done) {
            console.log(username, password);
            const user = mockUsers.find((user) => user.login === username);

            if (user && user.password === password) {
                const userData = {
                    email: user.email,
                    login: user.login
                };
                const token = jwt.sign(user, 'tsssss');

                return done(null, { user: userData, token });
            } else {
                return done(null, false, { message: 'Incorrect username.' });
            }
        }
    ));
}
