import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Municipality = sequelize.define('Municipality', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dbName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    dbUser: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    dbPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subdomain: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default Municipality;