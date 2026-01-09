import express from 'express';
import sequelize, { testConnection } from './config/database.js';

import './modules/user/user.model.js';
import './modules/municipality/municipality.model.js';

import userRoutes from './modules/user/user.routes.js';
import municipalityRoutes from './modules/municipality/municipality.routes.js';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/municipalities', municipalityRoutes);

const PORT = process.env.PORT;

const startServer = async () => {
    await testConnection();
    await sequelize.sync({ alter: true });
    console.log('🛠️ Tüm modeller senkronize edildi.');

    app.listen(PORT, () => {
        console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
    });
};

startServer();