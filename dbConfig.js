const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bc-painter-hub-db",
    password: "postgres",
    port: 5432
    });

module.exports = pool;
