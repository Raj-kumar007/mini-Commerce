const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase')
dotenv.config({path: path.join(__dirname, 'config','config.env')});

connectDatabase();

const products = require('./routes/production')
const orders = require('./routes/order')


app.use(express.json())
app.use(cors())
app.use('/api/v1/',products)
app.use('/api/v1',orders)
app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})