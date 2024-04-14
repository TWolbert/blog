import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { writer } from "repl";
import User from "./User";
import { db } from "../Database/schema";
import { eq } from "drizzle-orm";

export default class Blog {
    static getPG() {
        return pgTable("Blog", {
            id: serial("id"),
            title: text("title"),
            content: text("content"),
            preview: text("preview"),
            views: numeric("views").default("0"),
            image_id: numeric("image_id"),
            writer_id: numeric("writer_id"),  
            createdAt: timestamp("created_at"),
            updatedAt: timestamp("updated_at"),
        });
    }

    static async getBlogs() {
        return await db.select().from(Blog.getPG());
    }

    static async getBlogById(id: number) {
        return await db.select().from(Blog.getPG()).where(eq(this.getPG().id, id));
    }
}
