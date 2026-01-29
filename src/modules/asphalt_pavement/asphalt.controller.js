import { handleGetList } from "./asphalt.helpers.js";
import defineAsphaltPavement from "./asphalt.models.js";
import { schemaAsphaltPavement } from "./asphalt.schema.js";

const getAsphaltPavementList = async (req, res) => {
    try {
        await handleGetList(req, res, defineAsphaltPavement, {
            modelName: "AsphaltPavement",
            schema: schemaAsphaltPavement,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

export { getAsphaltPavementList };
