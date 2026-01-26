const schemaAidApplication = (row) => ({
  id: row.id,
  file_no: row.file_no,
  application_no: row.application_no,
  national_id: row.national_id,
  full_name: row.full_name,
  application_date: row.application_date,
  aid_name: row.aid_name,
  application_status: row.application_status,
  delivery_date: row.delivery_date,
  gender: row.gender,
  age: row.age,
  marital_status: row.marital_status,
  created_at: row.created_at,
  updated_at: row.updated_at,
});


export { schemaAidApplication };