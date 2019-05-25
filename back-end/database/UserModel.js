const Sequelize = require('sequelize');
const sequelize = new Sequelize('db-ericko', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    // attributes
    customId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    identityNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force: false});

exports.User = User;