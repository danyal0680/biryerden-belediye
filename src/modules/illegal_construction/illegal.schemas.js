const schemaIllegalConstruction = (item) => ({
  id: item.id,
  yil: item.year,
  say: item.count,
});


const schemaDestroyedBuilding = (item) => ({
  id: item.id,
  tarih: item.date ? new Date(item.date).toISOString().split('T')[0] : null,
  say: item.count,
});


const schemaZoningAmnesty = (item) => ({
    id: item.id,
    liste_kategorisi: item.category,
    sira_no: item.sequence_no,
    tc_kimlik_no: item.identity_no,
    adi_soyadi: item.full_name,
    insaat_adresi: {
        mahalle: item.addr_neighborhood,
        cadde_sokak: item.addr_street,
        no: item.addr_no
    },
    zaptin: {
        tarihi: item.record_date,
        no: item.record_no
    },
    encumen_gundem_tarihi: item.agenda_date,
    ada_no: item.block_no,
    parsel_no: item.parcel_no,
    encumen_karari: {
        tarihi: item.decision_date,
        no: item.decision_no
    },
    iletisim_bilgileri: {
        ikamet_adresi: item.resident_address,
        irtibat_telefonu: item.phone
    },
    teblig: item.notification_date,
    mevcut_kat: item.current_floors,
    izin_alinan_kat: item.allowed_floors,
    toplam_yapi_alani_m2: item.total_area,
    belge_no: item.document_no,
    basvuru_no: item.application_no
});


const schemaCancellationObjection = (item) => ({
    id: item.id,
    liste_kategorisi: item.category,
    sira_no: item.sequence_no,
    tc_kimlik_no: item.old_identity_no,
    adi_soyadi: item.old_full_name,
    yeni_tc_kimlik_no: item.new_identity_no,
    yeni_adi_soyadi: item.new_full_name,
    insaat_adresi: {
        mahalle: item.addr_neighborhood,
        cadde_sokak: item.addr_street,
        no: item.addr_no
    },
    iptal_itiraz_nedeni: item.objection_reason,
    zaptin: {
        tarihi: item.record_date,
        no: item.record_no
    },
    ada_no: item.block_no,
    parsel_no: item.parcel_no,
    encumen_gundem_tarihi: item.agenda_date,
    encumen_karari: {
        tarihi: item.decision_date,
        no: item.decision_no
    },
    ceza_tutari: item.fine_amount ? `${new Intl.NumberFormat('tr-TR').format(item.fine_amount)} TL` : "0,00 TL",
    iletisim_bilgileri: {
        ikamet_adresi: item.resident_address,
        irtibat_telefonu: item.phone
    },
    teblig: item.notification_date
});


const schemaPunishmentReport = (item) => ({
    id: item.id,
    liste_kategorisi: item.category,
    sira_no: item.sequence_no,
    tc_kimlik_no: item.identity_no,
    adi_soyadi: item.full_name,
    insaat_adresi: {
        mahalle: item.addr_neighborhood,
        cadde_sokak: item.addr_street,
        no: item.addr_no
    },
    tanzim_edilen_zaptin_konumu: item.record_location,
    zaptin: {
        tarihi: item.record_date,
        no: item.record_no
    },
    ada_no: item.block_no,
    parsel_no: item.parcel_no,
    encumen_karari: {
        tarihi: item.decision_date,
        no: item.decision_no
    },
    ceza_tutari: item.fine_amount ? `${new Intl.NumberFormat('tr-TR').format(item.fine_amount)} TL` : "0,00 TL",
    iletisim_bilgileri: {
        ikamet_adresi: item.resident_address,
        irtibat_telefonu: item.phone
    },
    teblig_tarihi: item.notification_date,
    m2: item.area_m2,
    tahakkuk_edilen_tarih: item.accrual_date,
    suc_duyurusu_tarihi: item.complaint_date,
    yapi_sinifi: item.building_class,
    ihale: item.tender_no
});


const schemaBuildingRegistration = (item) => ({
    id: item.id,
    liste_kategorisi: item.category,
    sira_no: item.sequence_no,
    tc_kimlik_no: item.identity_no,
    adi_soyadi: item.full_name,
    insaat_adresi: {
        mahalle: item.addr_neighborhood,
        cadde_sokak: item.addr_street,
        no: item.addr_no
    },
    zaptin: {
        tarihi: item.record_date,
        no: item.record_no
    },
    encumen_gundem_tarihi: item.agenda_date,
    ada_no: item.block_no,
    parsel_no: item.parcel_no,
    encumen_karari: {
        tarihi: item.decision_date,
        no: item.decision_no
    },
    iletisim_bilgileri: {
        ikamet_adresi: item.resident_address,
        irtibat_telefonu: item.phone
    },
    teblig: item.notification_date,
    mevcut_kat: item.current_floors,
    izin_alinan_kat: item.allowed_floors,
    toplam_yapi_alani_m2: item.total_area,
    belge_no: item.document_no,
    basvuru_no: item.application_no
});


const schemaDemolition = (item) => ({
    id: item.id,
    liste_kategorisi: item.category,
    sira_no: item.sequence_no,
    tc_kimlik_no: item.identity_no,
    "   ": item.description,
    adi_soyadi: item.full_name,
    insaat_adresi: {
        mahalle: item.addr_neighborhood,
        cadde_sokak: item.addr_street,
        no: item.addr_no
    },
    tanzim_edilen_zaptin_konusu: item.record_subject,
    zaptin: {
        tarihi: item.record_date,
        no: item.record_no
    },
    ada_no: item.block_no,
    parsel_no: item.parcel_no,
    encumen_karari: {
        tarihi: item.decision_date,
        no: item.decision_no
    },
    ceza_tutari: item.fine_amount ? `${new Intl.NumberFormat('tr-TR').format(item.fine_amount)} TL` : null,
    iletisim_bilgileri: {
        ikamet_adresi: item.resident_address,
        irtibat_telefonu: item.phone
    },
    teblig: item.notification_status,
    yikim_masrafi: item.demolition_cost,
    yikim_ucreti_tebligi: item.demolition_fee_notification
});

export {
    schemaIllegalConstruction, schemaDestroyedBuilding, schemaZoningAmnesty, schemaCancellationObjection, schemaPunishmentReport, schemaBuildingRegistration,
    schemaDemolition
};