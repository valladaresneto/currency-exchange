import {createConnection} from 'typeorm';

export default () => {
    createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 2345,
        username: 'postgres',
        password: 'postgres',
        database: 'currency_exchange',
        entities: ["src/models/**/*.ts"],
        synchronize: true,
        name: 'user-db'
    }).then(() => console.log('Connected to database...'));
};