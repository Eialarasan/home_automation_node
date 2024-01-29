"use strict";

module.exports = function (sequelize, DataTypes) {
    const Home = sequelize.define('Home', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        homeName: {
            field: 'home_name',
            type: DataTypes.STRING(255),
            allowNull: true
        },
        
        userId:{
            field: 'user_id',
            type: DataTypes.INTEGER,
            allowNull: true 
        },
        createdDate: {
            field: 'created_date',
            type: DataTypes.DATE,
            allowNull: true
        },
        isActive: {
            field: 'is_active',
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
       
      

    }, {
        tableName: 'Home',
        timestamps: false,
        underscored: true,
        classMethods: {

        }

    });
   
    Home.associate = function associate(models) {
        Home.belongsTo(models.User, {
            foreignKey: 'userId'
        });
        Home.hasMany(models.Room, {
            foreignKey: 'homeId'
        });
    };
    return Home;
}