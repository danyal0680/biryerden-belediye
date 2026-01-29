import { handleGetList } from "./public.helpers.js";
import defineDirectoratePublicWorksModels from "./public.models.js";
import { schemaDirectoratePublicWorks } from "./public.schema.js";

const getDirectoratePublicWorksList = async (req, res) => {
    try {
        await handleGetList(req, res, defineDirectoratePublicWorksModels, {
            modelName: "DirectoratePublicWorks",
            schema: schemaDirectoratePublicWorks,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

export { getDirectoratePublicWorksList };
