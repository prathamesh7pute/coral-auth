
var User = require('./user');
var util = require('./util');

//export EmailLogin
exports = module.exports = EmailLogin;

function EmailLogin(config) {

    var signup = function(req, res) {
        var user = new User();
        user.displayName = req.body.displayName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.save(function(err) {
            res.send({ token: util.createToken(req, user, config.TOKEN_KEY) });
        });
    };

    var login = function(req, res) {
        User.findOne({ email: req.body.email }, '+password', function(err, user) {
            if (!user) {
                return res.status(401).send({ message: 'Wrong email and/or password' });
            }

            user.comparePassword(req.body.password, function(err, isMatch) {
                if (!isMatch) {
                    return res.status(401).send({ message: 'Wrong email and/or password' });
                }
                res.send({ token: util.createToken(req, user, config.TOKEN_KEY) });
            });
        });
    };

    return {
        signup: signup,
        login:login
    }
}

