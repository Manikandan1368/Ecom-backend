const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).send({
            error: "Access denied"
        });
    }

    const token = authHeader.split(' ')[1]; 
    try {
        const decode = jwt.verify(token, "secrete");
        req.user = decode;
        next();
    } catch (err) {
        return res.status(401).send({
            error: "Invalid token"
        });
    }
}


function isAdmin(req, res, next) {
  if (req.user) {
    next(); 
  } else {
    return res.status(401).send({ error: 'Unauthorized' });
  }
}

module.exports = { verifyToken, isAdmin }; 