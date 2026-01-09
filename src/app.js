import express from 'express';
import sequelize, { testConnection } from './config/database.js';
import cors from 'cors';

import './modules/user/user.model.js';
import './modules/municipality/municipality.model.js';

import baseRoutes from './modules/base/base.routes.js'
import userRoutes from './modules/user/user.routes.js';
import municipalityRoutes from './modules/municipality/municipality.routes.js';
import tenantRoutes from './modules/tenant/tenant.routes.js'

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', baseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/municipalities', municipalityRoutes);
app.use('/api/tenant', tenantRoutes);

const PORT = parseInt(process.env.PORT);

const startServer = async () => {
    await testConnection();
    await sequelize.sync({ alter: true });
    console.log('🛠️ Tüm modeller senkronize edildi.');

    app.listen(PORT, () => {
        console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
    });
};

startServer();