const handleGetList = async (req, res, defineModelsFunc, { modelName, schema, order = [["created_at", "DESC"]], limit = 100 }) => {
  try {
    if (!req.tenantDb) throw new Error("Tenant bağlantısı kurulamadı.");

    const models = defineModelsFunc(req.tenantDb);
    
    const currentModel = models[modelName];
    if (!currentModel) {
        throw new Error(`Model '${modelName}' defineIllegalModels içinde bulunamadı.`);
    }

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

    const { rows, count } = await currentModel.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order,
    });

    return res.status(200).json({
      status: "success",
      pagination: {
        total: count,
        page,
        perPage: limit,
        totalPages: Math.ceil(count / limit),
      },
      data: rows.map(schema),
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  } finally {
    if (req.tenantDb) await req.tenantDb.close();
  }
};

export { handleGetList };