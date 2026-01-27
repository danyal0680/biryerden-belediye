const onlyDate = (d) => (d ? d.toISOString().slice(0, 10) : null);

const schemaRegisteredInventory = (row) => {
  const r = row.get ? row.get({ plain: true }) : row;

  return {
    id: r.id,
    inventoryNo: r.inventory_no,
    buildingStatus: r.building_status,
    address: r.address,
    currentBlock: r.current_block,
    currentParcel: r.current_parcel,
    oldBlock: r.old_block,
    oldParcel: r.old_parcel,
    oldBlockParcel2: r.old_block_parcel_2,
    oldRegistryBlockParcel: r.old_registry_block_parcel,
    municipalityDemolitionLetter1: r.municipality_demolition_letter_1,
    municipalityDemolitionLetter2: r.municipality_demolition_letter_2,
    municipalityDemolitionLetter3: r.municipality_demolition_letter_3,
    municipalityDemolitionLetter4: r.municipality_demolition_letter_4,
    councilDemolitionLetter1: r.council_demolition_letter_1,
    councilDemolitionLetter2: r.council_demolition_letter_2,
    councilDemolitionLetter3: r.council_demolition_letter_3,
    councilDemolitionLetter4: r.council_demolition_letter_4,
    demolitionPermitDateNo: r.demolition_permit_date_no,
    surveyProject: r.survey_project,
    restitutionProject: r.restitution_project,
    restorationProject: r.restoration_project,
    reconstructionProject: r.reconstruction_project,
    parcelApplication: r.parcel_application,
    elevationPlan: r.elevation_plan,
    zoningStatus: r.zoning_status,
    buildingPhotos: r.building_photos,
    buildingConditionDescription: r.building_condition_description,
    createdAt: onlyDate(r.createdAt),
    updatedAt: onlyDate(r.updatedAt),
  };
};

export { schemaRegisteredInventory };
