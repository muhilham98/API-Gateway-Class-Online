const express = require('express');
const router = express.Router();
//const { APP_NAME } = process.env;
//const { upload, uploadMultiple } = require('../middlewares/multer');
//const imagesHandler = require('./handler/images');
const imagesHandler = require('./handler/imagesHandler');
const  tokenVerification = require('../middlewares/tokenVerification');



/* GET users listing. */
// router.post('/', imagesHandler.addImage);
router.post('/', tokenVerification, imagesHandler.addImages);
router.get('/', tokenVerification, imagesHandler.getImages);
router.delete('/:id', tokenVerification, imagesHandler.deleteImages);


module.exports = router;
