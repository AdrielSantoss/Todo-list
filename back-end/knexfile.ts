module.exports = {
    client: 'sqlite3',
    connection: {
        filename: './todolist.db'
    },
    useNullAsDefault: true,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
