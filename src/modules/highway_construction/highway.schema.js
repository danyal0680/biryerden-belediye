
const schemaProjectSummary = (p) => {
  const loc = p?.location || null;
  const scope = p?.scope || null;
  const dates = p?.dates || null;
  const prog = p?.progress || null;
  const bud = p?.budget || null;
  const last = p?.lastUpdate || null;
  const filters = p?.filters || null;
  const teams = Array.isArray(p?.teams) ? p.teams : [];

  return {
    id: p?.id ?? null,
    projectCode: p?.projectCode ?? null,
    projectName: p?.projectName ?? null,
    description: p?.description ?? null,
    projectType: p?.projectType ?? null,
    priority: p?.priority ?? null,
    category: p?.category ?? null,

    location: loc ? {
      district: loc.district ?? null,
      street: loc.street ?? null,
      startPoint: loc.startPoint ?? null,
      endPoint: loc.endPoint ?? null,
    } : null,

    scope: scope ? {
      length: scope.length ?? null,
      width: scope.width ?? null,
      totalArea: scope.totalArea ?? null,
      materialSummary: scope.materialSummary ?? null,
    } : null,

    dates: dates ? {
      plannedStart: dates.plannedStart ?? null,
      plannedEnd: dates.plannedEnd ?? null,
      duration: dates.duration ?? null,
      elapsedDays: dates.elapsedDays ?? null,
      remainingDays: dates.remainingDays ?? null,
      delayDays: dates.delayDays ?? null,
    } : null,

    status: p?.status ?? null,

    progress: prog ? {
      physical: prog.physical ?? null,
      target: prog.target ?? null,
      status: prog.status ?? null,
      lastUpdate: prog.lastUpdate ?? null,
      updatedBy: prog.updatedBy ?? null,
    } : null,

    budget: bud ? {
      total: String(bud.total ?? "0"),
      used: String(bud.used ?? "0"),
      remaining: String(bud.remaining ?? "0"),
      percentage: bud.percentage ?? 0,
      status: bud.status ?? null,
    } : null,

    team: {
      projectManager: {
        name: prog?.updatedBy || last?.updatedBy || "Atanmamış",
        phone: null,
      },
      assignedTeams: teams.map((t) => t.name).filter(Boolean),
    },

    lastUpdate: last ? {
      date: last.date ?? null,
      updatedBy: last.updatedBy ?? null,
    } : null,

    isNew: p?.isNew ?? false,
    isFavorite: p?.isFavorite ?? false,

    filters: filters ? {
      districts: filters.districts ?? [],
      projectTypes: filters.projectTypes ?? [],
      projectManagers: filters.projectManagers ?? [],
      budgetRanges: filters.budgetRanges ?? [],
      priorityLevels: filters.priorityLevels ?? [],
      projectSizes: filters.projectSizes ?? [],
    } : null,

    teams: teams.map((t) => ({
      id: t.id,
      name: t.name,
      memberCount: t.memberCount,
    })),

    projectManagers: [],
    detail: null,
  };
};

