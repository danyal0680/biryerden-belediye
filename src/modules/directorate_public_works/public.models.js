import { DataTypes } from "sequelize";

const defineDirectoratePublicWorks = (sequelize) => {
    const DirectoratePublicWorks = sequelize.define('DirectoratePublicWorks',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            serial_no: { type: DataTypes.INTEGER, allowNull: true },
            date_info: { type: DataTypes.STRING, allowNull: true },
            neighborhood: { type: DataTypes.STRING, allowNull: true },
            street_name: { type: DataTypes.STRING, allowNull: true },
            no: { type: DataTypes.STRING, allowNull: true },
            phone_no: { type: DataTypes.STRING, allowNull: true },
            full_name: { type: DataTypes.STRING, allowNull: true },
            petition_no: { type: DataTypes.STRING, allowNull: true },
            work_description: { type: DataTypes.TEXT, allowNull: true },
            notes: { type: DataTypes.TEXT, allowNull: true },
        },
        { tableName: 'directorates_public_works', timestamps: true, underscored: true }
    );

    return { DirectoratePublicWorks };
};

export default defineDirectoratePublicWorks;