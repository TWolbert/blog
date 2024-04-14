import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export default class User {
    static getPG() {
        return pgTable("user", {
            id: serial("id"),
            name: text("name"),
            email: text("email"),
            password: text("password"),
            role: text("role").$type<"writer" | "reader">(),
            createdAt: timestamp("created_at"),
            updatedAt: timestamp("updated_at"),
        });
    }
}
