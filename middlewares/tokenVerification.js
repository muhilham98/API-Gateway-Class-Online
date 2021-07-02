const jwt = require('jsonwebtoken');
const { JWT_SECRET_ACCESS_TOKEN } = process.env;

module.exports = async (req,res, next) => {
    const accessToken = req.headers.authorization;
    jwt.verify(accessToken, JWT_SECRET_ACCESS_TOKEN, (error,decoded) => {
        //console.log(decoded);
        if(error) {
            return res.status(401).json({
                message: error.message
            });
        }
        req.user_data = decoded;
        return next();
    });
}