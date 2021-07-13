const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
	passport.use(
		new localStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			async (email, password, done) => {
				try {
					const user = await User.findByEmail(email);
					if (user) {
						if (bcrypt.compareSync(password, user.password)) {
							return done(null, user);
						} else {
							return done(null, false);
						}
					} else {
						return done(null);
					}
				} catch (error) {
					throw err;
				}
			},
		),
	);

	passport.serializeUser((user, cb) => {
		cb(null, user.id);
	});

	passport.deserializeUser(async (id, cb) => {
		try {
			const user = await User.findById(id);
			const userInformation = {
				email: user.email,
			};
			cb(null, userInformation);
		} catch (error) {
			throw error;
		}
	});
};
