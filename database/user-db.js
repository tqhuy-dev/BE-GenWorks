const { Client } = require('pg');
const connectionString = 'postgres://postgres:123456@localhost:5432/GenWorks';
const client = new Client({
    connectionString: connectionString
})
const Constant = require('../shared/constant/constant');

client.connect();
module.exports = {
    createAccount: (req) => {
        const query = 'INSERT INTO public."customer"(' + 
            'email, password, created_date, updated_date, first_name, last_name,' +
            'age, birthdate, address, career_id, status)' +
            'VALUES ($1,$2,$3,$4,$5,$6,' + 
                    '$7,$8,$9,$10,$11);';
        const value = [
            req.body.email,
            req.body.password,
            new Date().getTime(),
            new Date().getTime(),
            req.body.first_name,
            req.body.last_name, 
            req.body.age,
            req.body.birthdate,
            JSON.stringify(req.body.address),
            null,
            Constant.STATUS.AVAILABLE];

        return new Promise((resolve , reject) => {
            client.query(query , value , (err , res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    },

    getCustomer: (filter) => {
        const testQuery = 'select ' +
        'email,' +
        'first_name,' +
        'last_name,' +
        'age,' +
        'address,' +
        'birthdate ' +
        'from public."customer" where email = $1';
        let value = [filter.params.email];
        return new Promise((resolve , reject) => {
            client.query(testQuery , value, (err , res) => {
                if(err) {
                    reject(err)
                } else {
                    let dataCustomer = res.rows[0];
                    dataCustomer.address = JSON.parse(dataCustomer.address);
                    resolve(dataCustomer)
                }
            })
        })
    },

    login: (req) => {
        const testQuery = 'select ' +
        'email,' +
        'first_name,' +
        'last_name,' +
        'age,' +
        'address,' +
        'birthdate ' + 'from public."customer" where email = $1 and password = $2';
        const value = [req.body.email , req.body.password];
        return new Promise((resolve , reject) => {
            client.query(testQuery , value , (err , res) => {
                if(err) {
                    reject(err);
                } else {
                    let dataCustomer = res.rows[0];
                    dataCustomer.address = JSON.parse(dataCustomer.address);
                    resolve(dataCustomer)
                }
            })
        })
    }
}