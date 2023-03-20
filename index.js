
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

// CORS
app.use(cors());

app.use(express.static('public'));

app.use(express.json());

// listen to request
app.use('/api/auth',require('./routes/auth'));
app.use('/api/board',require('./routes/board'));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port: ${process.env.PORT}`)
});
