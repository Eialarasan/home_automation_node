const Sequelize=require('sequelize');
const { schedule, io } = require('..');
require('dotenv').config()

var db = {
    sequelize: new Sequelize({
        host: process.env.HOST,
        database: process.env.DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dialect:'mysql'
     } )
};
// db.sequelize.sync({force:true})
db.User = require('./User')(db.sequelize, Sequelize.DataTypes)
db.Home = require('./Home')(db.sequelize, Sequelize.DataTypes)
db.Room = require('./Room')(db.sequelize, Sequelize.DataTypes)
db.Device = require('./Device')(db.sequelize, Sequelize.DataTypes)
db.Schedule = require('./Schedule')(db.sequelize, Sequelize.DataTypes)

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});
module.exports = db;