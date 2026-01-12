import express from 'express';
import sequelize, { testConnection } from './config/database.js';
import cors from 'cors';
import baseRoutes from './modules/base/base.routes.js'
import userRoutes from './modules/user/user.routes.js';
import municipalityRoutes from './modules/municipality/municipality.routes.js';
import socialRoutes from './modules/social_services/social.routes.js';
import tenantRoutes from './modules/tenant/tenant.routes.js'
import syncAllTenants from './sync.js';
import corsOptions from './cors.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', baseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/municipalities', municipalityRoutes);
app.use('/api/social-services', socialRoutes);
app.use('/api/tenant', tenantRoutes);

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await testConnection();
        await sequelize.sync({ alter: true });
        console.log('🛠️ Master modeller senkronize edildi.');
        await syncAllTenants();

        app.listen(PORT, () => {
            console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
        });
    } catch (error) {
        console.error("Server başlatılamadı:", error);
    }
};

startServer();