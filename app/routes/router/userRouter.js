const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user_controller');
const { auth, generateAuthToken } = require('../../middleware/auth');
const upload = require('../../services/multer');

router.get('/register', userController.register);
router.post('/api/register', upload.single('uploadImage'), userController.authregister);

router.get('/', userController.login);
router.post('/api/login',generateAuthToken, userController.authlogin);

router.get('/forgetpass', userController.forgetpass);
router.post('/api/verifyEmail', userController.verifyEmail);

router.get('/otp',userController.otp)
router.post('/verifyOtp', userController.verifyOtp);
router.post('/updatePassword',userController.updatePassword);

router.get('/resetPassword',auth, userController.resetPassword);
router.post('/newPassword', auth,userController.newPassword);


router.get('/index', auth, userController.index);
router.get('/profile', auth, userController.viewProfile);
router.get('/updateProfile', auth, userController.updateProfile);
router.post('/editProfile', auth,upload.single('uploadImage'), userController.editProfile);


router.get('/logout',auth,userController.logout);
module.exports = router;