export default function queryMiddleware(req, res, next) {
    req.parsedQuery = req.query;

    next();
}
