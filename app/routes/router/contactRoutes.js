const express = require('express');
const router = express();
const contactController = require('../../controllers/contact_controller');
const { auth } = require('../../middleware/auth');


router.get('/contact',auth,contactController.contact);
router.get('/addContact',auth,contactController.addContact);
router.get('/editContact/:id',auth,contactController.editContact);

router.post('/api/contact',auth,contactController.addData);
router.post('/api/contact/update/:id',auth,contactController.editData);
router.get('/api/contact/delete/:id',auth,contactController.deleteData);
router.get('/api/contact/delete',auth,contactController.deleteAll);


module.exports = router;