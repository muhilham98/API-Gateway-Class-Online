const apiAdapter = require('../apiAdapter');
const { 
    URL_SERVICE_USERS,
    JWT_SECRET_ACCESS_TOKEN,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED
} = process.env;

const jwt = require('jsonwebtoken');
const api = apiAdapter(URL_SERVICE_USERS);

module.exports = {
    refreshToken : async(req,res) => {
        try{
            const { email } = req.body;
            const refreshToken = req.body.refresh_token;

            //console.log(refreshToken);
            
            if(!email || !refreshToken){
                return res.status(400).json({
                    status: 'error',
                    message: 'email or token undefined'
                });
            }

            await api.get('/refresh_tokens', { params: { refresh_token: refreshToken  }});

            //jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (error,decoded) => {
            jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (error,decoded) => {
                if(error){
                    return res.status(403).json({
                        status: 'error',
                        message: error.message
                    });
                }
                // console.log(decoded);
                
                if(email !== decoded.data.email){
                    return res.status(400).json({
                        status: 'error',
                        message: 'invalid email '
                    });
                }

                const accessToken = jwt.sign({data: decoded.data}, JWT_SECRET_ACCESS_TOKEN, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
                //console.log(accessToken);
                return res.json({
                    status: 'success',
                    message: 'get access token successfully',
                    data: {
                        access_token: accessToken
                    }
                })
            });

        }catch (err){
            if(err.code ==="ECONNREFUSED"){
                return res.status(500).json({
                    status: 'error',
                    message: 'Service Not Found (unavailable)'
                })
            }
            const {status, data} = err.response;
            return res.status(status).json(data);
        }
    }

}