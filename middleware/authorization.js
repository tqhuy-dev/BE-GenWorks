const { Client } = require('pg');
const connectionString = 'postgres://postgres:123456@localhost:5432/GenWorks';
const client = new Client({
    connectionString: connectionString
})
client.connect();
const authorization = {
    async checkToken(req) {
        if(req.headers.authorization) {
            const dataCheck = await this.checkTokenDatabase(req);
            if(dataCheck === '0') {
                return false;
            }
            return true;
        }

        return false;
    },

    async checkTokenDatabase(req) {
        const testQuery = 'select count(*) from public."customer" where token = $1';
        const value = [req.headers.authorization];

        return new Promise((resolve , reject) => {
            client.query(testQuery , value , (err , res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res.rows[0].count);
                }
            })
        })
    }
}

module.exports = {
    authorization: authorization
}