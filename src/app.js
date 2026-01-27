import express from 'express';
import sequelize, { testConnection } from './config/database.js';
import cors from 'cors';
import syncAllTenants from './config/synchronization.js';
import corsOptions from './config/cors.js';
import { baseRoutes, apiRouter } from './routes.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/', baseRoutes);
app.use('/api', apiRouter);

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

const startServer = async () => {
    try {
        await testConnection();
        await sequelize.sync({ alter: true });
        console.log('🛠️ Master modeller senkronize edildi.');
        await syncAllTenants();

        app.listen(PORT, () => {
            console.log(`🚀 Sunucu ${BASE_URL} adresinde çalışıyor.`);
        });
    } catch (error) {
        console.error("Server başlatılamadı:", error);
    }
};

startServer();