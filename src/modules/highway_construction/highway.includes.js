const getProjectIncludes = (models, fullDetail = false) => {
  const baseIncludes = [
    { model: models.ProjectLocation, as: "location" },
    { model: models.ProjectScope, as: "scope" },
    { model: models.ProjectDates, as: "dates" },
    { model: models.ProjectProgress, as: "progress" },
    { model: models.ProjectBudget, as: "budget" },
    { model: models.ProjectLastUpdate, as: "lastUpdate" },
    { model: models.ProjectFilters, as: "filters" },
    { model: models.Team, as: "teams", through: { attributes: [] } },
  ];

  if (!fullDetail) return baseIncludes;

  // Əgər tək layihə (detail) istənirsə, dərin join-ləri əlavə et
  return [
    ...baseIncludes,
    {
      model: models.ProjectDetail,
      as: "detail",
      include: [
        {
          model: models.ProjectDetailLocation,
          as: "location",
          include: [{ model: models.ProjectDetailLocationCoordinate, as: "coordinates" }],
        },
        {
          model: models.ProjectDetailScope,
          as: "scope",
          include: [{ model: models.ProjectMaterial, as: "materials" }],
        },
        { model: models.ProjectDetailDates, as: "dates" },
        {
          model: models.ProjectDetailProgress,
          as: "progress",
          include: [{ model: models.ProjectPhase, as: "phases" }],
        },
        {
          model: models.ProjectDetailBudget,
          as: "budget",
          include: [
            { model: models.BudgetBreakdown, as: "breakdown" },
            { model: models.Expense, as: "expenses" },
          ],
        },
        {
          model: models.ProjectPhoto,
          as: "photos",
          include: [{ model: models.ProjectPerson, as: "uploadedBy" }],
        },
        { model: models.ProjectDocument, as: "documents" },
        {
          model: models.ProjectNote,
          as: "notes",
          include: [{ model: models.ProjectPerson, as: "author" }],
        },
        { model: models.ProjectTimelineItem, as: "timeline" },
      ],
    },
  ];
};

export { getProjectIncludes };
