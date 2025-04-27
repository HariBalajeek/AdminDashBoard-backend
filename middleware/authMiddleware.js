const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    try{
        const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    next()
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(401).json({ message: 'not Authorized to enter this page' });
    }
    
}

module.exports = authMiddleware