const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../../middleware/auth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({ storage: storage });

const portController = require('../../controllers/portfolio_controller');

router.get('/portfolio', auth, portController.portfolio);
router.get('/addPortfolio', auth, portController.addPortfolio);
router.get('/editPortfolio/:id', auth, portController.editPortfolio);

router.post('/api/portfolio', auth, upload.array('uploadImage', 10), portController.addData);
router.post('/api/portfolio/update/:id', auth, upload.array('uploadImage', 10), portController.editData);
router.get('/api/portfolio/delete/:id', auth, portController.deleteData);
// router.get('/api/portfolio/delete', auth, portController.deleteAll);



module.exports = router;