const schemaProjectDetail = (p) => {
  const base = schemaProjectSummary(p);
  const d = p?.detail || null;

  if (!d) return { ...base, detail: null };

  const dLoc = d.location || null;
  const dCoord = dLoc?.coordinates || null;
  const dScope = d.scope || null;
  const dProg = d.progress || null;
  const dBud = d.budget || null;

  return {
    ...base,
    detail: {
      projectCode: d.projectCode ?? base.projectCode,
      projectName: d.projectName ?? base.projectName,
      description: d.description ?? base.description,
      projectType: d.projectType ?? base.projectType,
      priority: d.priority ?? base.priority,
      category: d.category ?? base.category,

      location: dLoc ? {
        district: dLoc.district ?? null,
        street: dLoc.street ?? null,
        startPoint: dLoc.startPoint ?? null,
        endPoint: dLoc.endPoint ?? null,
        coordinates: dCoord ? {
          start: { lat: dCoord.startLat ?? null, lng: dCoord.startLng ?? null },
          end: { lat: dCoord.endLat ?? null, lng: dCoord.endLng ?? null },
        } : { start: { lat: null, lng: null }, end: { lat: null, lng: null } },
      } : null,

      scope: dScope ? {
        length: dScope.length ?? null,
        width: dScope.width ?? null,
        totalArea: dScope.totalArea ?? null,
        materialSummary: dScope.materialSummary ?? null,
        materials: (dScope.materials || []).map((m) => ({
          name: m.name,
          quantity: m.quantity,
          unit: m.unit,
        })),
      } : null,

      dates: d.dates ? {
        plannedStart: d.dates.plannedStart ?? null,
        plannedEnd: d.dates.plannedEnd ?? null,
        actualStart: d.dates.actualStart ?? null,
        duration: d.dates.duration ?? null,
        elapsedDays: d.dates.elapsedDays ?? null,
        remainingDays: d.dates.remainingDays ?? null,
        delayDays: d.dates.delayDays ?? null,
      } : null,

      status: d.status ?? base.status,

      progress: dProg ? {
        physical: dProg.physical ?? null,
        target: dProg.target ?? null,
        status: dProg.status ?? null,
        lastUpdate: dProg.lastUpdate ?? null,
        updatedBy: dProg.updatedBy ?? null,
        phases: (dProg.phases || []).map((ph) => ({
          name: ph.name,
          progress: ph.progress,
          status: ph.status,
        })),
      } : null,

      budget: dBud ? {
        total: String(dBud.total ?? "0"),
        used: String(dBud.used ?? "0"),
        remaining: String(dBud.remaining ?? "0"),
        percentage: dBud.percentage ?? 0,
        status: dBud.status ?? null,
        breakdown: (dBud.breakdown || []).map((b) => ({
          category: b.category,
          amount: b.amount,
          percentage: b.percentage,
        })),
        expenses: (dBud.expenses || []).map((e) => ({
          id: e.id,
          date: e.date,
          category: e.category,
          description: e.description,
          amount: e.amount,
          addedBy: e.addedBy,
        })),
      } : null,

      team: {
        projectManager: {
          id: p.projectManagers?.[0]?.id || null,
          name: p.projectManagers?.[0]?.name || dProg?.updatedBy || "Atanmamış",
          phone: p.projectManagers?.[0]?.phone || null,
          email: p.projectManagers?.[0]?.email || null,
          photo: p.projectManagers?.[0]?.photo || null,
        },
        assignedTeams: base.teams.map(t => ({ ...t, leader: null })),
      },

      photos: (d.photos || []).map((ph) => ({
        id: ph.id,
        url: ph.url,
        thumbnailUrl: ph.thumbnailUrl,
        title: ph.title,
        description: ph.description,
        uploadedAt: ph.uploadedAt,
        uploadedBy: ph.uploadedBy ? {
          id: ph.uploadedBy.id,
          name: ph.uploadedBy.name,
          team: ph.uploadedBy.team,
        } : null,
        location: ph.location,
        tags: ph.tags || [],
        fileSize: ph.fileSize,
        dimensions: { width: ph.width, height: ph.height },
      })),

      documents: (d.documents || []).map((doc) => ({
        id: doc.id,
        category: doc.category,
        fileName: doc.fileName,
        uploadedAt: doc.uploadedAt,
        fileSize: doc.fileSize,
        uploadedBy: doc.uploadedBy,
        url: doc.url,
      })),

      notes: (d.notes || []).map((n) => ({
        id: n.id,
        content: n.content,
        author: n.author ? {
          id: n.author.id,
          name: n.author.name,
          photo: n.author.photo,
        } : null,
        createdAt: n.createdAt,
        tags: n.tags || [],
        attachments: n.attachments || [],
      })),

      timeline: (d.timeline || []).map((t) => ({
        date: t.date,
        event: t.event,
        status: t.status,
      })),

      reportUrl: d.reportUrl ?? "",
      lastUpdate: base.lastUpdate,
      isNew: d.isNew ?? base.isNew,
      isFavorite: d.isFavorite ?? base.isFavorite,
    },
  };
};

export { schemaProjectSummary, schemaProjectDetail };