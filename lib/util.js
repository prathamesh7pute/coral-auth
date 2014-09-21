
var jwt = require('jwt-simple');
var moment = require('moment');

exports = module.exports = util;

function util() {

    var createToken = function(req, user, key) {
        var payload = {
            iss: req.hostname,
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, key);
    };

    var decodeToken = function(token, key) {
        return jwt.decode(token, key);
    };

    var isTokenExpired = function(payload) {
        return payload.exp <= moment().unix();
    };

    return {
        createToken: createToken,
        decodeToken: decodeToken,
        isTokenExpired: isTokenExpired
    }

}


