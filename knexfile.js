module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'db',
            user: 'postgres',
            password: 'postgres',
            database: 'bc-painter-hub-db',
        },
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};
