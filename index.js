const { Sequelize, Transaction } = require('sequelize');

const sequelize = new Sequelize('postgres_db', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const setTransaction = async () => {
    await sequelize.query(`
        SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    `);

    console.log('Transaction isolation level set to REPEATABLE READ using raw SQL');
}

const run = async () => {
    await connect();
    await setTransaction();
}

run();