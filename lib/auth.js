/*
 * Token based authentication functionality which can be used in clientside apps (e.g. angular, backbone)
 */

var EmailLogin = require('./emailLogin');
var util = require('./util');

//export Auth
exports = module.exports = Auth;

function Auth(config) {

    var key = config.TOKEN_KEY;

    var ensureAuthenticated = function(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
        }

        var token = req.headers.authorization.split(' ')[1];
        var payload = util.decodeToken(token, key);

        if (util.isTokenExpired(payload)) {
            return res.status(401).send({ message: 'Token has expired' });
        }

        req.user = payload.sub;
        next();
    };

    var emailLogin = new EmailLogin(config);

    return {
        ensureAuthenticated: ensureAuthenticated,
        forgotPassword: {},
        getUser: {},
        updateUser: {},
        signup: emailLogin.signup,
        emailLogin: emailLogin.login
    };
}
