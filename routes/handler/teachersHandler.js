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
            const courseId = req.body.course_id;
            const userTeacherId = req.user_data.data._id;
            const { code } = req.body;
            //res.send('ok')
            const teacherCourse = await api.post('/api/teachers', {
                course_id: courseId,
                user_teacher_id: userTeacherId,
                code
            });
            return res.json(teacherCourse.data);
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
    

    getTeacherCourses: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin" && role !== "teacher"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const userTeacherId = req.user_data.data._id;
            const teacherCourse = await api.get('/api/teachers',{
                params: {
                    user_teacher_id: userTeacherId
                }
            });
            return res.json(teacherCourse.data);
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

    getAllTeachersCourses: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "admin"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const allTeachersCourses = await api.get('/api/teachers/all')
            return res.json(allTeachersCourses.data);
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
            const {id} = req.params
            const teacher = await api.delete(`/api/teachers/${id}`);
            return res.json(teacher.data);
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