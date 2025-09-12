const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password:"asgard",
    host:"localhost",
    port:"5432",
    database:"DnD"
});

module.exports = pool;