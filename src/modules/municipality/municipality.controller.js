import Municipality from './municipality.models.js';
import sequelize from '../../config/database.js';

export const createMunicipality = async (req, res) => {
    const { name, province, district, dbName, dbPassword, subdomain, url, is_active } = req.body;
    
    const safeDbName = dbName.replace(/[^a-zA-Z0-9_]/g, '');
    const safeUserName = `user_${safeDbName}`;

    try {
        await sequelize.query(`CREATE ROLE ${safeUserName} WITH LOGIN PASSWORD '${dbPassword}';`);
        await sequelize.query(`CREATE DATABASE ${safeDbName} OWNER ${safeUserName};`);
        await sequelize.query(`GRANT ALL PRIVILEGES ON DATABASE ${safeDbName} TO ${safeUserName};`);

        const newMunicipality = await Municipality.create({
            name,
            province,
            district,
            dbName: safeDbName,
            dbPassword: dbPassword,
            subdomain,
            is_active: true,
            url: url,
            is_active: is_active
        });

        res.status(201).json({
            status: 'success',
            message: `Belediye veritabanında (${safeDbName}) ve kullanıcısı (${safeUserName}) oluşturuldu.`,
            data: newMunicipality
        });

    } catch (error) {
        console.error("Oluşturma hatası:", error);
        res.status(500).json({ message: "Sistem hatası: " + error.message });
    }
};