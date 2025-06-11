import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'db',                      
    user: 'root',                   
    password: 'Tigas@133556',              
    database: 'projeto_node',       
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;