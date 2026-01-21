import { DataTypes } from "sequelize";

const defineProjectModels = (sequelize) => {

  const Project = sequelize.define("Project", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectCode: { type: DataTypes.STRING, allowNull: true },
    projectName: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    projectType: { type: DataTypes.STRING, allowNull: true },
    priority: { type: DataTypes.STRING, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    isNew: { type: DataTypes.BOOLEAN, allowNull: true },
    isFavorite: { type: DataTypes.BOOLEAN, allowNull: true },
  }, { tableName: "projects", timestamps: true, underscored: true });

  const ProjectLocation = sequelize.define("ProjectLocation", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectId: { type: DataTypes.STRING, allowNull: true },
    district: { type: DataTypes.STRING, allowNull: true },
    street: { type: DataTypes.STRING, allowNull: true },
    startPoint: { type: DataTypes.STRING, allowNull: true },
    endPoint: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_locations", timestamps: true, underscored: true });

  const ProjectScope = sequelize.define("ProjectScope", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectId: { type: DataTypes.STRING, allowNull: true },
    length: { type: DataTypes.FLOAT, allowNull: true },
    width: { type: DataTypes.FLOAT, allowNull: true },
    totalArea: { type: DataTypes.FLOAT, allowNull: true },
    materialSummary: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_scopes", timestamps: true, underscored: true });

  const ProjectDates = sequelize.define("ProjectDates", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectId: { type: DataTypes.STRING, allowNull: true },
    plannedStart: { type: DataTypes.DATEONLY, allowNull: true },
    plannedEnd: { type: DataTypes.DATEONLY, allowNull: true },
    actualStart: { type: DataTypes.DATEONLY, allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: true },
    elapsedDays: { type: DataTypes.INTEGER, allowNull: true },
    remainingDays: { type: DataTypes.INTEGER, allowNull: true },
    delayDays: { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: "project_dates", timestamps: true, underscored: true });

  const ProjectProgress = sequelize.define("ProjectProgress", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectId: { type: DataTypes.STRING, allowNull: true },
    physical: { type: DataTypes.INTEGER, allowNull: true },
    target: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    lastUpdate: { type: DataTypes.DATE, allowNull: true },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_progress", timestamps: true, underscored: true });

  const ProjectBudget = sequelize.define("ProjectBudget", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectId: { type: DataTypes.STRING, allowNull: true },
    total: { type: DataTypes.BIGINT, allowNull: true },
    used: { type: DataTypes.BIGINT, allowNull: true },
    remaining: { type: DataTypes.BIGINT, allowNull: true },
    percentage: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_budgets", timestamps: true, underscored: true });

  const Team = sequelize.define("Team", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    memberCount: { type: DataTypes.INTEGER, allowNull: true },
    leader: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "teams", timestamps: true, underscored: true });

  const ProjectManager = sequelize.define("ProjectManager", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    photo: { type: DataTypes.TEXT, allowNull: true },
    activeProjects: { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: "project_managers", timestamps: true, underscored: true });

  const ProjectTeam = sequelize.define("ProjectTeam", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectId: { type: DataTypes.STRING, allowNull: true },
    teamId: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_teams", timestamps: true, underscored: true });

  const ProjectLastUpdate = sequelize.define("ProjectLastUpdate", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectId: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.DATE, allowNull: true },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_last_updates", timestamps: true, underscored: true });

  const ProjectFilters = sequelize.define("ProjectFilters", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectId: { type: DataTypes.STRING, allowNull: true },
    districts: { type: DataTypes.JSON, allowNull: true },
    projectTypes: { type: DataTypes.JSON, allowNull: true },
    projectManagers: { type: DataTypes.JSON, allowNull: true },
    budgetRanges: { type: DataTypes.JSON, allowNull: true },
    priorityLevels: { type: DataTypes.JSON, allowNull: true },
    projectSizes: { type: DataTypes.JSON, allowNull: true },
  }, { tableName: "project_filters", timestamps: true, underscored: true });

  const ProjectDetail = sequelize.define("ProjectDetail", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectId: { type: DataTypes.STRING, allowNull: true },
    projectCode: { type: DataTypes.STRING, allowNull: true },
    projectName: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    projectType: { type: DataTypes.STRING, allowNull: true },
    priority: { type: DataTypes.STRING, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    reportUrl: { type: DataTypes.TEXT, allowNull: true },
    isNew: { type: DataTypes.BOOLEAN, allowNull: true },
    isFavorite: { type: DataTypes.BOOLEAN, allowNull: true },
  }, { tableName: "project_details", timestamps: true, underscored: true });

  const ProjectDetailLocation = sequelize.define("ProjectDetailLocation", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailId: { type: DataTypes.STRING, allowNull: true },
    district: { type: DataTypes.STRING, allowNull: true },
    street: { type: DataTypes.STRING, allowNull: true },
    startPoint: { type: DataTypes.STRING, allowNull: true },
    endPoint: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_detail_locations", timestamps: true, underscored: true });

  const ProjectDetailLocationCoordinate = sequelize.define("ProjectDetailLocationCoordinate", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailLocationId: { type: DataTypes.STRING, allowNull: true },
    startLat: { type: DataTypes.FLOAT, allowNull: true },
    startLng: { type: DataTypes.FLOAT, allowNull: true },
    endLat: { type: DataTypes.FLOAT, allowNull: true },
    endLng: { type: DataTypes.FLOAT, allowNull: true },
  }, { tableName: "project_detail_location_coordinates", timestamps: true, underscored: true });

  const ProjectDetailScope = sequelize.define("ProjectDetailScope", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailId: { type: DataTypes.STRING, allowNull: true },
    length: { type: DataTypes.FLOAT, allowNull: true },
    width: { type: DataTypes.FLOAT, allowNull: true },
    totalArea: { type: DataTypes.FLOAT, allowNull: true },
    materialSummary: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_detail_scopes", timestamps: true, underscored: true });

  const ProjectMaterial = sequelize.define("ProjectMaterial", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailScopeId: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    quantity: { type: DataTypes.FLOAT, allowNull: true },
    unit: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_materials", timestamps: true, underscored: true });

  const ProjectDetailDates = sequelize.define("ProjectDetailDates", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailId: { type: DataTypes.STRING, allowNull: true },
    plannedStart: { type: DataTypes.DATEONLY, allowNull: true },
    plannedEnd: { type: DataTypes.DATEONLY, allowNull: true },
    actualStart: { type: DataTypes.DATEONLY, allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: true },
    elapsedDays: { type: DataTypes.INTEGER, allowNull: true },
    remainingDays: { type: DataTypes.INTEGER, allowNull: true },
    delayDays: { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: "project_detail_dates", timestamps: true, underscored: true });

  const ProjectDetailProgress = sequelize.define("ProjectDetailProgress", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailId: { type: DataTypes.STRING, allowNull: true },
    physical: { type: DataTypes.INTEGER, allowNull: true },
    target: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    lastUpdate: { type: DataTypes.DATE, allowNull: true },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_detail_progress", timestamps: true, underscored: true });

  const ProjectPhase = sequelize.define("ProjectPhase", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailProgressId: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    progress: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_phases", timestamps: true, underscored: true });

  const ProjectDetailBudget = sequelize.define("ProjectDetailBudget", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailId: { type: DataTypes.STRING, allowNull: true },
    total: { type: DataTypes.BIGINT, allowNull: true },
    used: { type: DataTypes.BIGINT, allowNull: true },
    remaining: { type: DataTypes.BIGINT, allowNull: true },
    percentage: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_detail_budgets", timestamps: true, underscored: true });

  const BudgetBreakdown = sequelize.define("BudgetBreakdown", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailBudgetId: { type: DataTypes.STRING, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    amount: { type: DataTypes.BIGINT, allowNull: true },
    percentage: { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: "budget_breakdowns", timestamps: true, underscored: true });

  const Expense = sequelize.define("Expense", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailBudgetId: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.DATEONLY, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    amount: { type: DataTypes.BIGINT, allowNull: true },
    addedBy: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "expenses", timestamps: true, underscored: true });

  const ProjectPerson = sequelize.define("ProjectPerson", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    team: { type: DataTypes.STRING, allowNull: true },
    photo: { type: DataTypes.TEXT, allowNull: true },
  }, { tableName: "project_people", timestamps: true, underscored: true });

  const ProjectPhoto = sequelize.define("ProjectPhoto", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailId: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.TEXT, allowNull: true },
    thumbnailUrl: { type: DataTypes.TEXT, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    uploadedAt: { type: DataTypes.DATE, allowNull: true },
    uploadedById: { type: DataTypes.STRING, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
    tags: { type: DataTypes.JSON, allowNull: true },
    fileSize: { type: DataTypes.BIGINT, allowNull: true },
    width: { type: DataTypes.INTEGER, allowNull: true },
    height: { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: "project_photos", timestamps: true, underscored: true });

  const ProjectDocument = sequelize.define("ProjectDocument", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailId: { type: DataTypes.STRING, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    fileName: { type: DataTypes.STRING, allowNull: true },
    uploadedAt: { type: DataTypes.DATEONLY, allowNull: true },
    fileSize: { type: DataTypes.BIGINT, allowNull: true },
    uploadedBy: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.TEXT, allowNull: true },
  }, { tableName: "project_documents", timestamps: true, underscored: true });

  const ProjectNote = sequelize.define("ProjectNote", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailId: { type: DataTypes.STRING, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    authorId: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    tags: { type: DataTypes.JSON, allowNull: true },
    attachments: { type: DataTypes.JSON, allowNull: true },
  }, { tableName: "project_notes", timestamps: false, underscored: true });

  const ProjectTimelineItem = sequelize.define("ProjectTimelineItem", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    projectDetailId: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.DATEONLY, allowNull: true },
    event: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  }, { tableName: "project_timeline", timestamps: true, underscored: true });



  Project.hasOne(ProjectLocation, { foreignKey: "projectId", as: "location" });
  ProjectLocation.belongsTo(Project, { foreignKey: "projectId", as: "project" });

  Project.hasOne(ProjectScope, { foreignKey: "projectId", as: "scope" });
  ProjectScope.belongsTo(Project, { foreignKey: "projectId", as: "project" });

  Project.hasOne(ProjectDates, { foreignKey: "projectId", as: "dates" });
  ProjectDates.belongsTo(Project, { foreignKey: "projectId", as: "project" });

  Project.hasOne(ProjectProgress, { foreignKey: "projectId", as: "progress" });
  ProjectProgress.belongsTo(Project, { foreignKey: "projectId", as: "project" });

  Project.hasOne(ProjectBudget, { foreignKey: "projectId", as: "budget" });
  ProjectBudget.belongsTo(Project, { foreignKey: "projectId", as: "project" });

  Project.hasOne(ProjectLastUpdate, { foreignKey: "projectId", as: "lastUpdate" });
  ProjectLastUpdate.belongsTo(Project, { foreignKey: "projectId", as: "project" });

  Project.hasOne(ProjectFilters, { foreignKey: "projectId", as: "filters" });
  ProjectFilters.belongsTo(Project, { foreignKey: "projectId", as: "project" });

  Project.hasOne(ProjectDetail, { foreignKey: "projectId", as: "detail" });
  ProjectDetail.belongsTo(Project, { foreignKey: "projectId", as: "project" });

  Project.belongsToMany(Team, { through: ProjectTeam, foreignKey: "projectId", otherKey: "teamId", as: "teams" });
  Team.belongsToMany(Project, { through: ProjectTeam, foreignKey: "teamId", otherKey: "projectId", as: "projects" });

  ProjectDetail.hasOne(ProjectDetailLocation, { foreignKey: "projectDetailId", as: "location" });
  ProjectDetailLocation.belongsTo(ProjectDetail, { foreignKey: "projectDetailId", as: "detail" });

  ProjectDetailLocation.hasOne(ProjectDetailLocationCoordinate, { foreignKey: "projectDetailLocationId", as: "coordinates" });
  ProjectDetailLocationCoordinate.belongsTo(ProjectDetailLocation, { foreignKey: "projectDetailLocationId", as: "location" });

  ProjectDetail.hasOne(ProjectDetailScope, { foreignKey: "projectDetailId", as: "scope" });
  ProjectDetailScope.belongsTo(ProjectDetail, { foreignKey: "projectDetailId", as: "detail" });

  ProjectDetailScope.hasMany(ProjectMaterial, { foreignKey: "projectDetailScopeId", as: "materials" });
  ProjectMaterial.belongsTo(ProjectDetailScope, { foreignKey: "projectDetailScopeId", as: "scope" });

  ProjectDetail.hasOne(ProjectDetailDates, { foreignKey: "projectDetailId", as: "dates" });
  ProjectDetailDates.belongsTo(ProjectDetail, { foreignKey: "projectDetailId", as: "detail" });

  ProjectDetail.hasOne(ProjectDetailProgress, { foreignKey: "projectDetailId", as: "progress" });
  ProjectDetailProgress.belongsTo(ProjectDetail, { foreignKey: "projectDetailId", as: "detail" });

  ProjectDetailProgress.hasMany(ProjectPhase, { foreignKey: "projectDetailProgressId", as: "phases" });
  ProjectPhase.belongsTo(ProjectDetailProgress, { foreignKey: "projectDetailProgressId", as: "detailProgress" });

  ProjectDetail.hasOne(ProjectDetailBudget, { foreignKey: "projectDetailId", as: "budget" });
  ProjectDetailBudget.belongsTo(ProjectDetail, { foreignKey: "projectDetailId", as: "detail" });

  ProjectDetailBudget.hasMany(BudgetBreakdown, { foreignKey: "projectDetailBudgetId", as: "breakdown" });
  BudgetBreakdown.belongsTo(ProjectDetailBudget, { foreignKey: "projectDetailBudgetId", as: "budget" });

  ProjectDetailBudget.hasMany(Expense, { foreignKey: "projectDetailBudgetId", as: "expenses" });
  Expense.belongsTo(ProjectDetailBudget, { foreignKey: "projectDetailBudgetId", as: "budget" });

  ProjectDetail.hasMany(ProjectPhoto, { foreignKey: "projectDetailId", as: "photos" });
  ProjectPhoto.belongsTo(ProjectDetail, { foreignKey: "projectDetailId", as: "detail" });

  ProjectPhoto.belongsTo(ProjectPerson, { foreignKey: "uploadedById", as: "uploadedBy" });
  ProjectPerson.hasMany(ProjectPhoto, { foreignKey: "uploadedById", as: "uploadedPhotos" });

  ProjectDetail.hasMany(ProjectDocument, { foreignKey: "projectDetailId", as: "documents" });
  ProjectDocument.belongsTo(ProjectDetail, { foreignKey: "projectDetailId", as: "detail" });

  ProjectDetail.hasMany(ProjectNote, { foreignKey: "projectDetailId", as: "notes" });
  ProjectNote.belongsTo(ProjectDetail, { foreignKey: "projectDetailId", as: "detail" });

  ProjectNote.belongsTo(ProjectPerson, { foreignKey: "authorId", as: "author" });
  ProjectPerson.hasMany(ProjectNote, { foreignKey: "authorId", as: "notes" });

  ProjectDetail.hasMany(ProjectTimelineItem, { foreignKey: "projectDetailId", as: "timeline" });
  ProjectTimelineItem.belongsTo(ProjectDetail, { foreignKey: "projectDetailId", as: "detail" });

  return {
    Project, ProjectLocation, ProjectScope, ProjectDates, ProjectProgress, ProjectBudget, ProjectLastUpdate, ProjectFilters,
    Team, ProjectTeam, ProjectManager, ProjectDetail, ProjectDetailLocation, ProjectDetailLocationCoordinate, ProjectDetailScope,
    ProjectMaterial, ProjectDetailDates, ProjectDetailProgress, ProjectPhase, ProjectDetailBudget, BudgetBreakdown, Expense,
    ProjectPerson, ProjectPhoto, ProjectDocument, ProjectNote, ProjectTimelineItem,
  };
}

export default defineProjectModels;