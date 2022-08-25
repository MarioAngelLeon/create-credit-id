let typeorm = require("typeorm")

let DBConnection = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Chemaesmipastor.1",
    database: "mangosta2",
    synchronize: false,
    entities: [require("../models/udi.entity")],
});
    
module.exports = DBConnection;