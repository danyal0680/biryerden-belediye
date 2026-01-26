import defineAidApplicationModels from "./applications.models.js";
import { schemaAidApplication } from "./applications.schemas.js";
import { handleGetList } from "./application.helpers.js";

const AID_ALIAS_MAP = {
  "erzak": "ERZAK",
  "kiyafet": "KIYAFET",
  "sicak-yemek": "SICAK_YEMEK",
};

const getAllAidApplicationsByAlias = async (req, res) => {
  const { alias } = req.params;
  const aidName = AID_ALIAS_MAP[alias];

  if (!aidName) {
    return res.status(400).json({
      status: "error",
      message: "Geçersiz yardım tipi. Şunları kullanın: erzak, kiyafet, sicak-yemek",
    });
  }

  return handleGetList(req, res, defineAidApplicationModels, {
    modelName: "AidApplications",
    schema: schemaAidApplication,
    where: { aid_name: aidName },
    order: [["application_date", "DESC"]]
  });
};

const getAllAidApplications = async (req, res) => {
  return handleGetList(req, res, defineAidApplicationModels, {
    modelName: "AidApplications",
    schema: schemaAidApplication,
    order: [["application_date", "DESC"]]
  });
};

export { getAllAidApplicationsByAlias, getAllAidApplications };