import { Application } from 'https://deno.land/x/oak/mod.ts';
import Dex from 'https://deno.land/x/dex/mod.ts';
import router from './app/routes/router.ts';

let dex = Dex({ client: 'sqlite3' });

let tableQuery = dex.schema.createTable("Users", (table) => {
    table.increments("userId").primary(); // auto incrementing primary key
    table.string("username", 32); // varchar of max length 32
    table.string("firstName"); // varchar of max length 255
    table.string("lastName"); // varchar of max length 255
    table.integer("age").unsigned().notNullable(); // unsigned, non-nullable integer
    table.decimal("funds", 2); // decimal with 2 point precision
    table.float("lastLoginTime") // floating point number with 8 point precision
    table.date("joinDate"); // date only (not datetime)
    table.boolean("isNewUser"); // boolean
    table.text("description"); // text
    table.timestamps(null, true); // createdAt and updatedAt datetimes
}).toString();

console.log(tableQuery

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Api em Execução: 5000');

await app.listen({ port: 5000 });
