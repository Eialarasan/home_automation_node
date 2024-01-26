"use strict";

module.exports = function (sequelize, DataTypes) {
    const Room = sequelize.define('Room', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        roomName: {
            field: 'Room_name',
            type: DataTypes.STRING(255),
            allowNull: true
        },
        homeId:{
            field: 'home_id',
            type: DataTypes.INTEGER,
            allowNull: true 
        },createdDate: {
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
        tableName: 'Room',
        timestamps: false,
        underscored: true,
        classMethods: {
        }
    });
   
    Room.associate = function associate(models) {
        Room.hasMany(models.Device, {
            foreignKey: 'roomId'
        });
        Room.belongsTo(models.Home, {
            foreignKey: 'homeId'
        });
    };
    return Room;
}