// express is a framework
const express = require('express');
const app = express();
const db = require('./app/middleware/db')
const path = require('path');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();
const route = require('./app/routes/route')
const bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/',route);

// join views and directory 
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'app/views'));

app.use(express.static("app/uploads"));

// project run 
const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));