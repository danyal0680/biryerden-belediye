import defineProjectModels from "./highway.models.js";
import { schemaProjectDetail, schemaProjectSummary } from "./highway.schema.js";
import { getProjectIncludes } from "./highway.includes.js";

const getAllProjects = async (req, res) => {
  try {
    if (!req.tenantDb) throw new Error("Tenant bağlantısı kurulamadı.");

    const models = defineProjectModels(req.tenantDb);
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = 100;

    const { rows, count } = await models.Project.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [["created_at", "DESC"]],
      include: getProjectIncludes(models, false),
    });

    return res.status(200).json({
      status: "success",
      pagination: {
        total: count,
        page,
        perPage: limit,
        totalPages: Math.ceil(count / limit),
      },
      projects: rows.map(schemaProjectSummary),
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  } finally {
    if (req.tenantDb) await req.tenantDb.close();
  }
};


const getProject = async (req, res) => {
  try {
    if (!req.tenantDb) throw new Error("Tenant bağlantısı kurulamadı.");

    const { id } = req.params;
    const models = defineProjectModels(req.tenantDb);

    const project = await models.Project.findOne({
      where: { id },
      include: getProjectIncludes(models, true),
    });

    if (!project) {
      return res.status(404).json({ status: "error", message: "Proje bulunamadı." });
    }

    return res.status(200).json({
      status: "success",
      projects: [schemaProjectDetail(project)],
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  } finally {
    if (req.tenantDb) await req.tenantDb.close();
  }
};


const getTeamsList = async (req, res) => {
  try {
    const { Team } = defineProjectModels(req.tenantDb);
    const teams = await Team.findAll({
      attributes: ['id', 'name', 'memberCount'],
      order: [['name', 'ASC']]
    });
    return res.status(200).json({ status: "success", data: teams });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};


const getManagersList = async (req, res) => {
  try {
    const { ProjectManager } = defineProjectModels(req.tenantDb);
    const managers = await ProjectManager.findAll({
      attributes: ['id', 'name', 'email', 'photo'],
      order: [['name', 'ASC']]
    });
    return res.status(200).json({ status: "success", data: managers });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};


const getPeopleList = async (req, res) => {
  try {
    const { ProjectPerson } = defineProjectModels(req.tenantDb);
    const people = await ProjectPerson.findAll({
      attributes: ['id', 'name', 'team', 'photo'],
      order: [['name', 'ASC']]
    });
    return res.status(200).json({ status: "success", data: people });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};


const getProjectMetadata = async (req, res) => {
  try {
    const { Project } = defineProjectModels(req.tenantDb);
    
    const [projectTypes, categories, priorities, statuses] = await Promise.all([
      Project.findAll({
        attributes: [[req.tenantDb.fn('DISTINCT', req.tenantDb.col('project_type')), 'type']],
        raw: true
      }),
      Project.findAll({
        attributes: [[req.tenantDb.fn('DISTINCT', req.tenantDb.col('category')), 'category']],
        raw: true
      }),
      Project.findAll({
        attributes: [[req.tenantDb.fn('DISTINCT', req.tenantDb.col('priority')), 'priority']],
        raw: true
      }),
      Project.findAll({
        attributes: [[req.tenantDb.fn('DISTINCT', req.tenantDb.col('status')), 'status']],
        raw: true
      })
    ]);

    return res.status(200).json({
      status: "success",
      data: {
        projectTypes: projectTypes.map(i => i.type).filter(Boolean),
        categories: categories.map(i => i.category).filter(Boolean),
        priorities: priorities.map(i => i.priority).filter(Boolean),
        statuses: statuses.map(i => i.status).filter(Boolean)
      }
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const createProject = async (req, res) => {
  const transaction = await req.tenantDb.transaction();
  try {
    const models = defineProjectModels(req.tenantDb);
    const formData = req.body.data ? JSON.parse(req.body.data) : {};

    const {
      projectCode,
      projectName,
      description,
      projectType,
      priority,
      category,
      status,
      location,
      scope,
      dates,
      budget,
      isNew,
      isFavorite
    } = formData;

    const projectId = `proj-${Date.now()}`;
    const detailId = `det-${Date.now() + 1}`;

    await models.Project.create({
      id: projectId,
      projectCode: projectCode || null,
      projectName: projectName || null,
      description: description || null,
      projectType: projectType || null,
      priority: priority || null,
      category: category || null,
      status: status || "construction",
      isNew: isNew || false,
      isFavorite: isFavorite || false
    }, { transaction });

    await models.ProjectDetail.create({
      id: detailId,
      projectId,
      projectCode: projectCode || null,
      projectName: projectName || null,
      description: description || null,
      projectType: projectType || null,
      priority: priority || null,
      category: category || null,
      status: status || "construction",
      reportUrl: "",
      isNew: isNew || false,
      isFavorite: isFavorite || false
    }, { transaction });

    if (location) {
      await models.ProjectLocation.create({
        id: `loc-${Date.now()}`,
        projectId,
        district: location.district || null,
        street: location.street || null,
        startPoint: location.startPoint || null,
        endPoint: location.endPoint || null
      }, { transaction });
    }

    if (scope) {
      await models.ProjectScope.create({
        id: `scope-${Date.now()}`,
        projectId,
        length: scope.length || null,
        width: scope.width || null,
        totalArea: scope.totalArea || null,
        materialSummary: scope.materialSummary || null
      }, { transaction });
    }

    if (dates) {
      await models.ProjectDates.create({
        id: `dates-${Date.now()}`,
        projectId,
        plannedStart: dates.plannedStart || null,
        plannedEnd: dates.plannedEnd || null,
        actualStart: dates.actualStart || null,
        duration: dates.duration || null,
        elapsedDays: dates.elapsedDays || null,
        remainingDays: dates.remainingDays || null,
        delayDays: dates.delayDays || null
      }, { transaction });
    }

    if (budget) {
      await models.ProjectBudget.create({
        id: `budget-${Date.now()}`,
        projectId,
        total: budget.total || 0,
        used: budget.used || 0,
        remaining: budget.remaining || budget.total || 0,
        percentage: budget.percentage || 0,
        status: budget.status || "on-budget"
      }, { transaction });
    }

    const uploadedFiles = req.files || [];
    const baseUrl = process.env.BASE_URL;

    if (uploadedFiles.length > 0) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];

        await models.ProjectPhoto.create({
          id: `photo-${Date.now()}-${i}`,
          projectDetailId: detailId,
          url: `${baseUrl}/uploads/highway_projects/${file.filename}`,
          thumbnailUrl: `${baseUrl}/uploads/highway_projects/${file.filename}`,
          title: file.originalname || "Yeni Foto",
          description: "",
          uploadedAt: new Date(),
          uploadedById: null,
          location: "",
          tags: [],
          fileSize: file.size || 0,
          width: null,
          height: null
        }, { transaction });
      }
    }

    await transaction.commit();

    return res.status(201).json({
      status: "success",
      data: {
        projectId,
        detailId,
        photosCount: uploadedFiles.length,
        message: "Layihə, detal və şəkillər uğurla yaradıldı"
      }
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const uploadProjectPhoto = async (req, res) => {
  try {
    const models = defineProjectModels(req.tenantDb);
    const { projectDetailId } = req.params;
    const {
      url,
      thumbnailUrl,
      title,
      description,
      uploadedById,
      location,
      tags,
      fileSize,
      dimensions
    } = req.body;

    const detail = await models.ProjectDetail.findByPk(projectDetailId);
    if (!detail) {
      return res.status(404).json({
        status: "error",
        message: `Xəta: '${projectDetailId}' ID-li layihə detalı tapılmadı. Şəkil yükləməzdən əvvəl layihə detalı yaradılmalıdır.`
      });
    }

    if (uploadedById) {
      const person = await models.ProjectPerson.findByPk(uploadedById);
      if (!person) {
        return res.status(404).json({
          status: "error",
          message: `Xəta: '${uploadedById}' ID-li istifadəçi tapılmadı.`
        });
      }
    }

    const photo = await models.ProjectPhoto.create({
      id: `photo-${Date.now()}`,
      projectDetailId,
      url,
      thumbnailUrl: thumbnailUrl || url,
      title: title || "Yeni Foto",
      description: description || "",
      uploadedAt: new Date(),
      uploadedById: uploadedById || null,
      location: location || "",
      tags: tags || [],
      fileSize: fileSize || 0,
      width: dimensions?.width || null,
      height: dimensions?.height || null
    });

    return res.status(201).json({ status: "success", data: photo });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};


const updateProject = async (req, res) => {
  const transaction = await req.tenantDb.transaction();
  try {
    const { id } = req.params;
    const models = defineProjectModels(req.tenantDb);
    const formData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const project = await models.Project.findByPk(id);
    if (!project) {
      await transaction.rollback();
      return res.status(404).json({ status: "error", message: "Layihə tapılmadı." });
    }

    const {
      projectCode,
      projectName,
      description,
      projectType,
      priority,
      category,
      status,
      location,
      scope,
      dates,
      budget,
      isNew,
      isFavorite
    } = formData;

    await models.Project.update({
      projectCode,
      projectName,
      description,
      projectType,
      priority,
      category,
      status,
      isNew,
      isFavorite
    }, { where: { id }, transaction });

    const detail = await models.ProjectDetail.findOne({ where: { projectId: id } });
    if (detail) {
      await models.ProjectDetail.update({
        projectCode,
        projectName,
        description,
        projectType,
        priority,
        category,
        status,
        isNew,
        isFavorite
      }, { where: { projectId: id }, transaction });
    }

    if (location) {
      await models.ProjectLocation.upsert({
        id: `loc-${id}`,
        projectId: id,
        district: location.district,
        street: location.street,
        startPoint: location.startPoint,
        endPoint: location.endPoint
      }, { transaction });
    }

    if (scope) {
      await models.ProjectScope.upsert({
        id: `scope-${id}`,
        projectId: id,
        length: scope.length,
        width: scope.width,
        totalArea: scope.totalArea,
        materialSummary: scope.materialSummary
      }, { transaction });
    }

    if (dates) {
      await models.ProjectDates.upsert({
        id: `dates-${id}`,
        projectId: id,
        plannedStart: dates.plannedStart,
        plannedEnd: dates.plannedEnd,
        actualStart: dates.actualStart,
        duration: dates.duration,
        elapsedDays: dates.elapsedDays,
        remainingDays: dates.remainingDays,
        delayDays: dates.delayDays
      }, { transaction });
    }

    if (budget) {
      await models.ProjectBudget.upsert({
        id: `budget-${id}`,
        projectId: id,
        total: budget.total,
        used: budget.used,
        remaining: budget.remaining,
        percentage: budget.percentage,
        status: budget.status
      }, { transaction });
    }

    await transaction.commit();

    return res.status(200).json({
      status: "success",
      message: "Layihə uğurla yeniləndi."
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const patchProject = async (req, res) => {
  const transaction = await req.tenantDb.transaction();
  try {
    const { id } = req.params;
    const models = defineProjectModels(req.tenantDb);
    const updates = req.body.data ? JSON.parse(req.body.data) : req.body;

    const project = await models.Project.findByPk(id);
    if (!project) {
      await transaction.rollback();
      return res.status(404).json({ status: "error", message: "Layihə tapılmadı." });
    }

    const projectFields = ['projectCode', 'projectName', 'description', 'projectType', 'priority', 'category', 'status', 'isNew', 'isFavorite'];
    const projectUpdates = {};
    projectFields.forEach(field => {
      if (updates[field] !== undefined) {
        projectUpdates[field] = updates[field];
      }
    });

    if (Object.keys(projectUpdates).length > 0) {
      await models.Project.update(projectUpdates, { where: { id }, transaction });
      await models.ProjectDetail.update(projectUpdates, { where: { projectId: id }, transaction });
    }

    if (updates.location) {
      const existingLocation = await models.ProjectLocation.findOne({ where: { projectId: id } });
      if (existingLocation) {
        await models.ProjectLocation.update(updates.location, { where: { projectId: id }, transaction });
      } else {
        await models.ProjectLocation.create({
          id: `loc-${Date.now()}`,
          projectId: id,
          ...updates.location
        }, { transaction });
      }
    }

    if (updates.scope) {
      const existingScope = await models.ProjectScope.findOne({ where: { projectId: id } });
      if (existingScope) {
        await models.ProjectScope.update(updates.scope, { where: { projectId: id }, transaction });
      } else {
        await models.ProjectScope.create({
          id: `scope-${Date.now()}`,
          projectId: id,
          ...updates.scope
        }, { transaction });
      }
    }

    if (updates.dates) {
      const existingDates = await models.ProjectDates.findOne({ where: { projectId: id } });
      if (existingDates) {
        await models.ProjectDates.update(updates.dates, { where: { projectId: id }, transaction });
      } else {
        await models.ProjectDates.create({
          id: `dates-${Date.now()}`,
          projectId: id,
          ...updates.dates
        }, { transaction });
      }
    }

    if (updates.budget) {
      const existingBudget = await models.ProjectBudget.findOne({ where: { projectId: id } });
      if (existingBudget) {
        await models.ProjectBudget.update(updates.budget, { where: { projectId: id }, transaction });
      } else {
        await models.ProjectBudget.create({
          id: `budget-${Date.now()}`,
          projectId: id,
          ...updates.budget
        }, { transaction });
      }
    }

    await transaction.commit();

    return res.status(200).json({
      status: "success",
      message: "Layihə uğurla yeniləndi."
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteProject = async (req, res) => {
  const transaction = await req.tenantDb.transaction();
  try {
    const { id } = req.params;
    const models = defineProjectModels(req.tenantDb);

    const project = await models.Project.findByPk(id);
    if (!project) {
      await transaction.rollback();
      return res.status(404).json({ status: "error", message: "Layihə tapılmadı." });
    }

    const detail = await models.ProjectDetail.findOne({ where: { projectId: id } });

    if (detail) {
      await models.ProjectPhoto.destroy({ where: { projectDetailId: detail.id }, transaction });
      await models.ProjectDocument.destroy({ where: { projectDetailId: detail.id }, transaction });
      await models.ProjectNote.destroy({ where: { projectDetailId: detail.id }, transaction });
      await models.ProjectTimelineItem.destroy({ where: { projectDetailId: detail.id }, transaction });

      const detailLocation = await models.ProjectDetailLocation.findOne({ where: { projectDetailId: detail.id } });
      if (detailLocation) {
        await models.ProjectDetailLocationCoordinate.destroy({ where: { projectDetailLocationId: detailLocation.id }, transaction });
        await models.ProjectDetailLocation.destroy({ where: { projectDetailId: detail.id }, transaction });
      }

      const detailScope = await models.ProjectDetailScope.findOne({ where: { projectDetailId: detail.id } });
      if (detailScope) {
        await models.ProjectMaterial.destroy({ where: { projectDetailScopeId: detailScope.id }, transaction });
        await models.ProjectDetailScope.destroy({ where: { projectDetailId: detail.id }, transaction });
      }

      await models.ProjectDetailDates.destroy({ where: { projectDetailId: detail.id }, transaction });

      const detailProgress = await models.ProjectDetailProgress.findOne({ where: { projectDetailId: detail.id } });
      if (detailProgress) {
        await models.ProjectPhase.destroy({ where: { projectDetailProgressId: detailProgress.id }, transaction });
        await models.ProjectDetailProgress.destroy({ where: { projectDetailId: detail.id }, transaction });
      }

      const detailBudget = await models.ProjectDetailBudget.findOne({ where: { projectDetailId: detail.id } });
      if (detailBudget) {
        await models.BudgetBreakdown.destroy({ where: { projectDetailBudgetId: detailBudget.id }, transaction });
        await models.Expense.destroy({ where: { projectDetailBudgetId: detailBudget.id }, transaction });
        await models.ProjectDetailBudget.destroy({ where: { projectDetailId: detail.id }, transaction });
      }

      await models.ProjectDetail.destroy({ where: { projectId: id }, transaction });
    }

    await models.ProjectLocation.destroy({ where: { projectId: id }, transaction });
    await models.ProjectScope.destroy({ where: { projectId: id }, transaction });
    await models.ProjectDates.destroy({ where: { projectId: id }, transaction });
    await models.ProjectProgress.destroy({ where: { projectId: id }, transaction });
    await models.ProjectBudget.destroy({ where: { projectId: id }, transaction });
    await models.ProjectLastUpdate.destroy({ where: { projectId: id }, transaction });
    await models.ProjectFilters.destroy({ where: { projectId: id }, transaction });
    await models.ProjectTeam.destroy({ where: { projectId: id }, transaction });

    await models.Project.destroy({ where: { id }, transaction });

    await transaction.commit();

    return res.status(200).json({
      status: "success",
      message: "Layihə və bütün əlaqəli məlumatlar uğurla silindi."
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteProjectPhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const models = defineProjectModels(req.tenantDb);

    const photo = await models.ProjectPhoto.findByPk(photoId);
    if (!photo) {
      return res.status(404).json({ status: "error", message: "Şəkil tapılmadı." });
    }

    await models.ProjectPhoto.destroy({ where: { id: photoId } });

    return res.status(200).json({
      status: "success",
      message: "Şəkil uğurla silindi."
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export {
  getAllProjects,
  getProject,
  getTeamsList,
  getManagersList,
  getPeopleList,
  getProjectMetadata,
  uploadProjectPhoto,
  createProject,
  updateProject,
  patchProject,
  deleteProject,
  deleteProjectPhoto
};