const onlyDate = (d) => (d ? d.toISOString().slice(0, 10) : null);

const schemaDirectoratePublicWorks = (row) => {
    const r = row.get ? row.get({ plain: true }) : row;

    return {
        id: r.id,
        serialNo: r.serial_no,
        dateInfo: r.date_info,
        neighborhood: r.neighborhood,
        streetName: r.street_name,
        no: r.no,
        phoneNo: r.phone_no,
        fullName: r.full_name,
        petitionNo: r.petition_no,
        workDescription: r.work_description,
        notes: r.notes,
        createdAt: onlyDate(r.createdAt),
        updatedAt: onlyDate(r.updatedAt),
    };
};

export { schemaDirectoratePublicWorks };