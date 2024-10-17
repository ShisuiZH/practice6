// middlewares/authMiddleware.js
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.status(403).send('Forbidden');
}

module.exports = isAuthenticated;