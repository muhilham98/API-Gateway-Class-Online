const apiAdapter = require('../apiAdapter');
const { URL_SERVICE_FILES } = process.env;

const api = apiAdapter(URL_SERVICE_FILES);

module.exports = {
    addFile: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin" && role !== "teacher"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            //console.log(req.body);
            const files = await api.post('/files', req.body);
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

    getFiles: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin" && role !== "teacher"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const files = await api.get('/files',{
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

    deleteFile: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin" && role !== "teacher"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            //console.log(req.body);
            const { id } = req.params;
            const file = await api.delete(`/files/${id}`);
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