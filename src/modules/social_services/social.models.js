import { DataTypes } from 'sequelize';

export const socialService = (sequelize) => {
    return sequelize.define('SocialService', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        tcNumber: {
            type: DataTypes.STRING(11),
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        neighbourhood: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        applicationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        isInvestigation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'social_services',
        underscored: true
    })
}