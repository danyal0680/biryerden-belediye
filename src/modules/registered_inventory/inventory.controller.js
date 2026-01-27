import defineRegisteredInventoryModels from "./inventory.models.js";
import { handleGetList } from "./inventory.helpers.js";
import {schemaRegisteredInventory } from "./inventory.schema.js";

const getRegisteredInventoryList = async (req, res) => {
  try {
    await handleGetList(req, res, defineRegisteredInventoryModels, {
      modelName: "RegisteredInventory",
      schema: schemaRegisteredInventory,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


export { getRegisteredInventoryList };