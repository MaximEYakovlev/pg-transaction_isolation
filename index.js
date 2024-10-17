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

const createTable = async () => {
    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS users (id SERIAL NOT NULL PRIMARY KEY, name varchar(40) NOT NULL, email varchar(40) NOT NULL);    
    `);
}

// const setTransaction = async () => {
//     await sequelize.query(`
//         SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
//     `);

//     console.log('Transaction isolation level set to REPEATABLE READ using raw SQL');
// }

const transactionExample = async () => {
    const transaction = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
    });

    try {
        await sequelize.query(`
            INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com');
        `, { transaction });

        // await sequelize.query(`
        //     UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
        // `, { transaction });

        // await sequelize.query(`
        //     UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;
        // `, { transaction });

        await transaction.commit();
        console.log('Transaction has been committed successfully.');
    } catch (error) {
        await transaction.rollback();
        console.error('Transaction has been rolled back due to an error:', error);
    }
}

const run = async () => {
    await connect();
    await createTable();
    // await setTransaction();
    await transactionExample();
}

run();