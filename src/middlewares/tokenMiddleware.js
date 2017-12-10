import jwt from 'jsonwebtoken';

export default function tokenMiddleware(req, res, next) {
    if (req.url.indexOf('/api/') === -1
        || req.url === '/api/auth'
        || req.url === '/api/auth/passport') {
        next();
        return;
    }

    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if ( token ) {
        jwt.verify(token, 'tsssss', (err, res) => {
            if (err) {
                res.send(403).end();
            } else {
                next();
            }
        });
    } else {
        res.send(403).end();
    }
}
