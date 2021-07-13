const db = require('../config/database');

module.exports = {
	findByEmail: async (email) => {
		try {
			const result = await db.query(
				'SELECT * FROM users WHERE email=? LIMIT 0, 1',
				[email],
			);
			return result[0];
		} catch (error) {
			throw error;
		}
	},
	findById: async (id) => {
		try {
			const result = await db.query(
				'SELECT * FROM users WHERE id=? LIMIT 0, 1',
				[id],
			);
			return result[0];
		} catch (error) {
			throw error;
		}
	},
	create: async ({ username, email, password }) => {
		try {
			const result = await db.query(
				'INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)',
				[username, email, password],
			);
			return result;
		} catch (error) {
			throw error;
		}
	},
};
