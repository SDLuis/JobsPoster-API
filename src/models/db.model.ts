import { Dialect, Sequelize } from 'sequelize'
import dbConfig from '../config/dbConfig'

const sequelize = new Sequelize(
    dbConfig.database as string,
    dbConfig.user as string,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect as Dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    },
);
let db = {
    Sequelize,
    sequelize
};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db