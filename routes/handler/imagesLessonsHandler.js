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
            const imageLesson = await api.post('/api/images-lessons', req.body);
            return res.json(imageLesson.data);
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
            const { id } = req.params;
            const imageLesson = await api.put(`/api/images-lessons/${id}`, req.body); 
            return res.json(imageLesson.data);
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
            const { id } = req.params;
            const imageLesson = await api.delete(`/api/images-lessons/${id}`);
            //console.log(course);
            return res.json(imageLesson.data);
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