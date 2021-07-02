const apiAdapter = require('../apiAdapter');
const { 
    URL_SERVICE_USERS,
    JWT_SECRET_ACCESS_TOKEN,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED  
} = process.env;

const jwt = require('jsonwebtoken');

const api = apiAdapter(URL_SERVICE_USERS);

module.exports = {
    register: async(req,res) => {
        try{
            const { role } = req.body;
            if(role !== "student" && role !== "teacher" && role !== "admin"){
                return res.status(400).json({
                    status: 'error',
                    message: 'bad input'
                })
            }
            const user = await api.post('/users/register', req.body);
            return res.json(user.data);
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
    },

    login: async(req,res) => {
        try{
            const user = await api.post('/users/login', req.body);
            const dataUser = user.data.data;
            //console.log(dataUser);

            const accessToken = jwt.sign({data: dataUser}, JWT_SECRET_ACCESS_TOKEN, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
            const refreshToken = jwt.sign({data: dataUser}, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});

            await api.post('/refresh_tokens/create', {refresh_token: refreshToken, user_id: dataUser._id});
            return res.json({
                status: 'success',
                message: 'login successfully',
                data: {
                    email: dataUser.email,
                    role: dataUser.role,
                    access_token: accessToken,
                    refresh_token: refreshToken
                }
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
    },

    update: async(req,res) => {
        try{
            const id = req.user_data.data._id;
            // return res.json(req.user_data);
            const user = await api.put(`/users/${id}`, req.body);
            return res.json(user.data);
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
    },

    getUser: async(req,res) => {
        try{
            const id = req.user_data.data._id;
            //console.log(req.user_data);
            const user = await api.get(`/users/${id}`);
            return res.json(user.data);
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
    },

    logout: async(req,res) => {
        try{
            const email = req.user_data.data.email;
            const refreshToken = req.body.refresh_token;
            // return res.json(req.user_data);

            //const user = await api.post('/users/logout', { refresh_token: refreshToken});
            //return res.json(user.data);
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

                //return res.json(teacherCourse.data);
            });
            const user = await api.post('/users/logout', { refresh_token: refreshToken});
            //console.log(user);
            return res.json(user.data);
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