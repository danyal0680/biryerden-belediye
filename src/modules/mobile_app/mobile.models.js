import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const MobileApp = sequelize.define('MobileApp', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    app_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    app_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    app_domain: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    app_db_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    app_db_user: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    app_db_pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default MobileApp;
