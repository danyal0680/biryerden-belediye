import { DataTypes } from "sequelize";

const defineRegisteredInventoryModels = (sequelize) => {
  const RegisteredInventory = sequelize.define(
    "RegisteredInventory",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      inventory_no: { type: DataTypes.INTEGER, allowNull: true },
      building_status: { type: DataTypes.STRING, allowNull: true },
      address: { type: DataTypes.STRING, allowNull: true },
      current_block: { type: DataTypes.INTEGER, allowNull: true },
      current_parcel: { type: DataTypes.STRING, allowNull: true },
      old_block: { type: DataTypes.INTEGER, allowNull: true },
      old_parcel: { type: DataTypes.STRING, allowNull: true },
      old_block_parcel_2: { type: DataTypes.STRING, allowNull: true },
      old_registry_block_parcel: { type: DataTypes.STRING, allowNull: true },
      municipality_demolition_letter_1: { type: DataTypes.STRING, allowNull: true },
      municipality_demolition_letter_2: { type: DataTypes.STRING, allowNull: true },
      municipality_demolition_letter_3: { type: DataTypes.STRING, allowNull: true },
      municipality_demolition_letter_4: { type: DataTypes.STRING, allowNull: true },
      council_demolition_letter_1: { type: DataTypes.STRING, allowNull: true },
      council_demolition_letter_2: { type: DataTypes.STRING, allowNull: true },
      council_demolition_letter_3: { type: DataTypes.STRING, allowNull: true },
      council_demolition_letter_4: { type: DataTypes.STRING, allowNull: true },
      demolition_permit_date_no: { type: DataTypes.STRING, allowNull: true },
      survey_project: { type: DataTypes.STRING, allowNull: true },
      restitution_project: { type: DataTypes.STRING, allowNull: true },
      restoration_project: { type: DataTypes.STRING, allowNull: true },
      reconstruction_project: { type: DataTypes.STRING, allowNull: true },
      parcel_application: { type: DataTypes.STRING, allowNull: true },
      elevation_plan: { type: DataTypes.STRING, allowNull: true },
      zoning_status: { type: DataTypes.STRING, allowNull: true },
      building_photos: { type: DataTypes.STRING, allowNull: true },
      building_condition_description: { type: DataTypes.TEXT, allowNull: true },
    },
    { tableName: "registered_inventory", timestamps: true, underscored: true }
  );

  return { RegisteredInventory };
};

export default defineRegisteredInventoryModels;