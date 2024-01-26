"use strict";

module.exports = function (sequelize, DataTypes) {
    const Schedule = sequelize.define('Schedule', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        deviceId: {
            field: 'deviceId',
            type: DataTypes.INTEGER,
            allowNull: true
        },
        homeId: {
            field: 'home_id',
            type: DataTypes.INTEGER,
            allowNull: true
        },
        roomId: {
            field: 'room_id',
            type: DataTypes.INTEGER,
            allowNull: true
        },
        startTime: {
            field: 'start_time',
            type: DataTypes.STRING(255),
            allowNull: true
        },
        endTime: {
            field: 'end_time',
            type: DataTypes.STRING(255),
            allowNull: true
        }
      
        , createdDate: {
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
        tableName: 'Schedule',
        timestamps: false,
        underscored: true,
        classMethods: {
        }
    });

    Schedule.associate = function associate(models) {

        Schedule.belongsTo(models.Home, {
            foreignKey: 'homeId'
        });
        Schedule.belongsTo(models.Room, {
            foreignKey: 'roomId'
        });
        Schedule.belongsTo(models.Device, {
            foreignKey: 'deviceId'
        });
    };
    return Schedule;
}