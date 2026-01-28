const onlyDate = (d) => (d ? d.toISOString().slice(0, 10) : null);

const schemaCulturalHeritage = (row) => {
  const r = row.get ? row.get({ plain: true }) : row;

  return {
    id: r.id,

    enNo: r.en_no,
    neighborhood: r.neighborhood,
    blockNo: r.block_no,
    parcelNo: r.parcel_no,
    status: r.status,

    createdAt: onlyDate(r.createdAt),
    updatedAt: onlyDate(r.updatedAt),
  };
};

export { schemaCulturalHeritage };
