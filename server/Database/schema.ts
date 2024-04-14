import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import User from "../Models/User";
import Blog from "../Models/Blog";
import Image from "../Models/Image";

// For your models to be recognized by DrizzleORM, you have to add them to your schema
export const user = User.getPG();
export const blog = Blog.getPG();
export const image = Image.getPG();

const pgUsername = process.env.PG_USERNAME;
const pgPassword = process.env.PG_PASSWORD;
const pgHost = process.env.PG_HOST;
const pgDBName = process.env.PG_DB_NAME;

const connectionString = `postgresql://${pgUsername}:${pgPassword}@${pgHost}/${pgDBName}`;
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient);