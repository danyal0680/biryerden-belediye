import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASS,
    {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        dialect: "postgres",
        logging: false,
        define: {
            timestamps: true,
            underscored: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ ES6 modülü ile ana veritabanına başarıyla bağlandı.');
    } catch (error) {
        console.error('❌ Veritabanı bağlantısı başarısız oldu:', error);
    }
};

export default sequelize;