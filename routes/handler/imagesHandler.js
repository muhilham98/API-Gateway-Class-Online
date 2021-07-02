const apiAdapter = require('../apiAdapter');
const { URL_SERVICE_IMAGES } = process.env;

const api = apiAdapter(URL_SERVICE_IMAGES);

module.exports = {
    addImages: async(req,res) => {
        // const role = req.user_data.data.role
        try{
            // if(role !== "admin" && role !== "teacher"){
            //     return res.status(403).json({
            //         status: 'error',
            //         message: 'forbidden or user unauthorized'
            //     })
            // }
            //console.log(req.body);
            const images = await api.post('/images', req.body);
            return res.json(images.data);
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

    getImages: async(req,res) => {
        try{
            //console.log(req.body);
            const images = await api.get('/images',{
                params: {
                    ...req.query
                }
            });
            return res.json(images.data);
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

    deleteImages: async(req,res) => {
        //const role = req.user_data.data.role
        try{
            // if(role !== "admin" && role !== "teacher"){
            //     return res.status(403).json({
            //         status: 'error',
            //         message: 'forbidden or user unauthorized'
            //     })
            // }
            //console.log(req.body);
            const {id} = req.params;
            const images = await api.delete(`/images/${id}`);
            return res.json(images.data);
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