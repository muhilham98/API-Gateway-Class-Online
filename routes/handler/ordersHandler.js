const apiAdapter = require('../apiAdapter');
const { URL_SERVICE_PAYMENT } = process.env;

const api = apiAdapter(URL_SERVICE_PAYMENT);

module.exports = {
    getOrders: async(req,res) => {
        try{
            const id = req.user_data.data._id;
            const orders = await api.get(`/orders/${id}`);
            return res.json(orders.data);
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

    getAllOrders: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const orders = await api.get('/orders',{
                params: {
                    page : req.query.page
                }
            });
            return res.json(orders.data);
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