const express = require('express');
const router = express.Router();
//const { APP_NAME } = process.env;
//const { upload, uploadMultiple } = require('../middlewares/multer');
//const imagesHandler = require('./handler/images');
const { upload } = require('../middlewares/multer');
const filesHandler = require('./handler/filesHandler');
//const verifyToken = require('../middlewares/verifyToken');



/* GET users listing. */
// router.post('/', imagesHandler.addImage);
router.post('/', filesHandler.addFile);
router.get('/', filesHandler.getFiles);
router.delete('/:id', filesHandler.deleteFile);



module.exports = router;
