import { DataTypes } from 'sequelize';

export const getTenantUserModel = (tenantSequelize) => {
    return tenantSequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tcNumber: {
            type: DataTypes.STRING(11),
            unique: true,
            allowNull: false,
            defaultValue: '00000000000'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'admin'
        }
    }, {
        tableName: 'users',
        underscored: true
    });
};