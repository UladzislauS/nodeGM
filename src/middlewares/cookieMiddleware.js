export default function cookieMiddleware(req, res, next) {
    const cookie = req.headers.cookie ? req.headers.cookie.split('; ') : [];
    req.parsedCookies = cookie.reduce((result, current) => {
        const [key, value] = current.split('=');
        result[key] = value;

        return result;
    }, {});

    next();
}
