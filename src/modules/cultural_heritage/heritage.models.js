import { DataTypes } from "sequelize";

const defineCulturalHeritageModels = (sequelize) => {
  const CulturalHeritage = sequelize.define(
    "CulturalHeritage",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      en_no: { type: DataTypes.INTEGER, allowNull: true },
      neighborhood: { type: DataTypes.STRING, allowNull: true },
      block_no: { type: DataTypes.INTEGER, allowNull: true },
      parcel_no: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, allowNull: true },
    },
    { tableName: "cultural_heritage", timestamps: true, underscored: true, indexes: [{ unique: true, fields: ["neighborhood", "block_no", "parcel_no"] }] }
  );
  return { CulturalHeritage };
};

export default defineCulturalHeritageModels;
