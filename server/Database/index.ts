import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const pgUsername = process.env.PG_USERNAME;
const pgPassword = process.env.PG_PASSWORD;
const pgHost = process.env.PG_HOST;
const pgDBName = process.env.PG_DB_NAME;

const connectionString = `postgresql://${pgUsername}:${pgPassword}@${pgHost}/${pgDBName}`;
const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql);

await migrate(db, { migrationsFolder: "./migrations" });

await sql.end();