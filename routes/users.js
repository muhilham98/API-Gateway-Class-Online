const express = require('express');
const router = express.Router();
//const { APP_NAME } = process.env;
//const { upload, uploadMultiple } = require('../middlewares/multer');
//const imagesHandler = require('./handler/images');
const usersHandler = require('./handler/usersHandler');
const tokenVerification = require('../middlewares/tokenVerification');



/* GET users listing. */
// router.post('/', imagesHandler.addImage);
router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.post('/update', tokenVerification, usersHandler.update);
router.get('/', tokenVerification, usersHandler.getUser);
router.post('/logout', tokenVerification, usersHandler.logout);


module.exports = router;
