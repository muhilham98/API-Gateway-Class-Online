const apiAdapter = require('../apiAdapter');
const { URL_SERVICE_CLASS } = process.env;

const api = apiAdapter(URL_SERVICE_CLASS);

module.exports = {
    create: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "student"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const courseId = req.body.course_id;
            const userId = req.user_data.data._id;
            const noteReview = req.body.note_review;
            const review = await api.post('/api/reviews', {
                course_id: courseId,
                user_id: userId,
                note_review: noteReview
            });
            return res.json(review.data);
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
            if(role !== "student"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const id = req.params.id;
            const noteReview = req.body.note_review;
            const review = await api.put(`/api/reviews/${id}`, {
                note_review: noteReview
            });
            return res.json(review.data);
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

    getReviews: async(req,res) => {
        try{
            const reviews = await api.get('/api/reviews', {
                params: {
                    ...req.query
                }
            });
            return res.json(reviews.data);
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
            if(role !== "student"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const id = req.params.id;
            const review = await api.delete(`/api/reviews/${id}`);
            return res.json(review.data);
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