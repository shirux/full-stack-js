const User = require('../models').User;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

/**
 * Authenticate User middleware, taken from course examples at treehouse
 */
const authenticateUser = async (req, res, next) => {
    let message = null;
    const credentials = auth(req);
    if (credentials) {
        let user = await User.findAll({where: {emailAddress: credentials.name}});
        // console.log(user);
        if (user.length > 0) {
            user = user[0].dataValues;
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`Authentication successful for email address: ${user.emailAddress}`);
                req.currentUser = user;
            } else {
                message = `Authentication failure for email address: ${user.emailAddress}`;
            }
        } else {
            message = `User not found for email address: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }
    if (message) {
        console.warn(message);
        res.status(401).json({ errors: [message] });
    } else {
        next();
    }
};

module.exports = authenticateUser