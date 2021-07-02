require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

//service-class
const teachersRouter = require('./routes/teachers');
const coursesRouter = require('./routes/courses');
const coursesCodeRouter = require('./routes/coursesCode');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const imagesLessonsRouter = require('./routes/imagesLessons');
const filesChaptersRouter = require('./routes/filesChapters');
const imagesCoursesRouter = require('./routes/imagesCourses');
const studentsCoursesRouter = require('./routes/studentsCourses');
const reviewsRouter = require('./routes/reviews');

//service-images
const imagesRouter= require('./routes/images');

//service-order
const ordersRouter = require('./routes/orders');

//service-payment
const paymentsRouter = require('./routes/payments');

//service-users
const usersRouter = require('./routes/users');
const refreshTokenRouter = require('./routes/refreshToken');

//service-files
const serviceFilesRouter= require('./routes/files');


const app = express();
const tokenVerification = require('./middlewares/tokenVerification');
//verifyToken

app.use(logger('dev'));
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teachers', tokenVerification, teachersRouter);
app.use('/courses', coursesRouter);
app.use('/courses_code', tokenVerification, coursesCodeRouter);
app.use('/chapters', tokenVerification, chaptersRouter);
app.use('/lessons', tokenVerification, lessonsRouter);
app.use('/files',  tokenVerification, filesChaptersRouter);
app.use('/images-courses', tokenVerification, imagesCoursesRouter);
app.use('/images-lessons', tokenVerification, imagesLessonsRouter);
app.use('/images', imagesRouter);
app.use('/students-courses', tokenVerification, studentsCoursesRouter);
app.use('/reviews', reviewsRouter);
app.use('/orders', tokenVerification, ordersRouter);
app.use('/payments', paymentsRouter);
app.use('/refresh_tokens', refreshTokenRouter);
app.use('/service_files', tokenVerification, serviceFilesRouter);

module.exports = app;
