import express from 'express';
import sequelize, { testConnection } from './config/database.js';
import cors from 'cors';
import baseRoutes from './modules/base/base.routes.js'
import userRoutes from './modules/user/user.routes.js';
import municipalityRoutes from './modules/municipality/municipality.routes.js';
import socialRoutes from './modules/social_services/social.routes.js';
import tenantRoutes from './modules/tenant/tenant.routes.js'
import syncAllTenants from './config/synchronization.js';
import highwayRoutes from './modules/highway_construction/highway.routes.js';
import illegalRoutes from './modules/illegal_construction/illegal.routes.js';

const app = express();
const apiRouter = express.Router();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'x-municipality-id',
        'X-Requested-With',
        'Accept'
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/', baseRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/municipalities', municipalityRoutes);
apiRouter.use('/social-services', socialRoutes);
apiRouter.use('/tenant', tenantRoutes);
apiRouter.use('/highway-construction', highwayRoutes);
apiRouter.use('/illegal-construction', illegalRoutes);

app.use('/api', apiRouter);

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