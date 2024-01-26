"use strict";

module.exports = function (sequelize, DataTypes) {
    const Device = sequelize.define('Device', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        deviceName: {
            field: 'Device_name',
            type: DataTypes.STRING(255),
            allowNull: true
        },
        roomId:{
            field: 'room_id',
            type: DataTypes.INTEGER,
            allowNull: true 
        },
        deviceStatus: {
            field: 'device_status',
            type: DataTypes.INTEGER,
            allowNull: true
        },
        homeId:{
            field: 'home_id',
            type: DataTypes.INTEGER,
            allowNull: true 
        }, createdDate: {
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
        tableName: 'Device',
        timestamps: false,
        underscored: true,

        classMethods: {

        }

    });
   
    Device.associate = function associate(models) {
        Device.belongsTo(models.Room, {
            foreignKey: 'roomId'
        });
        Device.belongsTo(models.Home, {
            foreignKey: 'homeId'
        });
        Device.hasOne(models.Schedule, {
            foreignKey: 'deviceId'
        });
    };
    return Device;
}