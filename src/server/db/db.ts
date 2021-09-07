import mysql from 'mysql';
import dotenv from "dotenv";

dotenv.config();

// Unless you're running on more than one machine, you probably won't have to change this.
const POOL_CONNECTION_LIMIT = 1;

const connectionPool = mysql.createPool({
    connectionLimit: POOL_CONNECTION_LIMIT,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "feelfit",
    timezone: '+01:00',
    dateStrings: [
        'DATE',
        'DATETIME',
        'TIMESTAMP'
    ]
});

connectionPool.on('connection', (connection) => {
    connection.query("SET time_zone='+01:00';", (error: Error) => {
        if (error) throw error;
    })
})

export { connectionPool };
