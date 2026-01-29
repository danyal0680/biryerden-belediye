import MobileApp from './mobile.models.js';
import sequelize from '../../config/database.js';

const BASE_URL = process.env.BASE_URL;

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
};

const formatAppResponse = (app) => {
    const data = app.toJSON ? app.toJSON() : { ...app };
    delete data.app_db_pass;
    if (data.app_image) {
        data.app_image = `${BASE_URL}/${data.app_image}`;
    }
    data.createdAt = formatDate(data.createdAt);
    data.updatedAt = formatDate(data.updatedAt);
    return data;
};

const createMobileApp = async (req, res) => {
    const { app_name, app_domain, app_db_name, app_db_user, app_db_pass, is_active } = req.body;
    const safeDbName = app_db_name.replace(/[^a-zA-Z0-9_]/g, '');
    const safeDbUser = app_db_user.replace(/[^a-zA-Z0-9_]/g, '');

    let app_image = null;
    if (req.file) {
        app_image = req.file.path;
    }

    try {
        await sequelize.query(`CREATE ROLE ${safeDbUser} WITH LOGIN PASSWORD '${app_db_pass}';`);
        await sequelize.query(`CREATE DATABASE ${safeDbName} OWNER ${safeDbUser};`);
        await sequelize.query(`GRANT ALL PRIVILEGES ON DATABASE ${safeDbName} TO ${safeDbUser};`);
        await sequelize.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${safeDbUser};`);
        await sequelize.query(`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${safeDbUser};`);

        const newApp = await MobileApp.create({
            app_name,
            app_image,
            app_domain,
            app_db_name: safeDbName,
            app_db_user: safeDbUser,
            app_db_pass,
            is_active: is_active !== undefined ? is_active : true
        });

        res.status(201).json({
            status: 'success',
            message: `Mobil uygulama veritabanı (${safeDbName}) oluşturuldu.`,
            data: formatAppResponse(newApp)
        });

    } catch (error) {
        console.error("Mobil uygulama oluşturma hatası:", error);
        res.status(500).json({
            status: 'error',
            message: "Sistem hatası: " + error.message
        });
    }
};

const listMobileApps = async (req, res) => {
    try {
        const apps = await MobileApp.findAll({
            attributes: { exclude: ['app_db_pass'] }
        });

        res.status(200).json({
            status: 'success',
            message: 'Mobil uygulamalar listelendi.',
            data: apps.map(app => formatAppResponse(app))
        });
    } catch (error) {
        console.error("Liste alma hatası:", error);
        res.status(500).json({
            status: 'error',
            message: "Sistem hatası: " + error.message
        });
    }
};

export { createMobileApp, listMobileApps };
