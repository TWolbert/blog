import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { writer } from "repl";
import User from "./User";
import { db } from "../Database/schema";
import { eq } from "drizzle-orm";
import path from "path";

export default class Image {
    static getPG() {
        return pgTable("image", {
            id: serial("id"),
            path: text("path"),
            createdAt: timestamp("created_at"),
            updatedAt: timestamp("updated_at"),
        });
    }

    static async getImageById(id: number) {
        const images = await db.select().from(this.getPG()).where(eq(this.getPG().id, id));
        return images[0];
    }
}
