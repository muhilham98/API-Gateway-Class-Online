const apiAdapter = require('../apiAdapter');
const { URL_SERVICE_CLASS, HOSTNAME } = process.env;

const api = apiAdapter(URL_SERVICE_CLASS);

module.exports = {
    create: async(req,res) => {
        const role = req.user_data.data.role
        //console.log(role);
        try{
            if(role !== "student"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const courseId = req.body.course_id;
            const userId = req.user_data.data._id;
            const studentCourse = await api.post('/api/students-courses', {
                course_id: courseId,
                user_id: userId
            });
            return res.json(studentCourse.data);
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


    getStudentCourses: async(req,res) => {
        const role = req.user_data.data.role
        try{
            if(role !== "student"){
                return res.status(403).json({
                    status: 'error',
                    message: 'forbidden or user unauthorized'
                })
            }
            const userId = req.user_data.data._id;
            const studentCourse = await api.get('/api/students-courses',{
                params: {
                    user_id: userId
                }
            });
            return res.json(studentCourse.data);
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