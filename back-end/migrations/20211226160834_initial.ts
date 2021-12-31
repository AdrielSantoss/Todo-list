import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tarefas', function (table) {
        table.increments('id').primary(), 
        table.string('titulo'), table.string('descricao');
        table.dateTime('criadoEm').defaultTo(new Date());
        table.dateTime('prazo');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tarefas');
}
