import { DataTypes } from "sequelize";

const defineAsphaltPavementModels = (sequelize) => {
    const AsphaltPavement = sequelize.define('AsphaltPavement',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            serial_no: { type: DataTypes.INTEGER, allowNull: true },
            date: { type: DataTypes.DATEONLY, allowNull: true },
            neighborhood: { type: DataTypes.STRING, allowNull: true },
            street_name: { type: DataTypes.STRING, allowNull: true },
            plate_no: { type: DataTypes.STRING, allowNull: true },
            loaded: { type: DataTypes.INTEGER, allowNull: true },
            empty: { type: DataTypes.INTEGER, allowNull: true },
            net: { type: DataTypes.INTEGER, allowNull: true },
            receipt_no: { type: DataTypes.STRING, allowNull: true },
            type: { type: DataTypes.STRING, allowNull: true },
        },
        { tableName: 'asphalt_pavements', timestamps: true, underscored: true }
    );

    return { AsphaltPavement };
};

export default defineAsphaltPavementModels;
