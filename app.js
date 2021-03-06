const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const { Pool } = require('pg');

const UserController = require('./controller/user-controller');
const JobsController = require('./controller/jobs-controller');

// const { Client } = require('pg');
// const connectionString = 'postgres://postgres:123456@localhost:5432/GenWorks';
// const client = new Client({
//     connectionString: connectionString
// })

// client.connect();

app.use(morgan('dev'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

app.get('/api/v1/' , (req , res , next) =>{
    res.status(200).json({
        message:'api is working',
        status:'success'
    })
});

app.use('/api/v1/users' , UserController);
app.use('/api/v1/jobs' , JobsController);

app.use((req , res , next) => {
    next({
        status:404,
        message:'request not found'
    })
})

app.use((error , req , res , next) =>{
    res.status(error.status || 404);
    res.json({
        message : error.message
    })
})

module.exports = app;