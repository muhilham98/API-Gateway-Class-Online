const apiAdapter = require('../apiAdapter');
const { URL_SERVICE_CLASS, HOSTNAME } = process.env;

const api = apiAdapter(URL_SERVICE_CLASS);

module.exports = {
    create: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const course = await api.post('/api/courses', req.body);
            return res.json(course.data);
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
            if(role !== "admin"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const { id } = req.params;
            const course = await api.put(`/api/courses/${id}`, req.body); 
            return res.json(course.data);
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

    getAllCourses: async(req,res) => {
        try{
            const courses = await api.get('/api/courses',{
                params: {
                    ...req.query
                }
            });
            courses.data.data.path = `${HOSTNAME}/courses`;
            const firstPage = courses.data.data.first_page_url.split('?').pop();
            const lastPage = courses.data.data.last_page_url.split('?').pop();

            courses.data.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`;
            courses.data.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`;

            if(courses.data.data.next_page_url) {
                const nextPage = courses.data.data.next_page_url.split('?').pop();
                courses.data.data.next_page_url = `${HOSTNAME}/courses?${nextPage}`;
            }

            if(courses.data.data.prev_page_url) {
                const prevPage = courses.data.data.prev_page_url.split('?').pop();
                courses.data.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`;
            }

            return res.json(courses.data);
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

    getCourse: async(req,res) => {
        try{
            const {id} = req.params;
            const course = await api.get(`/api/courses/${id}`);
            return res.json(course.data);
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
            if(role !== "admin"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const { id } = req.params;
            const course = await api.delete(`/api/courses/${id}`);
            //console.log(course);
            return res.json(course.data);
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

    getAllCoursesCode: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const courses = await api.get('/api/courses_code',{
                params: {
                    ...req.query
                }
            });
            return res.json(courses.data);
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

    updateCoursesCode: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const { id } = req.params;
            const courses = await api.put(`/api/courses_code/${id}`);
            return res.json(courses.data);
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