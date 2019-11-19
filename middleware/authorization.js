const { Client } = require('pg');
const connectionString = 'postgres://postgres:123456@localhost:5432/GenWorks';
const client = new Client({
    connectionString: connectionString
})
client.connect();
const authorization = {
    async checkToken(req) {
        if(req.headers.authorization) {
            const data = await this.checkTokenDatabase(req);
            if(data.length === 0) {
                return {
                    result: false
                };
            }
            return {
                result: true,
                data: data
            };
        }

        return {
            result: false
        };
    },

    async checkTokenDatabase(req) {
        const testQuery = 'select * from public."customer" where token = $1';
        const value = [req.headers.authorization];

        return new Promise((resolve , reject) => {
            client.query(testQuery , value , (err , res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            })
        })
    }
}

module.exports = {
    authorization: authorization
}