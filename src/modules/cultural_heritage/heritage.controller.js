import { handleGetList } from "./heritage.helpers.js";
import defineCulturalHeritageModels from "./heritage.models.js";
import { schemaCulturalHeritage } from "./heritage.schema.js";


const getCulturalHeritageList = async (req, res) => {
  try {
    await handleGetList(req, res, defineCulturalHeritageModels, {
      modelName: "CulturalHeritage",
      schema: schemaCulturalHeritage,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export { getCulturalHeritageList };