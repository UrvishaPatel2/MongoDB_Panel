const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category_controller');
const { auth } = require('../../middleware/auth');


router.get('/category',auth,categoryController.category);
router.get('/addCategory',auth,categoryController.addCategory);
router.get('/editCategory/:id',auth,categoryController.editCategory);


router.post('/api/category',auth,categoryController.addData);
router.post('/api/category/update/:id',auth,categoryController.editData);
router.get('/api/category/delete/:id',auth,categoryController.deleteData);
router.get('/api/category/delete',auth,categoryController.deleteAll);






module.exports = router;