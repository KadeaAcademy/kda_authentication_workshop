const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');
const util = require('util');

const connexion = mysql.createPool({
	host: process.env.DB_HOST || '127.0.0.1',
	port: process.env.DB_PORT || 3306,
	database: process.env.DB_NAME || 'sessions_workshop',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || 'root',
});

connexion.query = util.promisify(connexion.query);

connexion.getConnection((err) => {
	if (err) throw err;
	console.log('Database connected');
});

module.exports = connexion;
