const bcrypt = require('bcryptjs');

var dbUser = require('../database/db-user-sequelize');

exports.login = function(req, res){
    console.log("Logging in...");
    dbUser.getUser({emailAddress: req.body.emailAddress})
        .then(function(result){
            bcrypt.compare(req.body.password, result.data.password)
                .then(function(compareResult){
                    if (compareResult){
                        req.session.email = req.body.emailAddress;
                        res.write(JSON.stringify({
                            message: "Login Success",
                            result: "success"
                        }));
                        console.log(req.session);
                        req.session.save();
                    }
                    else {
                        res.write(JSON.stringify({
                            message: "Login Failed. Please input correct email & password!",
                            result: "error"
                        }));
                    }
                    res.end();
                })
                .catch(function(result){
                    res.write(JSON.stringify({
                        message: "Error password check. Contact developer to solve this problem.",
                        result: 'error'
                    }));
                    res.end();
                })
        })
        .catch(function(result){
            console.log(result);
            res.write(JSON.stringify({
                message: "Login Failed. Please input correct email & password!",
                result: "error"
            }));
            res.end();
        });
};

exports.logout = function(req, res){
    console.log("Logging out...");
    console.log(req.session);
    req.session.destroy(function(err){
        if(err) {
            return console.log(err);
        }

        res.write(JSON.stringify({
            message: "Logged out successfully",
            result: 'error'
        }));
        res.end();
    });
};