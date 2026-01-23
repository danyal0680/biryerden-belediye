import { DataTypes } from "sequelize";

const defineIllegalModels = (sequelize) => {
    const NumberOfİllegalConstructionsByYears = sequelize.define("NumberOfİllegalConstructionsByYears", {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
        year: { type: DataTypes.INTEGER, allowNull: true },
        count: { type: DataTypes.INTEGER, allowNull: true },
    }, { tableName: "number_of_illegal_constructions_by_years", timestamps: true, underscored: true });

    const NumberOfDestroyedBuildings = sequelize.define("NumberOfDestroyedBuildings", {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
        date: { type: DataTypes.DATE, allowNull: true },
        count: { type: DataTypes.INTEGER, allowNull: true },
    }, { tableName: "number_of_destroyed_buildings", timestamps: true, underscored: true });

    const ZoningAmnesty = sequelize.define("ZoningAmnesty", {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: true },
        sequence_no: { type: DataTypes.INTEGER, allowNull: true },
        identity_no: { type: DataTypes.STRING, allowNull: true },
        full_name: { type: DataTypes.STRING, allowNull: true },
        addr_neighborhood: { type: DataTypes.STRING, allowNull: true },
        addr_street: { type: DataTypes.STRING, allowNull: true },
        addr_no: { type: DataTypes.STRING, allowNull: true },
        record_date: { type: DataTypes.DATEONLY, allowNull: true },
        record_no: { type: DataTypes.STRING, allowNull: true },
        agenda_date: { type: DataTypes.DATEONLY, allowNull: true },
        block_no: { type: DataTypes.STRING, allowNull: true },
        parcel_no: { type: DataTypes.STRING, allowNull: true },
        decision_date: { type: DataTypes.DATEONLY, allowNull: true },
        decision_no: { type: DataTypes.STRING, allowNull: true },
        resident_address: { type: DataTypes.TEXT, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        notification_date: { type: DataTypes.DATEONLY, allowNull: true },
        current_floors: { type: DataTypes.INTEGER, allowNull: true },
        allowed_floors: { type: DataTypes.INTEGER, allowNull: true },
        total_area: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        document_no: { type: DataTypes.STRING, allowNull: true },
        application_no: { type: DataTypes.STRING, allowNull: true }
    }, { tableName: "zoning_amnesties", timestamps: true, underscored: true });

    const CancellationObjection = sequelize.define("CancellationObjection", {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: true }, // İptal İtirazları
        sequence_no: { type: DataTypes.INTEGER, allowNull: true },
        old_identity_no: { type: DataTypes.STRING, allowNull: true },
        old_full_name: { type: DataTypes.STRING, allowNull: true },
        new_identity_no: { type: DataTypes.STRING, allowNull: true },
        new_full_name: { type: DataTypes.STRING, allowNull: true },
        addr_neighborhood: { type: DataTypes.STRING, allowNull: true },
        addr_street: { type: DataTypes.STRING, allowNull: true },
        addr_no: { type: DataTypes.STRING, allowNull: true },
        objection_reason: { type: DataTypes.TEXT, allowNull: true },
        record_date: { type: DataTypes.DATEONLY, allowNull: true },
        record_no: { type: DataTypes.STRING, allowNull: true },
        block_no: { type: DataTypes.STRING, allowNull: true },
        parcel_no: { type: DataTypes.STRING, allowNull: true },
        agenda_date: { type: DataTypes.DATEONLY, allowNull: true },
        decision_date: { type: DataTypes.DATEONLY, allowNull: true },
        decision_no: { type: DataTypes.STRING, allowNull: true },
        fine_amount: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
        resident_address: { type: DataTypes.TEXT, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        notification_date: { type: DataTypes.DATEONLY, allowNull: true }
    }, { tableName: "cancellation_objections", timestamps: true, underscored: true });

    const PunishmentReport = sequelize.define("PunishmentReport", {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: true },
        sequence_no: { type: DataTypes.INTEGER, allowNull: true },
        identity_no: { type: DataTypes.STRING, allowNull: true },
        full_name: { type: DataTypes.STRING, allowNull: true },
        addr_neighborhood: { type: DataTypes.STRING, allowNull: true },
        addr_street: { type: DataTypes.STRING, allowNull: true },
        addr_no: { type: DataTypes.STRING, allowNull: true },
        record_location: { type: DataTypes.STRING, allowNull: true },
        record_date: { type: DataTypes.DATEONLY, allowNull: true },
        record_no: { type: DataTypes.STRING, allowNull: true },
        block_no: { type: DataTypes.STRING, allowNull: true },
        parcel_no: { type: DataTypes.STRING, allowNull: true },
        decision_date: { type: DataTypes.DATEONLY, allowNull: true },
        decision_no: { type: DataTypes.STRING, allowNull: true },
        fine_amount: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
        resident_address: { type: DataTypes.TEXT, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        notification_date: { type: DataTypes.DATEONLY, allowNull: true },
        area_m2: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        accrual_date: { type: DataTypes.DATEONLY, allowNull: true },
        complaint_date: { type: DataTypes.DATEONLY, allowNull: true },
        building_class: { type: DataTypes.STRING, allowNull: true },
        tender_no: { type: DataTypes.STRING, allowNull: true }
    }, { tableName: "punishment_reports", timestamps: true, underscored: true });

    const BuildingRegistration = sequelize.define("BuildingRegistration", {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: true },
        sequence_no: { type: DataTypes.INTEGER, allowNull: true },
        identity_no: { type: DataTypes.STRING, allowNull: true },
        full_name: { type: DataTypes.STRING, allowNull: true },
        addr_neighborhood: { type: DataTypes.STRING, allowNull: true },
        addr_street: { type: DataTypes.STRING, allowNull: true },
        addr_no: { type: DataTypes.STRING, allowNull: true },
        record_date: { type: DataTypes.DATEONLY, allowNull: true },
        record_no: { type: DataTypes.STRING, allowNull: true },
        agenda_date: { type: DataTypes.DATEONLY, allowNull: true },
        block_no: { type: DataTypes.STRING, allowNull: true },
        parcel_no: { type: DataTypes.STRING, allowNull: true },
        decision_date: { type: DataTypes.DATEONLY, allowNull: true },
        decision_no: { type: DataTypes.STRING, allowNull: true },
        resident_address: { type: DataTypes.TEXT, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        notification_date: { type: DataTypes.DATEONLY, allowNull: true },
        current_floors: { type: DataTypes.INTEGER, allowNull: true },
        allowed_floors: { type: DataTypes.INTEGER, allowNull: true },
        total_area: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        document_no: { type: DataTypes.STRING, allowNull: true },
        application_no: { type: DataTypes.STRING, allowNull: true }
    }, { tableName: "building_registrations", timestamps: true, underscored: true });

    const Demolition = sequelize.define("Demolition", {
        id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: true },
        sequence_no: { type: DataTypes.INTEGER, allowNull: true },
        identity_no: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        full_name: { type: DataTypes.STRING, allowNull: true },
        addr_neighborhood: { type: DataTypes.STRING, allowNull: true },
        addr_street: { type: DataTypes.STRING, allowNull: true },
        addr_no: { type: DataTypes.STRING, allowNull: true },
        record_subject: { type: DataTypes.STRING, allowNull: true },
        record_date: { type: DataTypes.DATEONLY, allowNull: true },
        record_no: { type: DataTypes.STRING, allowNull: true },
        block_no: { type: DataTypes.STRING, allowNull: true },
        parcel_no: { type: DataTypes.STRING, allowNull: true },
        decision_date: { type: DataTypes.DATEONLY, allowNull: true },
        decision_no: { type: DataTypes.STRING, allowNull: true },
        fine_amount: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
        resident_address: { type: DataTypes.TEXT, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        notification_status: { type: DataTypes.STRING, allowNull: true },
        demolition_cost: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
        demolition_fee_notification: { type: DataTypes.STRING, allowNull: true }
    }, { tableName: "demolitions", timestamps: true, underscored: true });

    return {
        NumberOfİllegalConstructionsByYears, NumberOfDestroyedBuildings, ZoningAmnesty, CancellationObjection, PunishmentReport, BuildingRegistration,
        Demolition
    }
}

export default defineIllegalModels;