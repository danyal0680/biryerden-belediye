import { Sequelize } from 'sequelize';

export const getTenantDb = (dbName, dbUser, dbPassword) => {
    return new Sequelize(dbName, dbUser, dbPassword, {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
};