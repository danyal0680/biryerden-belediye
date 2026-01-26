
export const handleGetList = async (req, res, defineModelsFunc, { modelName, schema, order = [["created_at", "DESC"]], limit = 100, where = {} }) => {
  try {
    if (!req.tenantDb) throw new Error("Tenant bağlantısı kurulamadı.");

    const models = defineModelsFunc(req.tenantDb);
    const currentModel = models[modelName];
    
    if (!currentModel) throw new Error(`Model '${modelName}' bulunamadı.`);

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const queryLimit = Math.max(parseInt(req.query.limit, 10) || limit, 1);

    const { rows, count } = await currentModel.findAndCountAll({
      where,
      limit: queryLimit,
      offset: (page - 1) * queryLimit,
      order,
    });

    return res.status(200).json({
      status: "success",
      pagination: {
        total: count,
        page,
        perPage: queryLimit,
        totalPages: Math.ceil(count / queryLimit),
      },
      data: rows.map(schema),
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  } finally {
    if (req.tenantDb) await req.tenantDb.close();
  }
};