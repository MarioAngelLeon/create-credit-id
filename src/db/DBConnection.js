const { Sequelize } = require('sequelize');


const DBConnection = new Sequelize( 'MANGOSTA','root','Softtek82' ,{

    host: 'localhost',
    dialect: 'mysql'

});

module.exports = DBConnection;