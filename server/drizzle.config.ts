import type { Config } from "drizzle-kit";

const pgUsername = process.env.PG_USERNAME;
const pgPassword = process.env.PG_PASSWORD;
const pgHost = process.env.PG_HOST;
const pgDBName = process.env.PG_DB_NAME;

const connectionString = `postgresql://${pgUsername}:${pgPassword}@${pgHost}/${pgDBName}`;

export default {
  schema: "./server/Database/schema.ts",
  out: "./server/Database/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: connectionString
  }
} satisfies Config;