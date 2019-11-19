const { Client } = require('pg');
const connectionString = 'postgres://postgres:123456@localhost:5432/GenWorks';
const client = new Client({
    connectionString: connectionString
})
const Constant = require('../shared/constant/constant');

client.connect();

module.exports = {
    getAllJobs: (req) => {
        const query = 'select * from public."jobs"';
        value = [];

       return new Promise((resolve , reject) => {
           client.query(query , value , (err , res) => {
               if(err) {
                   reject(err);
               } else {
                   resolve(res.rows);
               }
           })
       })
    }
}