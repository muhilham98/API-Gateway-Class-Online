const apiAdapter = require('../apiAdapter');
const { URL_SERVICE_CLASS } = process.env;

const api = apiAdapter(URL_SERVICE_CLASS);

module.exports = {
    create: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin" && role !== "teacher"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const userId = req.user_data.data._id;
            const lessons = await api.post('/api/lessons', req.body,{
                params: {
                    user_id : userId
                }
            });
            return res.json(lessons.data);
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
        const role = req.user_data.data.role
        try{
            if(role !== "admin" && role !== "teacher"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const { id } = req.params
            const userId = req.user_data.data._id; 
            const lesson = await api.put(`/api/lessons/${id}`, req.body,{
                params: {
                    user_id : userId
                }
            });
           return res.json(lesson.data);
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

    getAlllessons: async(req,res) => {
        const role = req.user_data.data.role
        try{
            //query = req.query;
            if(role !== "admin"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const lessons = await api.get('/api/lessons/', {
                params: {
                    ...req.query
                }
            });
            return res.json(lessons.data);
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

    getlesson: async(req,res) => {
        try{
            const {id} = req.params;
            const userId = req.user_data.data._id;
            const lesson = await api.get(`/api/lessons/${id}`,{
                params: {
                    user_id : userId
                }
            });
            return res.json(lesson.data);
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

    delete: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin" && role !== "teacher"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
           const { id } = req.params 
           const lesson = await api.delete(`/api/lessons/${id}`);
           return res.json(lesson.data);
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