const { Client } = require('pg');
const connectionString = 'postgres://postgres:123456@localhost:5432/GenWorks';
const client = new Client({
    connectionString: connectionString
})
const Constant = require('../shared/constant/constant');

client.connect();
const userDB = module.exports = {
    createAccount: (req) => {
        const query = 'INSERT INTO public."customer"(' +
            'email, password, created_date, updated_date, first_name, last_name,' +
            'age, birthdate, address, status)' +
            'VALUES ($1,$2,$3,$4,$5,$6,' +
            '$7,$8,$9,$10);';
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

        return new Promise((resolve, reject) => {
            client.query(query, value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    },

    getCustomer: (email) => {
        const testQuery = 'select ' +
            'email,' +
            'first_name,' +
            'last_name,' +
            'age,' +
            'session,' +
            'address,' +
            'birthdate, ' +
            'phone, ' +
            'jobs ' +
            'from public."customer" where email = $1';
        let value = [email];
        return new Promise((resolve, reject) => {
            client.query(testQuery, value, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    if (res.rows.length === 0) {
                        resolve(null);
                    } else {
                        let dataCustomer = res.rows[0];
                        dataCustomer.address = JSON.parse(dataCustomer.address);
                        resolve(dataCustomer)
                    }
                }
            })
        })
    },

    getCustomerBySession: (session) => {
        const testQuery = 'select ' +
            'email,' +
            'first_name,' +
            'last_name,' +
            'age,' +
            'session,' +
            'token,' +
            'phone,' +
            'address,' +
            'birthdate, ' +
            'jobs ' +
            'from public."customer" where session = $1';
        let value = [session];
        return new Promise((resolve, reject) => {
            client.query(testQuery, value, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    if (res.rows.length === 0) {
                        resolve(null);
                    } else {
                        let dataCustomer = res.rows[0];
                        dataCustomer.address = JSON.parse(dataCustomer.address);
                        resolve(dataCustomer)
                    }
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
            'jobs,' +
            'birthdate ' + 'from public."customer" where email = $1 and password = $2';
        const value = [req.body.email, req.body.password];
        return new Promise((resolve, reject) => {
            client.query(testQuery, value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (res.rows.length === 0) {
                        resolve(null)
                    } else {
                        let dataCustomer = res.rows[0];
                        dataCustomer.address = JSON.parse(dataCustomer.address);
                        resolve(dataCustomer)
                    }
                }
            })
        })
    },

    updateTokenCustomer: (token, email) => {
        const testQuery = 'update public."customer" set token = $1 where email = $2';
        const value = [token, email];
        return new Promise((resolve, reject) => {
            client.query(testQuery, value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true)
                }
            })
        })
    },

    updateSessionCustomer: (session, email) => {
        const testQuery = 'update public."customer" set session = $1 where email = $2';
        const value = [session, email];
        return new Promise((resolve, reject) => {
            client.query(testQuery, value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true)
                }
            })
        })
    },

    updateInformation: (req, email) => {
        let valueUpdate = '';
        let conditionUpdate = ' where email = $1';
        let testQuery = 'update public."customer" set ';
        let dataUpdate = [email];
        if (req.body.age) {
            dataUpdate.push(req.body.age);
            valueUpdate += 'age = ' + '$' + dataUpdate.length + ',';
        }

        if (req.body.address) {
            dataUpdate.push(req.body.address);
            valueUpdate += 'address = ' + '$' + dataUpdate.length + ',';
        }

        if (req.body.birthdate) {
            dataUpdate.push(req.body.birthdate);
            valueUpdate += 'birthdate = ' + '$' + dataUpdate.length + ',';
        }

        if (req.body.phone) {
            dataUpdate.push(req.body.phone);
            valueUpdate += 'phone = ' + '$' + dataUpdate.length + ',';
        }

        testQuery += valueUpdate.slice(0, valueUpdate.length - 1) + conditionUpdate;
        return new Promise((resolve, reject) => {
            client.query(testQuery, dataUpdate, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    updateAllJobsCustomer: (req, email) => {

    },

    addJobDetail: (req , email) => {
        let valuesString = '';
        const dataValues = [...req.body.jobs];
        let dataInsert = [];
        const totalJobField = 5;
        dataValues.forEach((element , index) => {
            valuesString += '(' + 
            '$' + ((index+1) * totalJobField - 4) + ',' +
            '$' + ((index+1) * totalJobField - 3) + ',' + 
            '$' + ((index+1) * totalJobField - 2) + ',' +
            '$' + ((index+1) * totalJobField - 1) + ',' +
            '$' + ((index+1) * totalJobField - 0) + '' +
            '),'

            dataInsert = dataInsert.concat([
                email,
                element.jobs_id,
                element.level,
                element.experience,
                element.description,
            ])
        })

        valuesString = valuesString.slice(0 , valuesString.length - 1);
        const testQuery = 'insert into public."job_customer_detail" (email, jobs_id, level, experience, description) VALUES' +
        valuesString;

        return new Promise((resolve, reject) => {
            client.query(testQuery, dataInsert, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    },

    editJobDetail: (data, id) => {
        let testQuery = 'update public."job_customer_detail" set ';
        let dataUpdate = [id];
        if (data.jobs_id) {
            dataUpdate.push(data.jobs_id);
            testQuery += 'jobs_id = $' + dataUpdate.length + ',';
        }

        if (data.level) {
            dataUpdate.push(data.level);
            testQuery += 'level = $' + dataUpdate.length + ',';
        }

        if (data.experience) {
            dataUpdate.push(data.experience);
            testQuery += 'experience = $' + dataUpdate.length + ',';
        }

        if (data.description) {
            dataUpdate.push(data.description);
            testQuery += 'description = $' + dataUpdate.length + ',';
        }
        testQuery = testQuery.slice(0, testQuery.length - 1);
        testQuery += ' where id_job_detail = $1';
        return new Promise((resolve, reject) => {
            client.query(testQuery, dataUpdate, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    }
}