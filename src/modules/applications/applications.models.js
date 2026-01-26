import { DataTypes } from "sequelize";

const defineAidApplicationModels = (sequelize) => {
  const AidApplications = sequelize.define("AidApplications",
    {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      file_no: { type: DataTypes.INTEGER, allowNull: true },
      application_no: { type: DataTypes.INTEGER, allowNull: true },
      national_id: { type: DataTypes.STRING(11), allowNull: true },
      full_name: { type: DataTypes.STRING, allowNull: true },
      application_date: { type: DataTypes.DATE, allowNull: true },
      aid_name: { type: DataTypes.STRING, allowNull: false },
      application_status: { type: DataTypes.STRING, allowNull: true },
      delivery_date: { type: DataTypes.DATEONLY, allowNull: true },
      gender: { type: DataTypes.STRING, allowNull: true },
      age: { type: DataTypes.INTEGER, allowNull: true },
      marital_status: { type: DataTypes.STRING, allowNull: true },
    }, { tableName: "aid_applications", timestamps: true, underscored: true });

  return { AidApplications };
};

export default defineAidApplicationModels;