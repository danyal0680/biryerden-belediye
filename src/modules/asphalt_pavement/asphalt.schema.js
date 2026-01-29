const onlyDate = (d) => (d ? d.toISOString().slice(0, 10) : null);

const schemaAsphaltPavement = (row) => {
    const r = row.get ? row.get({ plain: true }) : row;

    return {
        id: r.id,
        serialNo: r.serial_no,
        date: r.date,
        neighborhood: r.neighborhood,
        streetName: r.street_name,
        plateNo: r.plate_no,
        loaded: r.loaded,
        empty: r.empty,
        net: r.net,
        receiptNo: r.receipt_no,
        type: r.type,
        createdAt: onlyDate(r.createdAt),
        updatedAt: onlyDate(r.updatedAt),
    };
};

export { schemaAsphaltPavement };
