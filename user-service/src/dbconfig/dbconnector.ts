import {createConnection} from 'typeorm';

export default async () => {
    await createConnection({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT!),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        database: 'currency_exchange',
        entities: ["src/models/**/*.{js,ts}"],
        dropSchema: process.env.DROP_SCHEMA === 'true',
        synchronize: true,
        name: 'user-db',
        logging: true
    });
    console.log('Connected to database...');
};