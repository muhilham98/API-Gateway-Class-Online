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
            const files = await api.post('/api/files', req.body);
            return res.json(files.data);
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
           const files = await api.put(`/api/files/${id}`, req.body);
           return res.json(files.data);
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

    getAllfiles: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin"){
               return res.status(403).json({
                   status: 'error',
                   message: 'forbidden or user unauthorized'
               })
           }
            //query = req.query;
            const files = await api.get('/api/files/', {
                params: {
                    ...req.query
                }
            });
            return res.json(files.data);
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

    getfile: async(req,res) => {
        try{
            const { id } = req.params;
            const file = await api.get(`/api/files/${id}`);
            return res.json(file.data);
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
           const file = await api.delete(`/api/files/${id}`);
           return res.json(file.data);
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