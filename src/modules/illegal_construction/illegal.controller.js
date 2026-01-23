import defineIllegalModels from "./illegal.models.js";
import { handleGetList } from "./illegal.handle.js";
import {
    schemaIllegalConstruction, schemaDestroyedBuilding, schemaZoningAmnesty, schemaCancellationObjection, schemaPunishmentReport, schemaBuildingRegistration,
    schemaDemolition
} from "./illegal.schemas.js";


const getAllIllegalConstructions = (req, res) => 
    handleGetList(req, res, defineIllegalModels, { 
        modelName: "NumberOfİllegalConstructionsByYears", 
        schema: schemaIllegalConstruction, 
        order: [["year", "DESC"]] 
    });


const getAllDestroyedBuildings = (req, res) => 
    handleGetList(req, res, defineIllegalModels, { 
        modelName: "NumberOfDestroyedBuildings", 
        schema: schemaDestroyedBuilding, 
        order: [["date", "DESC"]] 
    });


const getAllZoningAmnesties = (req, res) => 
    handleGetList(req, res, defineIllegalModels, { 
        modelName: "ZoningAmnesty", 
        schema: schemaZoningAmnesty 
    });


const getAllCancellationObjections = (req, res) => 
    handleGetList(req, res, defineIllegalModels, { 
        modelName: "CancellationObjection", 
        schema: schemaCancellationObjection 
    });


const getAllPunishmentReports = (req, res) => 
    handleGetList(req, res, defineIllegalModels, { 
        modelName: "PunishmentReport", 
        schema: schemaPunishmentReport 
    });


const getAllBuildingRegistrations = (req, res) => 
    handleGetList(req, res, defineIllegalModels, { 
        modelName: "BuildingRegistration", 
        schema: schemaBuildingRegistration 
    });


const getAllDemolitions = (req, res) => 
    handleGetList(req, res, defineIllegalModels, { 
        modelName: "Demolition", 
        schema: schemaDemolition,
    });



export {
    getAllIllegalConstructions, getAllDestroyedBuildings, getAllZoningAmnesties, getAllCancellationObjections, getAllPunishmentReports, getAllBuildingRegistrations,
    getAllDemolitions
};