const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } =  require('../../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'app/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
  const upload = multer({ storage: storage });


const testController = require('../../controllers/test_controller');

router.get('/testimonial',auth, testController.testimonial);
router.get('/addTest',auth,testController.addTest);
router.get('/editTest/:id',auth,testController.editTest);


router.post('/api/testimonial',auth,upload.single('uploadImage'),testController.addData);
router.post('/api/testimonial/update/:id',auth,upload.single('uploadImage'),testController.editData);
router.get('/api/testimonial/delete/:id',auth,testController.deleteData);
router.get('/api/testimonial/delete',auth,testController.deleteAll);

module.exports = router;