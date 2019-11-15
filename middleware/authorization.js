const { Client } = require('pg');
const connectionString = 'postgres://postgres:123456@localhost:5432/GenWorks';
const client = new Client({
    connectionString: connectionString
})
client.connect();
const authorization = {
    async checkToken(req) {
        
    }
}