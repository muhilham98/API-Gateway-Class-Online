const apiAdapter = require('../apiAdapter');
const { URL_SERVICE_PAYMENT } = process.env;

const api = apiAdapter(URL_SERVICE_PAYMENT);

module.exports = {
    createPayment: async(req,res) => {
        try{
            const payment = await api.post('/payments', req.body);
            return res.json(payment.data);
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

    getAllPayments: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const payments = await api.get('/payments', {
                params: {
                    page : req.query.page
                }
            });
            return res.json(payments.data);
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