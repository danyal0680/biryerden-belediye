import bcrypt from 'bcrypt';
import Municipality from './municipality.models.js';
import sequelize from '../../config/database.js';

const createMunicipality = async (req, res) => {
    const { name, province, district, dbName, dbUser, dbPassword, subdomain, url, is_active } = req.body;
    const safeDbName = dbName.replace(/[^a-zA-Z0-9_]/g, '');

    try {
        await sequelize.query(`CREATE ROLE ${dbUser} WITH LOGIN PASSWORD '${dbPassword}';`);
        await sequelize.query(`CREATE DATABASE ${safeDbName} OWNER ${dbUser};`);
        await sequelize.query(`GRANT ALL PRIVILEGES ON DATABASE ${safeDbName} TO ${dbUser};`);
        await sequelize.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${dbUser};`);
        await sequelize.query(`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${dbUser};`);
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(dbPassword, saltRounds);

        const newMunicipality = await Municipality.create({
            name,
            province,
            district,
            dbUser: dbUser,
            dbName: safeDbName,
            dbPassword: hashedPassword,
            subdomain,
            url: url,
            is_active: is_active !== undefined ? is_active : true
        });

        const responseData = newMunicipality.toJSON();
        delete responseData.dbPassword;

        res.status(201).json({
            status: 'success',
            message: `Belediye veritabanı (${safeDbName}) oluşturuldu ve şifre güvenli şekilde kaydedildi.`,
            data: responseData
        });

    } catch (error) {
        console.error("Oluşturma hatası:", error);
        res.status(500).json({ 
            status: 'error',
            message: "Sistem hatası: " + error.message 
        });
    }
};

const listMunicipalities = async (req, res) => {
    try {
        const municipalities = await Municipality.findAll({
            attributes: { exclude: ['dbPassword'] }
        });

        res.status(200).json({
            status: 'success',
            message: 'Belediyeler listelendi.',
            data: municipalities
        });
    } catch (error) {
        console.error("Liste alma hatası:", error);
        res.status(500).json({
            status: 'error',
            message: "Sistem hatası: " + error.message
        });
    }
};

export { createMunicipality, listMunicipalities };