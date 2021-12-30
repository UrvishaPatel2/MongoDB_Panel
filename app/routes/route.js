const express = require('express');
const router = express();

const routes = require('./router/userRouter');
const testRoutes = require('./router/testRoutes')
const categoryRoutes = require('./router/catagoryRoutes');
const contactRoutes = require('./router/contactRoutes');
const portfolioRoutes = require('./router/portfolioRoutes');

router.use ('/',routes);
router.use('/',testRoutes);
router.use('/',categoryRoutes);
router.use('/',contactRoutes);
router.use('/',portfolioRoutes);

module.exports = router;