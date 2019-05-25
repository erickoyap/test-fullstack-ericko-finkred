const Sequelize = require('sequelize');
const sequelize = new Sequelize('db-ericko', 'root', '', {
   host: 'localhost',
   dialect: 'mysql'
});
const User = require('./UserModel').User;

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

// const UserModel = require('../models/user');
// const User = UserModel;

function authenticate(){
    return new Promise(function(resolve,reject){
       sequelize
           .authenticate()
           .then(function(){
                resolve({
                   result: 'success'
                });
           })
           .catch(function(err){
                reject(err);
           });
    });
}

exports.addUser = function(input){
    return new Promise(function(resolve, reject){
        authenticate()
            .then(function(result){
                if(result.result === 'success'){
                    bcrypt.hash(input.password,salt,function(err, hash){
                        User.create({
                            customId: input.id,
                            userName: input.userName,
                            accountNumber: input.accountNumber,
                            emailAddress: input.emailAddress,
                            identityNumber: input.identityNumber,
                            password: hash
                        })
                        .then(function(newUser){
                            const output = {
                                message: 'Successfully added user!'
                            };
                            resolve(output);
                        })
                        .catch(function(err){
                            reject({
                                message: "Failed to add user.",
                                data: err
                            });
                        });
                    });
                }
            });
    });
};

exports.getAllUsers = function(){
    return new Promise(function(resolve,reject){
        authenticate()
        .then(function(result){
            if(result.result === 'success') {
                User.findAll({
                    limit: 10,
                    attribute: [
                        'id',
                        'customId',
                        'userName',
                        'emailAddress',
                        'identityNumber',
                        'accountNumber'
                    ]
                })
                .then(function(users) {
                    const output = {
                        message: 'Successfully get all users!',
                        data: users
                    };
                    resolve(output);
                })
                .catch(function(err){
                    const output = {
                        message: "Failed to get all users!",
                        data: err
                    };
                    reject(output);
                });
            }
        });
    });
};

exports.getUser = function(input){
    return new Promise(function(resolve,reject){
        authenticate()
            .then(function(result){
                if(result.result === 'success') {
                    User.findOne({
                        where: input,
                        attribute: [
                            'id',
                            'customId',
                            'userName',
                            'emailAddress',
                            'identityNumber',
                            'accountNumber'
                        ]
                        })
                        .then(function(user){
                            const output = {
                                message: 'Successfully get user!',
                                result: user ? 'success' : 'error',
                                data: user
                            };
                            resolve(output);
                        })
                        .catch(function(err){
                            const output = {
                                message: "Failed to get user!",
                                result: 'error',
                                data: err
                            };
                            reject(output);
                        });
                }
            });
    });
};

exports.deleteUser = function(id){
    return new Promise(function(resolve,reject){
        authenticate()
            .then(function(result){
                if(result.result === 'success') {
                    User.destroy({
                            where: {id: id}
                        })
                        .then(function(res){
                            console.log(res);
                            const output = {
                                message: 'Successfully deleted user!',
                                result: 'success'
                            };
                            resolve(output);
                        })
                        .catch(function(err){
                            const output = {
                                message: "Failed to delete user!",
                                result: 'error',
                                data: err
                            };
                            reject(output);
                        });
                }
            });
    });
};

exports.updateUser = function(query, newValue){
    return new Promise(function(resolve,reject) {
        authenticate()
            .then(function(result){
                if(result.result === 'success') {
                    User.update(newValue, {
                            where: query
                        })
                        .then(function(result){
                            // return updated user data.
                            exports.getUser(query)
                                .then(function(user){
                                    const output = {
                                        message: "Successfully updated user!",
                                        result: "success",
                                        data: user.data
                                    };
                                   resolve(output);
                                })
                                .catch(function(res){
                                    const output = {
                                        message: "Failed to update user!",
                                        result: 'error',
                                        data: res
                                    };
                                    reject(output);
                                });
                        })
                        .catch(function(err){
                            const output = {
                                message: "Failed to update user!",
                                result: 'error',
                                data: err
                            };
                            reject(output);
                        });
                }
            });
    });
};